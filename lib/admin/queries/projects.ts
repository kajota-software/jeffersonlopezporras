import 'server-only'
import { cache } from 'react'
import type { Filter, ObjectId, WithId } from 'mongodb'
import { col } from '@/lib/admin/collections'
import type { ProjectDoc } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'
import { ACTIVE_STAGES, PROJECT_STAGES } from '@/lib/admin/constants'
import type { ProjectStage } from '@/lib/admin/constants'
import { progress } from '@/lib/admin/templates/project'

type ListRow = { _id: ObjectId; clientId: ObjectId; name: string; package: ProjectDoc['package']; stage: ProjectStage; dueDate: Date | null; updatedAt: Date; clientName: string; pct: number }

// Lista con el nombre del cliente y el % de avance (calculado sobre los checks)
export async function listProjects({ stage, archived = false, clientId }: { stage?: ProjectStage | 'activos'; archived?: boolean; clientId?: ObjectId } = {}) {
  const filter: Filter<ProjectDoc> = { archivedAt: archived ? { $ne: null } : null }
  if (stage === 'activos') filter.stage = { $in: ACTIVE_STAGES }
  else if (stage) filter.stage = stage
  if (clientId) filter.clientId = clientId

  const rows = await col.projects()
    .aggregate<Omit<ListRow, 'pct'> & { checks: { done: boolean }[] }>([
      { $match: filter },
      { $sort: { updatedAt: -1 } },
      { $limit: 300 },
      { $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client', pipeline: [{ $project: { name: 1 } }] } },
      {
        $project: {
          clientId: 1, name: 1, package: 1, stage: 1, dueDate: 1, updatedAt: 1,
          clientName: { $ifNull: [{ $first: '$client.name' }, 'Cliente eliminado'] },
          checks: { $reduce: { input: '$sections.checklist', initialValue: [], in: { $concatArrays: ['$$value', '$$this'] } } },
        },
      },
    ])
    .toArray()
  return rows.map(({ checks, ...r }): ListRow => ({ ...r, pct: progress([{ checklist: checks as never }]).pct }))
}

export const projectsForClient = cache((clientId: string) => listProjects({ clientId: toObjectId(clientId)! }))

export async function countProjectsByStage() {
  const rows = await col.projects()
    .aggregate<{ _id: ProjectStage; n: number }>([{ $match: { archivedAt: null } }, { $group: { _id: '$stage', n: { $sum: 1 } } }])
    .toArray()
  const counts = Object.fromEntries(PROJECT_STAGES.map(s => [s, 0])) as Record<ProjectStage, number>
  for (const r of rows) counts[r._id] = r.n
  return counts
}

export const getProject = cache(async (id: string) => {
  const _id = toObjectId(id)
  return _id ? col.projects().findOne({ _id }) : null
})

// Proyecto + nombre de su cliente en una sola consulta (la página del proyecto)
export const getProjectWithClient = cache(async (id: string) => {
  const _id = toObjectId(id)
  if (!_id) return null
  const [row] = await col.projects()
    .aggregate<WithId<ProjectDoc> & { client: { _id: ObjectId; name: string } | null }>([
      { $match: { _id } },
      { $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client', pipeline: [{ $project: { name: 1 } }] } },
      { $set: { client: { $first: '$client' } } },
    ])
    .toArray()
  return row ?? null
})

export async function deliverablesForProject(projectId: ObjectId) {
  return col.deliverables()
    .find({ projectId }, { projection: { snapshot: 0 } })
    .sort({ createdAt: -1 })
    .toArray()
}

// Documento público: null si no existe, si se quitó el acceso o si está archivado
export async function publicDeliverable(slug: string) {
  if (!/^[0-9A-Za-z]{10}$/.test(slug)) return null
  return col.deliverables().findOne({ slug, isPublic: true, archivedAt: null })
}
