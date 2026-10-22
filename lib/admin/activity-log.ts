import 'server-only'
import type { ObjectId } from 'mongodb'
import { col } from '@/lib/admin/collections'

// Línea de tiempo: la app escribe aquí los cambios de estado (type 'sistema')
export async function logSystem(clientId: ObjectId, body: string, projectId: ObjectId | null = null) {
  await col.activities().insertOne({
    clientId,
    projectId,
    type: 'sistema',
    body,
    createdAt: new Date(),
  })
}
