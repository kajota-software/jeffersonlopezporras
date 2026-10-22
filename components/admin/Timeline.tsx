import { ACTIVITY_TYPE } from '@/lib/admin/constants'
import type { ActivityType } from '@/lib/admin/constants'
import { formatDateTime } from '@/lib/admin/dates'
import { DIVIDER, META } from '@/components/admin/styles'
import EmptyState from '@/components/admin/EmptyState'

type Item = { id: string; type: ActivityType; body: string; createdAt: Date }

// Línea de tiempo del cliente; las entradas del sistema van en tono apagado
export default function Timeline({ items }: { items: Item[] }) {
  if (items.length === 0) return <EmptyState title="Sin actividad todavía." />
  return (
    <ol>
      {items.map(a => (
        <li key={a.id} className="py-4" style={{ borderTop: DIVIDER }}>
          <p className={META}>
            <span className="font-semibold" style={{ color: a.type === 'sistema' ? '#7a6045' : '#8b4513' }}>{ACTIVITY_TYPE[a.type]}</span>
            {' · '}
            <time dateTime={a.createdAt.toISOString()}>{formatDateTime(a.createdAt)}</time>
          </p>
          <p className={`mt-1 whitespace-pre-line text-[15px] leading-[1.6] ${a.type === 'sistema' ? 'text-text-secondary' : 'text-text-primary'}`}>{a.body}</p>
        </li>
      ))}
    </ol>
  )
}
