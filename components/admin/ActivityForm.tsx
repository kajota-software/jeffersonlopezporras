'use client'

import { SelectField, TextArea } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import { useActionForm } from '@/components/admin/useActionForm'
import FormNotice from '@/components/admin/FormNotice'
import { ACTIVITY_TYPE, MANUAL_ACTIVITY_TYPES } from '@/lib/admin/constants'
import type { ActionState } from '@/lib/admin/action-state'

const options = MANUAL_ACTIVITY_TYPES.map(t => ({ value: t, label: ACTIVITY_TYPE[t] }))

export default function ActivityForm({ action }: { action: (prev: ActionState, fd: FormData) => Promise<ActionState> }) {
  const { state, pending, formRef, onSubmit } = useActionForm(action, { resetOnSuccess: true })
  const e = state.errors ?? {}

  return (
    // Al registrar con éxito el formulario se vacía para la siguiente entrada
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <SelectField name="type" label="Tipo" options={options} defaultValue="nota" error={e.type} className="sm:max-w-[240px]" />
      <TextArea name="body" label="Detalle" rows={3} error={e.body} />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending} pendingLabel="Registrando…">Registrar</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}
