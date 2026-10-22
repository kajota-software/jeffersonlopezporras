'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

const INPUT =
  'w-full rounded-lg bg-[rgba(28,18,9,0.05)] px-4 py-3 text-base text-text-primary outline-none transition-shadow duration-200 focus:ring-2 focus:ring-accent/40'
const LABEL = 'mb-2 block text-[13px] font-medium'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await authClient.signIn.email({ email, password })
    if (error) {
      // Mensaje genérico: no revela si el email existe
      setError('Credenciales inválidas')
      setLoading(false)
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
      <div>
        <label htmlFor="email" className={LABEL} style={{ color: '#4a3520' }}>Email</label>
        <input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className={INPUT} />
      </div>
      <div>
        <label htmlFor="password" className={LABEL} style={{ color: '#4a3520' }}>Contraseña</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className={INPUT} />
      </div>

      {error && <p role="alert" className="text-[14px]" style={{ color: '#a84513' }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 min-h-12 w-full cursor-pointer rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-bright disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}
