'use client'

import { SelectField, TextField } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import { useActionForm } from '@/components/admin/useActionForm'
import FormNotice from '@/components/admin/FormNotice'
import { createFollowup } from '@/lib/admin/actions/crm'

// Con clientId fijo (desde la ficha del cliente) o eligiendo el cliente en una lista
export default function FollowupForm({
  clientId, clients, defaultDay, defaultTitle = '',
}: {
  clientId?: string
  clients?: { id: string; label: string }[]
  defaultDay: string
  defaultTitle?: string
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(createFollowup, { resetOnSuccess: true })
  const e = state.errors ?? {}

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {clientId ? (
        <input type="hidden" name="clientId" value={clientId} />
      ) : (
        <SelectField
          name="clientId"
          label="Cliente"
          options={[{ value: '', label: 'Elija un cliente' }, ...(clients ?? []).map(c => ({ value: c.id, label: c.label }))]}
          error={e.clientId}
        />
      )}
      <TextField name="title" label="Qué hay que hacer" defaultValue={defaultTitle} error={e.title} />
      <div className="grid grid-cols-2 gap-4 sm:max-w-[420px]">
        <TextField name="dueDay" label="Fecha" type="date" defaultValue={defaultDay} error={e.dueDay} />
        <TextField name="dueTime" label="Hora (opcional)" type="time" error={e.dueTime} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending} pendingLabel="Creando…">Crear seguimiento</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}
