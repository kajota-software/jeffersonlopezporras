'use client'

import { useState, useTransition } from 'react'
import { BTN_SECONDARY } from '@/components/admin/styles'
import type { ActionState } from '@/lib/admin/action-state'

// Copiar el link público y activar/quitar el acceso
export function CopyLinkButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}${path}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button type="button" onClick={copy} className={BTN_SECONDARY} aria-live="polite">
      {copied ? 'Copiado' : 'Copiar link'}
    </button>
  )
}

export function PublicToggle({ isPublic, action }: { isPublic: boolean; action: (isPublic: boolean) => Promise<ActionState> }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(async () => { await action(!isPublic) })}
      className={BTN_SECONDARY}
    >
      {pending ? 'Guardando…' : isPublic ? 'Quitar acceso' : 'Dar acceso'}
    </button>
  )
}
