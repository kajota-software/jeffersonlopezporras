'use server'

import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { MongoServerError } from 'mongodb'
import { requireAdmin } from '@/lib/require-admin'
import { col } from '@/lib/admin/collections'
import type { FormDoc } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'
import { randomSlug } from '@/lib/admin/slug'
import { logSystem } from '@/lib/admin/activity-log'
import { normalizePhone } from '@/lib/admin/phone'
import { BUSINESS_INFO_TEMPLATE, seedFields } from '@/lib/admin/templates/form'
import { answerToText, formCreateSchema, formFieldsSchema, formMetaSchema } from '@/lib/admin/schemas/forms'
import { formToObject } from '@/lib/admin/schemas/common'
import { fromZodError } from '@/lib/admin/action-state'
import type { ActionState } from '@/lib/admin/action-state'

const oid = (v: string) => (v ? toObjectId(v) : null)

export async function createForm(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const parsed = formCreateSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)
  const { template, clientId, projectId, ...meta } = parsed.data

  const now = new Date()
  const base: Omit<FormDoc, 'slug'> = {
    ...meta,
    clientId: oid(clientId),
    projectId: oid(projectId),
    fields: template === 'negocio' ? seedFields(BUSINESS_INFO_TEMPLATE.fields) : [],
    isPublic: false, // se publica a mano cuando esté listo
    createdAt: now,
    updatedAt: now,
    archivedAt: null,
  }
  // Slug único; si choca (muy improbable) se reintenta
  let formId = null
  for (let attempt = 0; attempt < 3 && !formId; attempt++) {
    try {
      formId = (await col.forms().insertOne({ ...base, slug: randomSlug() })).insertedId
    } catch (error) {
      if (!(error instanceof MongoServerError && error.code === 11000)) throw error
    }
  }
  if (!formId) return { ok: false, message: 'No se pudo crear el link. Intente de nuevo.' }
  redirect(`/admin/formularios/${formId}`)
}

export async function updateFormMeta(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Formulario no encontrado.' }
  const parsed = formMetaSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)
  const { clientId, projectId, ...meta } = parsed.data
  await col.forms().updateOne({ _id }, { $set: { ...meta, clientId: oid(clientId), projectId: oid(projectId), updatedAt: new Date() } })
  refresh()
  return { ok: true, message: 'Datos guardados.' }
}

export async function saveFormFields(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Formulario no encontrado.' }
  const parsed = formFieldsSchema.safeParse(fd.get('fields'))
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? 'Revise las preguntas.' }
  await col.forms().updateOne({ _id }, { $set: { fields: parsed.data, updatedAt: new Date() } })
  refresh()
  return { ok: true, message: 'Preguntas guardadas.' }
}

export async function setFormPublic(id: string, isPublic: boolean): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Formulario no encontrado.' }
  await col.forms().updateOne({ _id }, { $set: { isPublic, updatedAt: new Date() } })
  refresh()
  return { ok: true }
}

export async function setFormArchived(id: string, archived: boolean): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Formulario no encontrado.' }
  await col.forms().updateOne({ _id }, { $set: { archivedAt: archived ? new Date() : null, updatedAt: new Date() } })
  refresh()
  return { ok: true }
}

// Llena el proyecto con las respuestas que tienen mapsTo 'seccion.campo'.
// No sobrescribe campos con valor salvo que se confirme.
export async function importResponseToProject(responseId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(responseId)
  const projectId = toObjectId(String(fd.get('projectId') ?? ''))
  if (!_id) return { ok: false, message: 'Respuesta no encontrada.' }
  if (!projectId) return { ok: false, errors: { projectId: 'Elija un proyecto' } }
  const overwrite = fd.get('overwrite') === 'on'

  const [response, project] = await Promise.all([col.formResponses().findOne({ _id }), col.projects().findOne({ _id: projectId })])
  if (!response || !project) return { ok: false, message: 'Respuesta o proyecto no encontrado.' }

  let filled = 0
  let kept = 0
  const sections = project.sections.map(section => ({
    ...section,
    fields: section.fields.map(field => {
      const source = response.fieldsSnapshot.find(f => f.mapsTo === `${section.key}.${field.key}`)
      if (!source) return field
      const value = answerToText(source, response.answers[source.id]).trim()
      if (!value) return field
      if (field.value.trim() && !overwrite) { kept++; return field }
      filled++
      return { ...field, value }
    }),
  }))

  const now = new Date()
  await col.projects().updateOne({ _id: projectId }, { $set: { sections, updatedAt: now } })
  await col.formResponses().updateOne({ _id }, { $set: { importedAt: now } })
  await logSystem(project.clientId, `${project.name}: se importaron ${filled} respuestas de un formulario`, projectId)
  refresh()
  const keptMsg = kept ? ` ${kept} ya tenían valor y no se cambiaron.` : ''
  return { ok: true, message: `Se llenaron ${filled} campos del proyecto.${keptMsg}` }
}

// Crea un lead con las respuestas mapeadas a 'cliente.*'; si el WhatsApp ya existe, enlaza ese cliente
export async function createClientFromResponse(responseId: string): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(responseId)
  if (!_id) return { ok: false, message: 'Respuesta no encontrada.' }
  const response = await col.formResponses().findOne({ _id })
  if (!response) return { ok: false, message: 'Respuesta no encontrada.' }
  if (response.clientId) redirect(`/admin/clientes/${response.clientId}`)

  const value = (key: string) => {
    const field = response.fieldsSnapshot.find(f => f.mapsTo === `cliente.${key}`)
    return field ? answerToText(field, response.answers[field.id]).trim() : ''
  }
  const whatsapp = normalizePhone(value('whatsapp'))
  const existing = whatsapp ? await col.clients().findOne({ whatsapp, archivedAt: null }, { projection: { _id: 1 } }) : null

  let clientId = existing?._id
  if (!clientId) {
    const now = new Date()
    const res = await col.clients().insertOne({
      name: value('name') || 'Sin nombre',
      business: value('business'),
      businessType: 'otro',
      whatsapp,
      email: value('email'),
      country: '',
      location: value('location'),
      contacts: [],
      status: 'lead',
      source: 'formulario',
      tags: [],
      tech: { domain: '', registrar: '', domainExpiresAt: null, hosting: '', productionUrl: '', repoUrl: '', accessNotes: '' },
      notes: '',
      lastContactAt: null,
      createdAt: now,
      updatedAt: now,
      archivedAt: null,
    })
    clientId = res.insertedId
    await logSystem(clientId, 'Cliente creado desde la respuesta de un formulario')
  }
  await col.formResponses().updateOne({ _id }, { $set: { clientId } })
  redirect(`/admin/clientes/${clientId}`)
}
