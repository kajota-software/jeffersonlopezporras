'use server'

import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { requireAdmin } from '@/lib/require-admin'
import { col } from '@/lib/admin/collections'
import type { ClientTech, ProjectSection } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'
import { logSystem } from '@/lib/admin/activity-log'
import { fromDayString } from '@/lib/admin/dates'
import { PACKAGE, PROJECT_STAGE } from '@/lib/admin/constants'
import type { ProjectStage } from '@/lib/admin/constants'
import { buildSections, DOMAIN_SECTION_KEY, TECH_FIELD_KEYS } from '@/lib/admin/templates/project'
import { projectCreateSchema, projectInfoSchema, SECTION_LIMITS, stageSchema } from '@/lib/admin/schemas/project'
import { formToObject } from '@/lib/admin/schemas/common'
import { fromZodError } from '@/lib/admin/action-state'
import type { ActionState } from '@/lib/admin/action-state'

const toDate = (day: string) => (day ? fromDayString(day) : null)

export async function createProject(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const parsed = projectCreateSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)

  const clientId = toObjectId(parsed.data.clientId)!
  const client = await col.clients().findOne({ _id: clientId }, { projection: { tech: 1 } })
  if (!client) return { ok: false, errors: { clientId: 'Cliente no encontrado' } }

  const now = new Date()
  const { insertedId } = await col.projects().insertOne({
    clientId,
    name: parsed.data.name,
    package: parsed.data.package,
    stage: 'descubrimiento',
    stageHistory: [{ stage: 'descubrimiento', at: now }],
    startDate: toDate(parsed.data.startDate),
    dueDate: toDate(parsed.data.dueDate),
    deliveredAt: null,
    sections: buildSections(parsed.data.package, client.tech),
    createdAt: now,
    updatedAt: now,
    archivedAt: null,
  })
  await logSystem(clientId, `Proyecto creado: ${parsed.data.name} (${PACKAGE[parsed.data.package]})`, insertedId)
  redirect(`/admin/proyectos/${insertedId}`)
}

export async function updateProjectInfo(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Proyecto no encontrado.' }
  const parsed = projectInfoSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)

  await col.projects().updateOne({ _id }, {
    $set: { name: parsed.data.name, startDate: toDate(parsed.data.startDate), dueDate: toDate(parsed.data.dueDate), updatedAt: new Date() },
  })
  refresh()
  return { ok: true, message: 'Datos guardados.' }
}

export async function setProjectStage(id: string, stage: ProjectStage): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id || !stageSchema.safeParse(stage).success) return { ok: false, message: 'Datos no válidos.' }

  const project = await col.projects().findOne({ _id }, { projection: { stage: 1, clientId: 1, deliveredAt: 1, name: 1 } })
  if (!project || project.stage === stage) return { ok: true }

  const now = new Date()
  await col.projects().updateOne({ _id }, {
    $set: { stage, updatedAt: now, ...(stage === 'entregado' && !project.deliveredAt ? { deliveredAt: now } : {}) },
    $push: { stageHistory: { stage, at: now } },
  })
  await logSystem(project.clientId, `${project.name}: ${PROJECT_STAGE[project.stage].label} → ${PROJECT_STAGE[stage].label}`, _id)
  refresh()
  return { ok: true }
}

// Guarda una sección: solo acepta los campos y checks que ya existen en esa sección del proyecto
export async function saveProjectSection(id: string, key: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Proyecto no encontrado.' }
  const project = await col.projects().findOne({ _id }, { projection: { sections: 1, clientId: 1 } })
  const section = project?.sections.find(s => s.key === key)
  if (!project || !section) return { ok: false, message: 'Sección no encontrada.' }

  const str = (name: string, max: number) => String(fd.get(name) ?? '').trim().slice(0, max)
  const errors: Record<string, string> = {}

  const updated: ProjectSection = {
    ...section,
    notes: str('notes', SECTION_LIMITS.notes),
    fields: section.fields.map(field => {
      const value = str(`field.${field.key}`, SECTION_LIMITS.value)
      if (field.type === 'money' && value && !/^\d+(\.\d{1,2})?$/.test(value.replace(/,/g, ''))) errors[`field.${field.key}`] = 'Escriba solo el número, por ejemplo 120.50'
      if (field.type === 'date' && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) errors[`field.${field.key}`] = 'Fecha no válida'
      return { ...field, value: field.type === 'money' ? value.replace(/,/g, '') : value }
    }),
    checklist: section.checklist.map(item => ({
      ...item,
      done: fd.get(`check.${item.id}`) === 'on',
      comment: str(`comment.${item.id}`, SECTION_LIMITS.comment),
    })),
  }
  if (Object.keys(errors).length) return { ok: false, message: 'Revise los campos marcados.', errors }

  const now = new Date()
  await col.projects().updateOne(
    { _id },
    { $set: { 'sections.$[s]': updated, updatedAt: now } },
    { arrayFilters: [{ 's.key': key }] },
  )

  // La sección de dominio y accesos se refleja en la ficha técnica del cliente
  if (key === DOMAIN_SECTION_KEY) {
    const value = (k: string) => updated.fields.find(f => f.key === k)?.value ?? ''
    const tech = Object.fromEntries(TECH_FIELD_KEYS.map(k => [k, value(k)])) as Record<(typeof TECH_FIELD_KEYS)[number], string>
    const next: ClientTech = { ...tech, domainExpiresAt: tech.domainExpiresAt ? fromDayString(tech.domainExpiresAt) : null }
    await col.clients().updateOne({ _id: project.clientId }, { $set: { tech: next, updatedAt: now } })
  }
  refresh()
  return { ok: true, message: 'Sección guardada.' }
}

export async function setProjectArchived(id: string, archived: boolean): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Proyecto no encontrado.' }
  const project = await col.projects().findOneAndUpdate(
    { _id },
    { $set: { archivedAt: archived ? new Date() : null, updatedAt: new Date() } },
    { projection: { clientId: 1, name: 1 } },
  )
  if (project) await logSystem(project.clientId, `${project.name}: ${archived ? 'proyecto archivado' : 'proyecto restaurado'}`, _id)
  refresh()
  return { ok: true }
}
