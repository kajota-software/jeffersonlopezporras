'use server'

import { refresh } from 'next/cache'
import { requireAdmin } from '@/lib/require-admin'
import { col } from '@/lib/admin/collections'
import { toObjectId } from '@/lib/admin/ids'
import { DEFAULT_DUE_TIME, fromDayString } from '@/lib/admin/dates'
import { CONTACT_ACTIVITY_TYPES } from '@/lib/admin/constants'
import type { ActivityType } from '@/lib/admin/constants'
import { activitySchema, followupSchema } from '@/lib/admin/schemas/crm'
import { formToObject } from '@/lib/admin/schemas/common'
import { fromZodError } from '@/lib/admin/action-state'
import type { ActionState } from '@/lib/admin/action-state'

export async function addActivity(clientId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(clientId)
  if (!_id) return { ok: false, message: 'Cliente no encontrado.' }
  const parsed = activitySchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)

  const now = new Date()
  const type = parsed.data.type as ActivityType
  await col.activities().insertOne({ clientId: _id, projectId: null, type, body: parsed.data.body, createdAt: now })
  // Llamadas, mensajes, reuniones y correos cuentan como último contacto
  const set = CONTACT_ACTIVITY_TYPES.includes(type) ? { lastContactAt: now, updatedAt: now } : { updatedAt: now }
  await col.clients().updateOne({ _id }, { $set: set })
  refresh()
  return { ok: true, message: 'Actividad registrada.' }
}

export async function createFollowup(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin()
  const parsed = followupSchema.safeParse(formToObject(fd))
  if (!parsed.success) return fromZodError(parsed.error)

  const clientId = toObjectId(parsed.data.clientId)!
  if (!(await col.clients().countDocuments({ _id: clientId }))) return { ok: false, errors: { clientId: 'Cliente no encontrado' } }

  await col.followups().insertOne({
    clientId,
    projectId: null,
    title: parsed.data.title,
    dueAt: fromDayString(parsed.data.dueDay, parsed.data.dueTime || DEFAULT_DUE_TIME),
    done: false,
    doneAt: null,
    createdAt: new Date(),
  })
  refresh()
  return { ok: true, message: 'Seguimiento creado.' }
}

// Sin refresh(): la lista se actualiza cuando el usuario decide si crea el siguiente seguimiento
export async function setFollowupDone(id: string, done: boolean): Promise<ActionState> {
  await requireAdmin()
  const _id = toObjectId(id)
  if (!_id) return { ok: false, message: 'Seguimiento no encontrado.' }
  await col.followups().updateOne({ _id }, { $set: { done, doneAt: done ? new Date() : null } })
  return { ok: true }
}
