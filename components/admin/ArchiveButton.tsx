'use client'

import { useTransition } from 'react'
import { BTN_SECONDARY } from '@/components/admin/styles'
import type { ActionState } from '@/lib/admin/action-state'

// Archivar / restaurar (borrado suave). La acción llega ya ligada al id desde el servidor.
export default function ArchiveButton({
  archived, action, confirmText = '¿Archivar? Sale de las listas, pero se conserva el historial.',
}: {
  archived: boolean
  action: (archived: boolean) => Promise<ActionState>
  confirmText?: string
}) {
  const [pending, startTransition] = useTransition()

  const toggle = () => {
    if (!archived && !confirm(confirmText)) return
    startTransition(async () => { await action(!archived) })
  }

  return (
    <button type="button" onClick={toggle} disabled={pending} className={BTN_SECONDARY}>
      {pending ? 'Guardando…' : archived ? 'Restaurar' : 'Archivar'}
    </button>
  )
}
