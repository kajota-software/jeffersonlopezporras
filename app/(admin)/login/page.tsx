import 'server-only'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'Iniciar sesión' }

export default async function LoginPage() {
  // Si ya hay sesión de admin, directo al panel
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user.role === 'admin') redirect('/admin')

  return (
    <main className="mx-auto flex min-h-screen max-w-[400px] flex-col justify-center px-6 py-16">
      <Image src="/brand/logo-jefferson-lopez.svg" alt="Jefferson López" width={737} height={163} priority className="h-6 w-auto self-start" />
      <h1 className="mt-10 text-3xl font-bold tracking-tight text-text-primary">Iniciar sesión</h1>
      <LoginForm />
    </main>
  )
}
