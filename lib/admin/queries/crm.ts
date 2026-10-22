import 'server-only'
import { cache } from 'react'
import type { ObjectId } from 'mongodb'
import { col } from '@/lib/admin/collections'
import { startOfDayCR } from '@/lib/admin/dates'
import { toObjectId } from '@/lib/admin/ids'

// Por cliente, con id en texto: cache() compara argumentos por valor, así la página puede
// precargarlas en paralelo con el cliente y la pestaña reutiliza el mismo resultado
export const activitiesForClient = cache((clientId: string) =>
  col.activities().find({ clientId: toObjectId(clientId)! }).sort({ createdAt: -1 }).limit(200).toArray())

export const diagnosticsForClient = cache((clientId: string) =>
  col.diagnostics().find({ clientId: toObjectId(clientId)! }).sort({ createdAt: -1 }).toArray())

export const followupsForClient = cache((clientId: string) =>
  col.followups().find({ clientId: toObjectId(clientId)! }).sort({ done: 1, dueAt: 1 }).limit(100).toArray())

// Seguimientos pendientes con el nombre del cliente, agrupados por urgencia
export async function pendingFollowups(daysAhead = 7) {
  const rows = await col.followups()
    .aggregate<{ _id: ObjectId; clientId: ObjectId; title: string; dueAt: Date; clientName: string }>([
      { $match: { done: false, dueAt: { $lt: startOfDayCR(daysAhead + 1) } } },
      { $sort: { dueAt: 1 } },
      { $limit: 200 },
      { $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client', pipeline: [{ $project: { name: 1 } }] } },
      { $project: { clientId: 1, title: 1, dueAt: 1, clientName: { $ifNull: [{ $first: '$client.name' }, 'Cliente eliminado'] } } },
    ])
    .toArray()
  const today = startOfDayCR()
  const tomorrow = startOfDayCR(1)
  return {
    overdue: rows.filter(f => f.dueAt < today),
    today: rows.filter(f => f.dueAt >= today && f.dueAt < tomorrow),
    upcoming: rows.filter(f => f.dueAt >= tomorrow),
  }
}

// Seguimientos ya hechos recientemente (para la página de seguimientos)
export async function recentDoneFollowups(limit = 20) {
  return col.followups()
    .aggregate<{ _id: ObjectId; clientId: ObjectId; title: string; dueAt: Date; doneAt: Date; clientName: string }>([
      { $match: { done: true } },
      { $sort: { doneAt: -1 } },
      { $limit: limit },
      { $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client', pipeline: [{ $project: { name: 1 } }] } },
      { $project: { clientId: 1, title: 1, dueAt: 1, doneAt: 1, clientName: { $ifNull: [{ $first: '$client.name' }, 'Cliente eliminado'] } } },
    ])
    .toArray()
}

// Leads del diagnóstico de los últimos N días
export async function recentDiagnostics(days = 7) {
  return col.diagnostics()
    .find({ createdAt: { $gte: new Date(Date.now() - days * 86_400_000) } }, { projection: { clientId: 1, contact: 1, recommendedPlan: 1, estimate: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray()
}
