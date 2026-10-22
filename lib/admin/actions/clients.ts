'use server'

import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { requireAdmin } from '@/lib/require-admin'
import { col } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'
import { logSystem } from '@/lib/admin/activity-log'
import { fromDayString } from '@/lib/admin/dates'
import { CLIENT_STATUS, CLIENT_STATUSES } from '@/lib/admin/constants'
import type { ClientStatus } from '@/lib/admin/constants'
import { clientSchema, clientTechSchema } from '@/lib/admin/schemas/client'
import { formToObject } from '@/lib/admin/schemas/common'
import { fromZodError } from '@/lib/admin/action-state'
import type { ActionState } from '@/lib/admin/action-state'

const EMPTY_TECH = { domain: '', registrar: '', domainExpiresAt: null, hosting: '', productionUrl: '', repoUrl: '', accessNotes: '' }

// Evita dos clientes activos con el mismo WhatsApp
async function whatsappTaken(whatsapp: string, exceptId?: string) {
  if (!whatsapp) return null
  const other = await col.clients().findOne({ whatsapp, archivedAt: null }, { projection: { name: 1 } })
  return other && String(other._id) !== exceptId ? other : null
}

export async function createClient(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const parsed = clientSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)

  const taken = await whatsappTaken(parsed.data.whatsapp)
  if (taken) return { ok: false, errors: { whatsapp: `Ya existe un cliente con ese WhatsApp: ${taken.name}` } }

  const now = new Date()
  const { insertedId } = await col.clients().insertOne({
    ...parsed.data,
    tech: EMPTY_TECH,
    lastContactAt: null,
    createdAt: now,
    updatedAt: now,
    archivedAt: null,
  })
  await logSystem(insertedId, `Cliente creado como ${CLIENT_STATUS[parsed.data.status].label}`)
  redirect(`/admin/clientes/${insertedId}`)
}

export async function updateClient(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Cliente no encontrado.' }
  const parsed = clientSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)

  const taken = await whatsappTaken(parsed.data.whatsapp, id)
  if (taken) return { ok: false, errors: { whatsapp: `Ya existe un cliente con ese WhatsApp: ${taken.name}` } }

  const before = await col.clients().findOneAndUpdate(
    { _id },
    { $set: { ...parsed.data, updatedAt: new Date() } },
    { returnDocument: 'before', projection: { status: 1 } },
  )
  if (!before) return { ok: false, message: 'Cliente no encontrado.' }
  if (before.status !== parsed.data.status) {
    await logSystem(_id, `Estado: ${CLIENT_STATUS[before.status].label} → ${CLIENT_STATUS[parsed.data.status].label}`)
  }
  refresh()
  return { ok: true, message: 'Cambios guardados.' }
}

// Cambio rápido de estado desde el encabezado del cliente
export async function setClientStatus(id: string, status: ClientStatus): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id || !CLIENT_STATUSES.includes(status)) return { ok: false, message: 'Datos no válidos.' }
  const before = await col.clients().findOneAndUpdate(
    { _id },
    { $set: { status, updatedAt: new Date() } },
    { returnDocument: 'before', projection: { status: 1 } },
  )
  if (before && before.status !== status) {
    await logSystem(_id, `Estado: ${CLIENT_STATUS[before.status].label} → ${CLIENT_STATUS[status].label}`)
  }
  refresh()
  return { ok: true }
}

export async function updateClientTech(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Cliente no encontrado.' }
  const parsed = clientTechSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)

  const { domainExpiresAt, ...rest } = parsed.data
  await col.clients().updateOne(
    { _id },
    { $set: { tech: { ...rest, domainExpiresAt: domainExpiresAt ? fromDayString(domainExpiresAt) : null }, updatedAt: new Date() } },
  )
  refresh()
  return { ok: true, message: 'Ficha técnica guardada.' }
}

// Borrado suave: el cliente sale de las listas pero conserva su historial
export async function setClientArchived(id: string, archived: boolean): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Cliente no encontrado.' }
  await col.clients().updateOne({ _id }, { $set: { archivedAt: archived ? new Date() : null, updatedAt: new Date() } })
  await logSystem(_id, archived ? 'Cliente archivado' : 'Cliente restaurado')
  refresh()
  return { ok: true }
}
