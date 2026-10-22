'use client'

import { useTransition } from 'react'
import { setClientStatus } from '@/lib/admin/actions/clients'
import { CLIENT_STATUS, CLIENT_STATUSES } from '@/lib/admin/constants'
import type { ClientStatus } from '@/lib/admin/constants'

// Cambio rápido de estado: guarda al elegir; el color del texto indica el estado
export default function StatusSelect({ clientId, status }: { clientId: string; status: ClientStatus }) {
  const [pending, startTransition] = useTransition()

  return (
    <label className="flex items-center gap-2 text-[13px] text-text-muted">
      Estado
      <select
        value={status}
        disabled={pending}
        onChange={e => {
          const next = e.target.value as ClientStatus
          startTransition(async () => { await setClientStatus(clientId, next) })
        }}
        className="min-h-11 cursor-pointer rounded-lg bg-[rgba(28,18,9,0.05)] px-3 text-[14px] font-semibold outline-none focus:ring-2 focus:ring-accent/40"
        style={{ color: CLIENT_STATUS[status].color }}
      >
        {CLIENT_STATUSES.map(s => <option key={s} value={s}>{CLIENT_STATUS[s].label}</option>)}
      </select>
    </label>
  )
}
