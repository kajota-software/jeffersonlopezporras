import 'server-only'
import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { col } from '@/lib/admin/collections'

const WINDOW_MS = 10 * 60_000

// IP del visitante, guardada solo como hash (con el secreto de la app como sal)
async function ipHash(): Promise<string> {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'desconocida'
  return createHash('sha256').update(`${process.env.BETTER_AUTH_SECRET}:${ip}`).digest('hex').slice(0, 32)
}

// true si todavía puede enviar; registra el intento. Los registros expiran solos (índice TTL de 10 min).
export async function allowSubmission(scope: string, max: number): Promise<boolean> {
  const key = `${scope}:${await ipHash()}`
  const since = new Date(Date.now() - WINDOW_MS)
  const recent = await col.rateLimits().countDocuments({ key, createdAt: { $gte: since } })
  if (recent >= max) return false
  await col.rateLimits().insertOne({ key, createdAt: new Date() })
  return true
}
