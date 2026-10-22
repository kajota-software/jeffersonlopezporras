import FollowupItem from '@/components/admin/FollowupItem'
import { formatDue, toDayString, startOfDayCR } from '@/lib/admin/dates'
import { META, SECTION_TITLE } from '@/components/admin/styles'

type Row = { _id: unknown; clientId: unknown; title: string; dueAt: Date; clientName?: string }

// Grupo de seguimientos con título y contador
export default function FollowupList({ title, rows, overdue = false, showClient = true, empty }: {
  title: string; rows: Row[]; overdue?: boolean; showClient?: boolean; empty?: string
}) {
  const nextDay = toDayString(startOfDayCR(7))
  return (
    <section>
      <h2 className={SECTION_TITLE}>
        {title} <span className={`${META} font-normal`}>({rows.length})</span>
      </h2>
      {rows.length === 0 ? (
        <p className={`${META} mt-2`}>{empty ?? 'Nada pendiente.'}</p>
      ) : (
        <ul className="mt-2">
          {rows.map(f => (
            <FollowupItem
              key={String(f._id)}
              id={String(f._id)}
              title={f.title}
              dueLabel={formatDue(f.dueAt)}
              overdue={overdue}
              clientId={String(f.clientId)}
              clientName={f.clientName ?? ''}
              nextDay={nextDay}
              showClient={showClient}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
