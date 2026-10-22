'use client'

import { useState } from 'react'
import { TextArea, TextField } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import FormNotice from '@/components/admin/FormNotice'
import ProgressBar from '@/components/admin/ProgressBar'
import { useActionForm } from '@/components/admin/useActionForm'
import { DIVIDER, INPUT, META } from '@/components/admin/styles'
import type { ProjectSection } from '@/lib/admin/collections'
import type { ActionState } from '@/lib/admin/action-state'

// Una sección del proyecto: plegable, con sus campos, checks con comentario y notas. Se guarda sola.
export default function SectionEditor({
  index, section, action, open = false,
}: {
  index: number
  section: ProjectSection
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
  open?: boolean
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  // Abierta o cerrada solo al cargar: después la maneja el usuario (si no, se cerraría al guardar)
  const [initiallyOpen] = useState(open)
  // Los checks se controlan aquí para que el % de avance cambie al marcar, antes de guardar
  const [checks, setChecks] = useState(() => Object.fromEntries(section.checklist.map(c => [c.id, c.done])))
  const done = Object.values(checks).filter(Boolean).length
  const total = section.checklist.length
  const pct = total ? Math.round((done / total) * 100) : 0
  const e = state.errors ?? {}

  return (
    <details open={initiallyOpen} className="group py-2" style={{ borderTop: DIVIDER }}>
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-2">
        <span className="flex min-w-0 items-baseline gap-3">
          <span className="w-6 shrink-0 text-[13px] font-semibold tabular-nums text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-[15px] font-semibold text-text-primary">{section.title}</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          {total > 0 && <span className={`${META} tabular-nums`}>{done}/{total}</span>}
          <span aria-hidden className="text-text-muted transition-transform duration-200 group-open:rotate-90">›</span>
        </span>
      </summary>

      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5 pb-6 pl-0 pt-2 sm:pl-9" noValidate>
        {total > 0 && <ProgressBar pct={pct} label={`Avance de ${section.title}`} />}

        {section.fields.map(field => {
          const name = `field.${field.key}`
          const common = { name, label: field.label, defaultValue: field.value, error: e[name] }
          if (field.type === 'text') return <TextField key={field.key} {...common} />
          if (field.type === 'date') return <TextField key={field.key} {...common} type="date" className="sm:max-w-[220px]" />
          if (field.type === 'money') return <TextField key={field.key} {...common} inputMode="decimal" help="En USD, solo el número" className="sm:max-w-[220px]" />
          if (field.type === 'list') return <TextArea key={field.key} {...common} rows={3} help="Un elemento por línea" />
          return <TextArea key={field.key} {...common} rows={3} />
        })}

        {total > 0 && (
          <fieldset>
            <legend className="mb-2 text-[13px] font-medium text-text-secondary">Checklist</legend>
            <ul className="flex flex-col">
              {section.checklist.map(item => (
                <li key={item.id} className="grid gap-2 py-3 sm:grid-cols-[1fr_minmax(0,260px)] sm:items-center sm:gap-4" style={{ borderTop: DIVIDER }}>
                  <label className="flex min-h-11 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name={`check.${item.id}`}
                      checked={checks[item.id]}
                      onChange={ev => setChecks(c => ({ ...c, [item.id]: ev.target.checked }))}
                      className="h-5 w-5 shrink-0 cursor-pointer"
                      style={{ accentColor: '#8b4513' }}
                    />
                    <span className={`text-[15px] ${checks[item.id] ? 'text-text-muted line-through' : 'text-text-primary'}`}>{item.label}</span>
                  </label>
                  <input
                    type="text"
                    name={`comment.${item.id}`}
                    defaultValue={item.comment}
                    aria-label={`Comentario: ${item.label}`}
                    placeholder="Comentario"
                    className={INPUT}
                  />
                </li>
              ))}
            </ul>
          </fieldset>
        )}

        <TextArea name="notes" label="Notas de la sección" defaultValue={section.notes} rows={3} />

        <div className="flex flex-wrap items-center gap-4">
          <SubmitButton pending={pending}>Guardar sección</SubmitButton>
          <FormNotice state={state} />
        </div>
      </form>
    </details>
  )
}
