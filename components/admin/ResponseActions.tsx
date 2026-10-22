'use client'

import { useTransition } from 'react'
import SubmitButton from '@/components/admin/SubmitButton'
import FormNotice from '@/components/admin/FormNotice'
import { SelectField } from '@/components/admin/fields'
import { useActionForm } from '@/components/admin/useActionForm'
import { BTN_SECONDARY } from '@/components/admin/styles'
import type { ActionState } from '@/lib/admin/action-state'

// Importar una respuesta al proyecto (sin pisar lo que ya tiene valor, salvo que se confirme)
export function ImportToProject({ action, projects, defaultProjectId }: {
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
  projects: { id: string; label: string }[]
  defaultProjectId: string
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  if (projects.length === 0) return <p className="text-[13px] text-text-muted">Cree un proyecto para poder importar esta respuesta.</p>
  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      <SelectField
        name="projectId"
        label="Proyecto"
        defaultValue={defaultProjectId}
        options={[{ value: '', label: 'Elija un proyecto' }, ...projects.map(p => ({ value: p.id, label: p.label }))]}
        error={state.errors?.projectId}
      />
      <label className="flex min-h-11 w-fit cursor-pointer items-center gap-3 text-[14px] text-text-primary">
        <input type="checkbox" name="overwrite" className="h-5 w-5 cursor-pointer" style={{ accentColor: '#8b4513' }} />
        Reemplazar también los campos que ya tienen valor
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending} pendingLabel="Importando…">Importar al proyecto</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}

export function CreateClientButton({ action }: { action: () => Promise<ActionState> }) {
  const [pending, startTransition] = useTransition()
  return (
    <button type="button" disabled={pending} onClick={() => startTransition(async () => { await action() })} className={BTN_SECONDARY}>
      {pending ? 'Creando…' : 'Crear cliente desde esta respuesta'}
    </button>
  )
}
