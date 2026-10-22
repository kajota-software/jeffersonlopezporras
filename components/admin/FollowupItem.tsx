'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setFollowupDone } from '@/lib/admin/actions/crm'
import FollowupForm from '@/components/admin/FollowupForm'
import { BTN_SECONDARY, DIVIDER, META } from '@/components/admin/styles'

// Un seguimiento con su botón "Hecho"; al marcarlo ofrece crear el siguiente
export default function FollowupItem({
  id, title, dueLabel, overdue, clientId, clientName, nextDay, showClient = true,
}: {
  id: string; title: string; dueLabel: string; overdue: boolean
  clientId: string; clientName: string; nextDay: string; showClient?: boolean
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [justDone, setJustDone] = useState(false)
  const [askNext, setAskNext] = useState(false)

  const markDone = () =>
    startTransition(async () => {
      const res = await setFollowupDone(id, true)
      if (res.ok) { setJustDone(true); setAskNext(true) }
    })

  return (
    <li className="py-4" style={{ borderTop: DIVIDER }}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`text-[15px] font-medium ${justDone ? 'text-text-muted line-through' : 'text-text-primary'}`}>{title}</p>
          <p className={`${META} mt-1`}>
            {showClient && <><Link href={`/admin/clientes/${clientId}`} className="font-medium text-text-secondary underline-offset-4 hover:underline">{clientName}</Link> · </>}
            <span style={overdue && !justDone ? { color: '#9b2c1f', fontWeight: 600 } : undefined}>{dueLabel}</span>
          </p>
        </div>
        {!justDone && (
          <button type="button" onClick={markDone} disabled={pending} className={`${BTN_SECONDARY} shrink-0`}>
            {pending ? 'Guardando…' : 'Hecho'}
          </button>
        )}
      </div>

      {askNext && (
        <div className="mt-4 pl-4" style={{ borderLeft: '2px solid rgba(139,69,19,0.25)' }}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[14px] font-medium text-text-primary">¿Crear el siguiente seguimiento?</p>
            <button type="button" onClick={() => { setAskNext(false); router.refresh() }} className="min-h-11 cursor-pointer text-[14px] text-text-muted underline-offset-4 hover:underline">
              No, gracias
            </button>
          </div>
          <div className="mt-3">
            <FollowupForm clientId={clientId} defaultDay={nextDay} defaultTitle={title} />
          </div>
        </div>
      )}
    </li>
  )
}
