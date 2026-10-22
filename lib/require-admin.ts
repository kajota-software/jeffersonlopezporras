import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

// IMPORTANTE: toda Server Action o API route del admin debe llamar requireAdmin() al inicio.
// El layout de /admin protege las páginas, pero no protege acciones ni endpoints por sí solo.
// cache(): layout y página comparten la misma lectura de sesión dentro de un request
export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== 'admin') redirect('/login')
  return session
})
