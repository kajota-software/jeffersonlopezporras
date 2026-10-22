'use client'

import { useEffect, useRef } from 'react'
import FormRenderer from '@/components/forms/FormRenderer'
import { useActionForm } from '@/components/admin/useActionForm'
import type { FormField } from '@/lib/admin/collections'
import type { ActionState } from '@/lib/admin/action-state'

// Formulario público: envía a la Server Action y, al terminar, muestra la pantalla de gracias
export default function PublicForm({ fields, action }: {
  fields: FormField[]
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  const noticeRef = useRef<HTMLParagraphElement>(null)

  // Con errores, lleva el foco al mensaje para que se lea y se vea
  useEffect(() => {
    if (!state.ok && state.message) noticeRef.current?.focus()
  }, [state])

  if (state.ok) {
    return (
      <div role="status" className="py-10">
        <h2 className="text-[1.6rem] font-bold tracking-tight text-text-primary">¡Gracias! Recibimos sus respuestas.</h2>
        <p className="mt-3 text-[1.05rem] leading-[1.7] text-text-secondary">
          Las vamos a revisar y le escribimos pronto por WhatsApp. Ya puede cerrar esta página.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">
      {state.message && (
        <p ref={noticeRef} tabIndex={-1} role="alert" className="mb-8 text-[15px] font-medium outline-none" style={{ color: '#9b2c1f' }}>
          {state.message}
        </p>
      )}
      <FormRenderer fields={fields} errors={state.errors} />

      {/* Campo trampa para bots: oculto para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-10 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-accent px-8 text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-bright disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? 'Enviando…' : 'Enviar respuestas'}
      </button>
    </form>
  )
}
