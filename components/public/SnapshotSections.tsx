import type { ProjectSection } from '@/lib/admin/collections'
import { formatDate, fromDayString } from '@/lib/admin/dates'

const DIVIDER = '1px solid rgba(28,18,9,0.12)'

function Value({ type, value }: { type: string; value: string }) {
  if (type === 'list') {
    return (
      <ul className="mt-1 list-disc pl-5 text-[15px] leading-[1.7] text-text-primary marker:text-accent">
        {value.split('\n').map(v => v.trim()).filter(Boolean).map((v, i) => <li key={i}>{v}</li>)}
      </ul>
    )
  }
  if (type === 'money') return <p className="mt-1 text-[15px] text-text-primary">${Number(value).toLocaleString('en-US')} USD</p>
  if (type === 'date') return <p className="mt-1 text-[15px] text-text-primary">{formatDate(fromDayString(value))}</p>
  return <p className="mt-1 whitespace-pre-line text-[15px] leading-[1.7] text-text-primary">{value}</p>
}

// Secciones congeladas de un documento: solo lo que tiene contenido
export default function SnapshotSections({ sections }: { sections: ProjectSection[] }) {
  return (
    <div className="flex flex-col">
      {sections.map((s, i) => {
        const fields = s.fields.filter(f => f.value.trim())
        const empty = fields.length === 0 && s.checklist.length === 0 && !s.notes.trim()
        return (
          <section key={s.key} className="print-avoid-break py-8" style={{ borderTop: DIVIDER }}>
            <h2 className="flex items-baseline gap-3 text-[1.25rem] font-bold tracking-tight text-text-primary">
              <span className="text-[13px] font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </h2>
            {empty && <p className="mt-3 text-[14px] text-text-muted">Sin información todavía.</p>}

            {fields.length > 0 && (
              <dl className="mt-4 flex flex-col gap-4">
                {fields.map(f => (
                  <div key={f.key}>
                    <dt className="text-[13px] font-medium text-text-secondary">{f.label}</dt>
                    <dd><Value type={f.type} value={f.value} /></dd>
                  </div>
                ))}
              </dl>
            )}

            {s.checklist.length > 0 && (
              <ul className="mt-5">
                {s.checklist.map(c => (
                  <li key={c.id} className="flex gap-4 py-2.5 text-[15px]" style={{ borderTop: '1px solid rgba(28,18,9,0.07)' }}>
                    <span className="w-20 shrink-0 text-[13px] font-semibold" style={{ color: c.done ? '#1e6b52' : '#7a6045' }}>
                      {c.done ? 'Hecho' : 'Pendiente'}
                    </span>
                    <span className="text-text-primary">
                      {c.label}
                      {c.comment && <span className="block text-[14px] text-text-secondary">{c.comment}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {s.notes.trim() && <p className="mt-5 whitespace-pre-line text-[15px] leading-[1.7] text-text-secondary">{s.notes}</p>}
          </section>
        )
      })}
    </div>
  )
}
