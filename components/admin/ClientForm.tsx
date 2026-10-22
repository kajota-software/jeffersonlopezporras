'use client'

import { useState } from 'react'
import { TextArea, TextField, SelectField, toOptions } from '@/components/admin/fields'
import SubmitButton from '@/components/admin/SubmitButton'
import { useActionForm } from '@/components/admin/useActionForm'
import FormNotice from '@/components/admin/FormNotice'
import { BTN_SECONDARY, INPUT, SECTION_TITLE, DIVIDER } from '@/components/admin/styles'
import { BUSINESS_TYPE, CLIENT_SOURCE, CLIENT_STATUS } from '@/lib/admin/constants'
import type { ActionState } from '@/lib/admin/action-state'
import type { Contact } from '@/lib/admin/collections'

export type ClientFormValues = {
  name: string; business: string; businessType: string; whatsapp: string; email: string
  country: string; location: string; status: string; source: string; tags: string[]; notes: string
  contacts: Contact[]
}

export const EMPTY_CLIENT: ClientFormValues = {
  name: '', business: '', businessType: 'hospedaje', whatsapp: '', email: '', country: 'Costa Rica',
  location: '', status: 'lead', source: 'otro', tags: [], notes: '', contacts: [],
}

const statusOptions = Object.entries(CLIENT_STATUS).map(([value, s]) => ({ value, label: s.label }))
const EMPTY_CONTACT: Contact = { name: '', role: '', phone: '', email: '' }

export default function ClientForm({
  action, values, submitLabel,
}: {
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
  values: ClientFormValues
  submitLabel: string
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  const [contacts, setContacts] = useState<Contact[]>(values.contacts)
  const e = state.errors ?? {}

  const setContact = (i: number, patch: Partial<Contact>) =>
    setContacts(list => list.map((c, j) => (j === i ? { ...c, ...patch } : c)))

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Nombre *" defaultValue={values.name} error={e.name} autoComplete="off" required />
        <TextField name="business" label="Negocio" defaultValue={values.business} error={e.business} autoComplete="off" />
        <SelectField name="businessType" label="Tipo de negocio" defaultValue={values.businessType} options={toOptions(BUSINESS_TYPE)} error={e.businessType} />
        <TextField name="whatsapp" label="WhatsApp" type="tel" defaultValue={values.whatsapp} error={e.whatsapp} help="Con código de país: 506 8888 7777" />
        <TextField name="email" label="Email" type="email" defaultValue={values.email} error={e.email} />
        <TextField name="location" label="Ubicación" defaultValue={values.location} error={e.location} help="Ciudad o zona" />
        <TextField name="country" label="País" defaultValue={values.country} error={e.country} />
        <SelectField name="status" label="Estado" defaultValue={values.status} options={statusOptions} error={e.status} />
        <SelectField name="source" label="Origen" defaultValue={values.source} options={toOptions(CLIENT_SOURCE)} error={e.source} />
        <TextField name="tags" label="Etiquetas" defaultValue={values.tags.join(', ')} error={e.tags} help="Separadas por comas" />
      </div>
      <TextArea name="notes" label="Notas" defaultValue={values.notes} error={e.notes} />

      {/* Contactos: filas editables que viajan como JSON en un campo oculto */}
      <fieldset className="pt-5" style={{ borderTop: DIVIDER }}>
        <legend className={SECTION_TITLE}>Contactos</legend>
        <input type="hidden" name="contacts" value={JSON.stringify(contacts)} />
        {contacts.length === 0 && <p className="mt-2 text-[14px] text-text-muted">Sin contactos adicionales.</p>}
        <ul className="mt-3 flex flex-col gap-5">
          {contacts.map((c, i) => (
            <li key={i} className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] sm:items-end">
              {(['name', 'role', 'phone', 'email'] as const).map(k => (
                <div key={k}>
                  <label htmlFor={`contact-${i}-${k}`} className="mb-1.5 block text-[12px] font-medium text-text-secondary">
                    {{ name: 'Nombre', role: 'Rol', phone: 'Teléfono', email: 'Email' }[k]}
                  </label>
                  <input
                    id={`contact-${i}-${k}`}
                    type={k === 'email' ? 'email' : k === 'phone' ? 'tel' : 'text'}
                    value={c[k]}
                    onChange={ev => setContact(i, { [k]: ev.target.value })}
                    className={INPUT}
                  />
                </div>
              ))}
              <button type="button" onClick={() => setContacts(list => list.filter((_, j) => j !== i))} className={BTN_SECONDARY} aria-label={`Quitar contacto ${i + 1}`}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
        {e.contacts && <p className="mt-2 text-[13px]" style={{ color: '#9b2c1f' }}>{e.contacts}</p>}
        <button type="button" onClick={() => setContacts(list => [...list, EMPTY_CONTACT])} className={`${BTN_SECONDARY} mt-4`}>
          Agregar contacto
        </button>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
        <FormNotice state={state} />
      </div>
    </form>
  )
}
