import 'server-only'
import { cache } from 'react'
import type { Filter } from 'mongodb'
import { col } from '@/lib/admin/collections'
import type { ClientDoc } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'
import { CLIENT_STATUSES } from '@/lib/admin/constants'
import type { ClientStatus } from '@/lib/admin/constants'

export async function listClients({ status, archived = false }: { status?: ClientStatus; archived?: boolean } = {}) {
  const filter: Filter<ClientDoc> = { archivedAt: archived ? { $ne: null } : null }
  if (status) filter.status = status
  return col.clients()
    .find(filter, { projection: { name: 1, business: 1, businessType: 1, status: 1, whatsapp: 1, lastContactAt: 1, updatedAt: 1, tags: 1 } })
    .sort({ updatedAt: -1 })
    .limit(500)
    .toArray()
}

export async function countClientsByStatus() {
  const rows = await col.clients()
    .aggregate<{ _id: ClientStatus; n: number }>([{ $match: { archivedAt: null } }, { $group: { _id: '$status', n: { $sum: 1 } } }])
    .toArray()
  const counts = Object.fromEntries(CLIENT_STATUSES.map(s => [s, 0])) as Record<ClientStatus, number>
  for (const r of rows) counts[r._id] = r.n
  return counts
}

// cache(): generateMetadata, la página y sus pestañas lo leen una sola vez por request
export const getClient = cache(async (id: string) => {
  const _id = toObjectId(id)
  return _id ? col.clients().findOne({ _id }) : null
})

// Para selects de formularios (seguimientos, etc.)
export async function clientOptions() {
  const rows = await col.clients()
    .find({ archivedAt: null }, { projection: { name: 1, business: 1 } })
    .sort({ name: 1 })
    .toArray()
  return rows.map(c => ({ id: String(c._id), label: c.business ? `${c.name} · ${c.business}` : c.name }))
}

// Dominios de clientes que vencen pronto (o ya vencieron)
export async function domainsExpiring(days: number) {
  const until = new Date(Date.now() + days * 86_400_000)
  return col.clients()
    .find({ archivedAt: null, 'tech.domainExpiresAt': { $ne: null, $lte: until } }, { projection: { name: 1, 'tech.domain': 1, 'tech.domainExpiresAt': 1 } })
    .sort({ 'tech.domainExpiresAt': 1 })
    .toArray()
}
