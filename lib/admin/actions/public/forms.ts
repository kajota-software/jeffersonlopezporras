'use server'

// Acción PÚBLICA (sin requireAdmin): envío de un formulario desde /f/[slug].
// Protecciones: el formulario debe estar público, campo trampa, límite de tamaño y de envíos por IP.
import { col } from '@/lib/admin/collections'
import { allowSubmission } from '@/lib/admin/rate-limit'
import { validateAnswers } from '@/lib/admin/schemas/forms'
import { logSystem } from '@/lib/admin/activity-log'
import type { ActionState } from '@/lib/admin/action-state'

const MAX_PAYLOAD = 60_000 // caracteres sumando todas las respuestas
const MAX_PER_WINDOW = 5   // envíos por IP y formulario cada 10 minutos

export async function submitForm(slug: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  if (!/^[0-9A-Za-z]{10}$/.test(slug)) return { ok: false, message: 'Formulario no disponible.' }
  const form = await col.forms().findOne({ slug, isPublic: true, archivedAt: null })
  if (!form) return { ok: false, message: 'Este formulario ya no está disponible.' }

  let size = 0
  for (const [, v] of fd.entries()) size += typeof v === 'string' ? v.length : 1_000_000
  if (size > MAX_PAYLOAD) return { ok: false, message: 'Las respuestas son demasiado largas.' }

  // Honeypot: si un bot lo llena, se finge éxito y no se guarda nada
  if (String(fd.get('website') ?? '') !== '') return { ok: true }

  const { answers, errors } = validateAnswers(form.fields, fd)
  if (Object.keys(errors).length) return { ok: false, message: 'Revise las preguntas marcadas.', errors }

  if (!(await allowSubmission(`form:${slug}`, MAX_PER_WINDOW))) {
    return { ok: false, message: 'Recibimos varios envíos seguidos. Intente de nuevo en unos minutos.' }
  }

  await col.formResponses().insertOne({
    formId: form._id,
    fieldsSnapshot: form.fields,
    answers,
    clientId: form.clientId,
    submittedAt: new Date(),
    importedAt: null,
  })
  if (form.clientId) await logSystem(form.clientId, `Respondió el formulario «${form.title}»`, form.projectId)
  return { ok: true }
}
