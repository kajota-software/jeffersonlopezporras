import type { z } from 'zod'

// Resultado común de las Server Actions con formulario (useActionState)
export type ActionState = {
  ok: boolean
  message?: string
  errors?: Record<string, string>
}

export const initialState: ActionState = { ok: false }

// Primer error de cada campo, listo para mostrar debajo del input
export function fromZodError(error: z.ZodError): ActionState {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    errors[key] ??= issue.message
  }
  return { ok: false, message: 'Revise los campos marcados.', errors }
}
