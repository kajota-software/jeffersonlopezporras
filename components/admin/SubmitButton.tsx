'use client'

import { BTN_PRIMARY } from '@/components/admin/styles'

export default function SubmitButton({ children, pending, pendingLabel = 'Guardando…', className = '' }: { children: React.ReactNode; pending: boolean; pendingLabel?: string; className?: string }) {
  return (
    <button type="submit" disabled={pending} className={`${BTN_PRIMARY} ${className}`}>
      {pending ? pendingLabel : children}
    </button>
  )
}
