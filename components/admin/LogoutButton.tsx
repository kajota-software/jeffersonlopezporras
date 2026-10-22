'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    setLoading(true)
    await authClient.signOut()
    router.replace('/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="min-h-11 cursor-pointer rounded-lg bg-[rgba(28,18,9,0.06)] px-5 text-[15px] font-semibold text-text-primary transition-colors duration-200 hover:bg-[rgba(28,18,9,0.1)] disabled:opacity-70"
    >
      {loading ? 'Saliendo…' : 'Cerrar sesión'}
    </button>
  )
}
