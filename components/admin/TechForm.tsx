'use client'

import { TextArea, TextField } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import { useActionForm } from '@/components/admin/useActionForm'
import FormNotice from '@/components/admin/FormNotice'
import type { ActionState } from '@/lib/admin/action-state'

export type TechValues = {
  domain: string; registrar: string; domainExpiresAt: string; hosting: string
  productionUrl: string; repoUrl: string; accessNotes: string
}

export default function TechForm({ action, values }: { action: (prev: ActionState, fd: FormData) => Promise<ActionState>; values: TechValues }) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  const e = state.errors ?? {}

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="domain" label="Dominio" defaultValue={values.domain} error={e.domain} placeholder="negocio.com" />
        <TextField name="registrar" label="Registrador" defaultValue={values.registrar} error={e.registrar} placeholder="Namecheap, NIC Costa Rica…" />
        <TextField name="domainExpiresAt" label="Vencimiento del dominio" type="date" defaultValue={values.domainExpiresAt} error={e.domainExpiresAt} />
        <TextField name="hosting" label="Hosting" defaultValue={values.hosting} error={e.hosting} placeholder="Vercel" />
        <TextField name="productionUrl" label="URL en producción" type="url" defaultValue={values.productionUrl} error={e.productionUrl} />
        <TextField name="repoUrl" label="Repositorio" type="url" defaultValue={values.repoUrl} error={e.repoUrl} />
      </div>
      <TextArea
        name="accessNotes"
        label="Dónde están los accesos"
        defaultValue={values.accessNotes}
        error={e.accessNotes}
        help="Nunca contraseñas aquí. Solo la referencia, por ejemplo: «1Password, entrada Cabinas X»."
      />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending}>Guardar ficha técnica</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}
