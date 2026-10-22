import 'server-only'
import { cache } from 'react'
import type { ObjectId } from 'mongodb'
import { col } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'

// Lista con nombre del cliente, cantidad de respuestas y fecha de la última
export async function listForms({ archived = false } = {}) {
  return col.forms()
    .aggregate<{ _id: ObjectId; title: string; slug: string; isPublic: boolean; clientName: string | null; responses: number; lastResponse: Date | null; fieldCount: number }>([
      { $match: { archivedAt: archived ? { $ne: null } : null } },
      { $sort: { updatedAt: -1 } },
      { $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client', pipeline: [{ $project: { name: 1 } }] } },
      {
        $lookup: {
          from: 'formResponses', localField: '_id', foreignField: 'formId', as: 'stats',
          pipeline: [{ $group: { _id: null, n: { $sum: 1 }, last: { $max: '$submittedAt' } } }],
        },
      },
      {
        $project: {
          title: 1, slug: 1, isPublic: 1,
          fieldCount: { $size: '$fields' },
          clientName: { $ifNull: [{ $first: '$client.name' }, null] },
          responses: { $ifNull: [{ $first: '$stats.n' }, 0] },
          lastResponse: { $ifNull: [{ $first: '$stats.last' }, null] },
        },
      },
    ])
    .toArray()
}

export const getForm = cache(async (id: string) => {
  const _id = toObjectId(id)
  return _id ? col.forms().findOne({ _id }) : null
})

// Formulario público: null si no existe, si no tiene acceso o si está archivado
export async function publicForm(slug: string) {
  if (!/^[0-9A-Za-z]{10}$/.test(slug)) return null
  return col.forms().findOne({ slug, isPublic: true, archivedAt: null })
}

export const responsesForForm = (formId: ObjectId) =>
  col.formResponses().find({ formId }).sort({ submittedAt: -1 }).limit(200).toArray()

// Respuestas de los últimos N días con el título del formulario (Inicio)
export async function recentResponses(days = 7) {
  return col.formResponses()
    .aggregate<{ _id: ObjectId; formId: ObjectId; submittedAt: Date; formTitle: string; clientId: ObjectId | null }>([
      { $match: { submittedAt: { $gte: new Date(Date.now() - days * 86_400_000) } } },
      { $sort: { submittedAt: -1 } },
      { $limit: 30 },
      { $lookup: { from: 'forms', localField: 'formId', foreignField: '_id', as: 'form', pipeline: [{ $project: { title: 1 } }] } },
      { $project: { formId: 1, submittedAt: 1, clientId: 1, formTitle: { $ifNull: [{ $first: '$form.title' }, 'Formulario eliminado'] } } },
    ])
    .toArray()
}

// Proyectos (no archivados) para elegir en selects, con el nombre del cliente
export async function projectOptions() {
  const rows = await col.projects()
    .aggregate<{ _id: ObjectId; name: string; clientId: ObjectId; clientName: string }>([
      { $match: { archivedAt: null } },
      { $sort: { updatedAt: -1 } },
      { $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client', pipeline: [{ $project: { name: 1 } }] } },
      { $project: { name: 1, clientId: 1, clientName: { $ifNull: [{ $first: '$client.name' }, '—'] } } },
    ])
    .toArray()
  return rows.map(p => ({ id: String(p._id), clientId: String(p.clientId), label: `${p.name} · ${p.clientName}` }))
}
