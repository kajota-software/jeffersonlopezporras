'use client'

import { SelectField, TextArea, TextField } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import FormNotice from '@/components/admin/FormNotice'
import { useActionForm } from '@/components/admin/useActionForm'
import { DIVIDER, LABEL } from '@/components/admin/styles'
import { createForm } from '@/lib/admin/actions/forms'
import { BUSINESS_INFO_TEMPLATE } from '@/lib/admin/templates/form'
import type { ActionState } from '@/lib/admin/action-state'

type Option = { id: string; label: string }
const toSelect = (list: Option[], empty: string) => [{ value: '', label: empty }, ...list.map(o => ({ value: o.id, label: o.label }))]

// Datos generales del formulario (título, descripción y a qué cliente o proyecto pertenece)
function MetaFields({ errors, values, clients, projects }: {
  errors: Record<string, string>
  values: { title: string; description: string; clientId: string; projectId: string }
  clients: Option[]
  projects: Option[]
}) {
  return (
    <>
      <TextField name="title" label="Título *" defaultValue={values.title} error={errors.title} />
      <TextArea name="description" label="Descripción" rows={3} defaultValue={values.description} error={errors.description} help="Se muestra arriba del formulario." />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="clientId" label="Cliente" defaultValue={values.clientId} options={toSelect(clients, 'Sin cliente (por ejemplo, un formulario abierto)')} error={errors.clientId} />
        <SelectField name="projectId" label="Proyecto" defaultValue={values.projectId} options={toSelect(projects, 'Sin proyecto')} error={errors.projectId} help="Las respuestas se importan a este proyecto." />
      </div>
    </>
  )
}

export function FormCreateForm({ clients, projects, clientId = '', projectId = '' }: { clients: Option[]; projects: Option[]; clientId?: string; projectId?: string }) {
  const { state, pending, formRef, onSubmit } = useActionForm(createForm)
  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <fieldset>
        <legend className={LABEL}>Empezar con</legend>
        <div className="flex flex-col">
          {[
            { value: 'negocio', label: `Plantilla «${BUSINESS_INFO_TEMPLATE.title}»`, help: `${BUSINESS_INFO_TEMPLATE.fields.length} preguntas listas, conectadas con las secciones del proyecto` },
            { value: 'blank', label: 'Formulario en blanco', help: 'Usted agrega las preguntas' },
          ].map((o, i) => (
            <label key={o.value} className="flex min-h-11 cursor-pointer items-start gap-3 py-2" style={i ? { borderTop: DIVIDER } : undefined}>
              <input type="radio" name="template" value={o.value} defaultChecked={i === 0} className="mt-1 h-5 w-5 shrink-0 cursor-pointer" style={{ accentColor: '#8b4513' }} />
              <span>
                <span className="block text-[15px] font-medium text-text-primary">{o.label}</span>
                <span className="block text-[13px] text-text-muted">{o.help}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <MetaFields
        errors={state.errors ?? {}}
        values={{ title: BUSINESS_INFO_TEMPLATE.title, description: BUSINESS_INFO_TEMPLATE.description, clientId, projectId }}
        clients={clients}
        projects={projects}
      />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending} pendingLabel="Creando…">Crear formulario</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}

export function FormMetaForm({ action, values, clients, projects }: {
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
  values: { title: string; description: string; clientId: string; projectId: string }
  clients: Option[]
  projects: Option[]
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <MetaFields errors={state.errors ?? {}} values={values} clients={clients} projects={projects} />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending}>Guardar datos</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}
