'use client'

import { useActionState, useEffect, useLayoutEffect, useRef, startTransition } from 'react'
import type { FormEvent } from 'react'
import { initialState } from '@/lib/admin/action-state'
import type { ActionState } from '@/lib/admin/action-state'

// Envía el formulario a una Server Action SIN el reinicio automático de React 19
// (con <form action> los campos se vaciaban aunque hubiera errores de validación).
// resetOnSuccess: limpia el formulario solo cuando la acción salió bien.
export function useActionForm(action: (prev: ActionState, fd: FormData) => Promise<ActionState>, { resetOnSuccess = false } = {}) {
  // El servidor manda una acción "nueva" (bind) en cada refresco; useActionState recibe siempre
  // la misma función y esta llama a la última recibida
  const actionRef = useRef(action)
  useLayoutEffect(() => { actionRef.current = action }, [action])
  const [state, dispatch, pending] = useActionState((prev: ActionState, fd: FormData) => actionRef.current(prev, fd), initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (resetOnSuccess && state.ok) formRef.current?.reset()
  }, [state, resetOnSuccess])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(() => dispatch(fd))
  }

  return { state, pending, formRef, onSubmit }
}
