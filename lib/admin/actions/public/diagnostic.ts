'use server'

// Acción PÚBLICA (sin requireAdmin): la llama el diagnóstico del sitio al enviar el contacto.
// Nunca debe frenar la apertura de WhatsApp: valida, responde enseguida y guarda después con after().
import { after } from 'next/server'
import { col } from '@/lib/admin/collections'
import { diagnosticLeadSchema } from '@/lib/admin/schemas/diagnostic'
import type { DiagnosticLeadInput } from '@/lib/admin/schemas/diagnostic'
import { allowSubmission } from '@/lib/admin/rate-limit'
import { logSystem } from '@/lib/admin/activity-log'
import { normalizePhone } from '@/lib/admin/phone'
import { DEFAULT_DUE_TIME, fromDayString, startOfDayCR, toDayString } from '@/lib/admin/dates'
import { estimate, recommendPlan, OTHER_BUSINESS, Q } from '@/lib/diagnostic'
import { diag } from '@/lib/translations'
import type { BusinessType } from '@/lib/admin/constants'

const MAX_PAYLOAD = 4_000 // caracteres del JSON recibido
const MAX_PER_WINDOW = 5  // envíos por IP cada 10 minutos
const TYPE_BY_ANSWER: BusinessType[] = ['hospedaje', 'tour', 'rentacar', 'otro']

export async function saveDiagnosticLead(input: DiagnosticLeadInput): Promise<void> {
  try {
    if (JSON.stringify(input).length > MAX_PAYLOAD) return
    const parsed = diagnosticLeadSchema.safeParse(input)
    if (!parsed.success) return
    if (!(await allowSubmission('diagnostico', MAX_PER_WINDOW))) return

    after(() => store(parsed.data).catch(error => console.error('[diagnóstico] no se guardó el lead:', error)))
  } catch (error) {
    console.error('[diagnóstico] error al validar el lead:', error)
  }
}

async function store(data: ReturnType<typeof diagnosticLeadSchema.parse>) {
  const { answers, contact, lang } = data
  const now = new Date()
  const whatsapp = normalizePhone(contact.countryCode + contact.phone)
  const isCustom = answers[Q.type] === OTHER_BUSINESS

  // Un cliente por teléfono: si ya existe, solo se actualiza la fecha (no se le cambia el estado)
  const clientRes = await col.clients().findOneAndUpdate(
    { whatsapp, archivedAt: null },
    {
      $set: { updatedAt: now, lastContactAt: now },
      $setOnInsert: {
        name: contact.name,
        business: contact.business,
        businessType: TYPE_BY_ANSWER[answers[Q.type] ?? 3],
        whatsapp,
        email: contact.email,
        country: '',
        location: '',
        contacts: [],
        status: 'lead',
        source: 'diagnostico',
        tags: [],
        tech: { domain: '', registrar: '', domainExpiresAt: null, hosting: '', productionUrl: '', repoUrl: '', accessNotes: '' },
        notes: '',
        createdAt: now,
        archivedAt: null,
      },
    },
    { upsert: true, returnDocument: 'after', projection: { _id: 1 } },
  )
  const clientId = clientRes!._id
  const plan = recommendPlan(answers)

  await col.diagnostics().insertOne({
    clientId,
    answers,
    lang,
    estimate: isCustom ? { lost: 0, yearly: 0 } : estimate(answers),
    recommendedPlan: plan,
    contact: { name: contact.name, business: contact.business, phone: whatsapp, email: contact.email },
    createdAt: now,
  })
  await logSystem(clientId, `Hizo el diagnóstico. Plan recomendado: ${diag.plans[plan].name.es}`)
  // Si repite el diagnóstico, no se duplica el recordatorio pendiente
  const title = `Escribir a ${contact.name} por el diagnóstico`
  if (await col.followups().countDocuments({ clientId, title, done: false })) return
  await col.followups().insertOne({
    clientId,
    projectId: null,
    title,
    dueAt: fromDayString(toDayString(startOfDayCR(1)), DEFAULT_DUE_TIME), // mañana
    done: false,
    doneAt: null,
    createdAt: now,
  })
}
