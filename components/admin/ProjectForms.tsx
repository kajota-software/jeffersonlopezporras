'use client'

import { SelectField, TextField, toOptions } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import FormNotice from '@/components/admin/FormNotice'
import { useActionForm } from '@/components/admin/useActionForm'
import { createProject } from '@/lib/admin/actions/projects'
import { PACKAGE } from '@/lib/admin/constants'
import type { ActionState } from '@/lib/admin/action-state'

export function ProjectCreateForm({
  clients, clientId, defaultName, defaultStart,
}: {
  clients: { id: string; label: string }[]
  clientId?: string
  defaultName?: string
  defaultStart: string
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(createProject)
  const e = state.errors ?? {}
  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <SelectField
        name="clientId"
        label="Cliente *"
        defaultValue={clientId ?? ''}
        options={[{ value: '', label: 'Elija un cliente' }, ...clients.map(c => ({ value: c.id, label: c.label }))]}
        error={e.clientId}
      />
      <TextField name="name" label="Nombre del proyecto *" defaultValue={defaultName} error={e.name} placeholder="Sitio de Cabinas Río Azul" />
      <SelectField name="package" label="Paquete" defaultValue="reserva_directa" options={toOptions(PACKAGE)} error={e.package} help="Define el checklist de entrega. No se puede cambiar después." />
      <div className="grid grid-cols-2 gap-4 sm:max-w-[420px]">
        <TextField name="startDate" label="Inicio" type="date" defaultValue={defaultStart} error={e.startDate} />
        <TextField name="dueDate" label="Entrega estimada" type="date" error={e.dueDate} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending} pendingLabel="Creando…">Crear proyecto</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}

export function ProjectInfoForm({ action, values }: {
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
  values: { name: string; startDate: string; dueDate: string }
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  const e = state.errors ?? {}
  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <TextField name="name" label="Nombre del proyecto" defaultValue={values.name} error={e.name} />
      <div className="grid grid-cols-2 gap-4 sm:max-w-[420px]">
        <TextField name="startDate" label="Inicio" type="date" defaultValue={values.startDate} error={e.startDate} />
        <TextField name="dueDate" label="Entrega estimada" type="date" defaultValue={values.dueDate} error={e.dueDate} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending}>Guardar datos</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}
