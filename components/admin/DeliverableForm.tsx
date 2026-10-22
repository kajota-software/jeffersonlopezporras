'use client'

import { useState } from 'react'
import { SelectField, TextArea, TextField } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import FormNotice from '@/components/admin/FormNotice'
import { useActionForm } from '@/components/admin/useActionForm'
import { DIVIDER } from '@/components/admin/styles'
import { DELIVERABLE_KIND, DELIVERABLE_KINDS } from '@/lib/admin/constants'
import type { DeliverableKind } from '@/lib/admin/constants'
import { DELIVERABLE_DEFAULT_SECTIONS } from '@/lib/admin/templates/project'
import type { ActionState } from '@/lib/admin/action-state'

// Generar documento: tipo, título, introducción y qué secciones se congelan en la copia
export default function DeliverableForm({ action, projectName, sections }: {
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
  projectName: string
  sections: { key: string; title: string }[]
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  const [kind, setKind] = useState<DeliverableKind>('resumen')
  const [selected, setSelected] = useState<string[]>([...DELIVERABLE_DEFAULT_SECTIONS.resumen])
  const [title, setTitle] = useState(`${DELIVERABLE_KIND.resumen} — ${projectName}`)
  const e = state.errors ?? {}

  const changeKind = (next: DeliverableKind) => {
    setKind(next)
    setSelected([...DELIVERABLE_DEFAULT_SECTIONS[next]])
    setTitle(`${DELIVERABLE_KIND[next]} — ${projectName}`)
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <SelectField
        name="kind"
        label="Tipo de documento"
        value={kind}
        onChange={ev => changeKind(ev.target.value as DeliverableKind)}
        options={DELIVERABLE_KINDS.map(k => ({ value: k, label: DELIVERABLE_KIND[k] }))}
        className="sm:max-w-[320px]"
      />
      <TextField name="title" label="Título *" value={title} onChange={ev => setTitle(ev.target.value)} error={e.title} />
      <TextArea name="intro" label="Introducción" rows={3} error={e.intro} help="Texto para el cliente al inicio del documento (opcional)." />

      <fieldset>
        <legend className="mb-2 text-[13px] font-medium text-text-secondary">Secciones a incluir</legend>
        <ul className="grid sm:grid-cols-2 sm:gap-x-6">
          {sections.map(s => (
            <li key={s.key} style={{ borderTop: DIVIDER }}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-text-primary">
                <input
                  type="checkbox"
                  name="sections"
                  value={s.key}
                  checked={selected.includes(s.key)}
                  onChange={ev => setSelected(list => (ev.target.checked ? [...list, s.key] : list.filter(k => k !== s.key)))}
                  className="h-5 w-5 shrink-0 cursor-pointer"
                  style={{ accentColor: '#8b4513' }}
                />
                {s.title}
              </label>
            </li>
          ))}
        </ul>
        {e.sections && <p className="mt-2 text-[13px]" style={{ color: '#9b2c1f' }}>{e.sections}</p>}
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending} pendingLabel="Generando…">Generar documento</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}
