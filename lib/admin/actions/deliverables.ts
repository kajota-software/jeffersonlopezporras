'use server'

import { refresh } from 'next/cache'
import { MongoServerError } from 'mongodb'
import { requireAdmin } from '@/lib/require-admin'
import { col } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'
import { randomSlug } from '@/lib/admin/slug'
import { logSystem } from '@/lib/admin/activity-log'
import { DELIVERABLE_KIND } from '@/lib/admin/constants'
import { deliverableSchema } from '@/lib/admin/schemas/project'
import { fromZodError } from '@/lib/admin/action-state'
import type { ActionState } from '@/lib/admin/action-state'

// Genera un documento: copia CONGELADA de las secciones elegidas. Cada documento es una versión nueva.
export async function createDeliverable(projectId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(projectId)
  if (!_id) return { ok: false, message: 'Proyecto no encontrado.' }
  const parsed = deliverableSchema.safeParse({
    kind: fd.get('kind'),
    title: fd.get('title'),
    intro: fd.get('intro') ?? '',
    sections: fd.getAll('sections').map(String),
  })
  if (!parsed.success) return fromZodError(parsed.error)

  const project = await col.projects().findOne({ _id })
  if (!project) return { ok: false, message: 'Proyecto no encontrado.' }
  const client = await col.clients().findOne({ _id: project.clientId }, { projection: { name: 1, business: 1 } })

  // Respeta el orden de las secciones del proyecto
  const sections = project.sections.filter(s => parsed.data.sections.includes(s.key))
  if (sections.length === 0) return { ok: false, errors: { sections: 'Elija al menos una sección' } }
  const version = (await col.deliverables().countDocuments({ projectId: _id, kind: parsed.data.kind })) + 1

  // El slug es único; si choca (muy improbable) se reintenta
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await col.deliverables().insertOne({
        projectId: _id,
        clientId: project.clientId,
        kind: parsed.data.kind,
        title: parsed.data.title,
        version,
        intro: parsed.data.intro,
        snapshot: {
          sections: structuredClone(sections),
          projectName: project.name,
          clientName: client?.name ?? '',
          business: client?.business ?? '',
          package: project.package,
        },
        slug: randomSlug(),
        isPublic: true,
        createdAt: new Date(),
        archivedAt: null,
      })
      await logSystem(project.clientId, `${project.name}: documento generado (${DELIVERABLE_KIND[parsed.data.kind]} v${version})`, _id)
      refresh()
      return { ok: true, message: `Documento generado (versión ${version}).` }
    } catch (error) {
      if (!(error instanceof MongoServerError && error.code === 11000)) throw error
    }
  }
  return { ok: false, message: 'No se pudo generar el link. Intente de nuevo.' }
}

// Quitar o devolver el acceso al link público
export async function setDeliverablePublic(id: string, isPublic: boolean): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Documento no encontrado.' }
  await col.deliverables().updateOne({ _id }, { $set: { isPublic } })
  refresh()
  return { ok: true }
}

export async function setDeliverableArchived(id: string, archived: boolean): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Documento no encontrado.' }
  await col.deliverables().updateOne({ _id }, { $set: { archivedAt: archived ? new Date() : null } })
  refresh()
  return { ok: true }
}
