import { z } from 'zod'
import { FORM_FIELD_TYPES } from '@/lib/admin/constants'
import type { FormAnswer, FormField } from '@/lib/admin/collections'
import { MAP_TARGETS } from '@/lib/admin/templates/form'
import { requiredText, text } from './common'

const optionalId = z.union([z.literal(''), z.string().regex(/^[0-9a-f]{24}$/i)]).default('')

export const formMetaSchema = z.object({
  title: requiredText(160, 'Escriba un título'),
  description: text(2000),
  clientId: optionalId,
  projectId: optionalId,
})

export const formCreateSchema = formMetaSchema.extend({
  template: z.enum(['blank', 'negocio']),
})

const TARGETS = new Set(MAP_TARGETS.map(t => t.value))

export const formFieldSchema = z
  .object({
    id: z.string().regex(/^f[a-z0-9]{3,12}$/),
    type: z.enum(FORM_FIELD_TYPES),
    label: requiredText(300, 'Cada campo necesita una pregunta'),
    help: text(500),
    required: z.boolean(),
    options: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
    mapsTo: z.string().nullable().refine(v => v === null || TARGETS.has(v), 'Destino no válido'),
  })
  .refine(f => !['select', 'multiselect'].includes(f.type) || f.options.length > 0, 'Las preguntas de opciones necesitan al menos una opción')

// Los campos llegan como JSON desde el constructor
export const formFieldsSchema = z
  .string()
  .max(100_000)
  .transform((v, ctx) => {
    try { return JSON.parse(v) as unknown } catch { ctx.addIssue({ code: 'custom', message: 'Campos no válidos' }); return z.NEVER }
  })
  .pipe(z.array(formFieldSchema).max(60, 'Máximo 60 preguntas'))
  .refine(list => new Set(list.map(f => f.id)).size === list.length, 'Hay preguntas repetidas')

const MAX = { short: 500, long: 5000 } as const

// Valida un envío público contra los campos del formulario (no se acepta nada fuera de ellos)
export function validateAnswers(fields: FormField[], fd: FormData) {
  const answers: Record<string, FormAnswer> = {}
  const errors: Record<string, string> = {}

  for (const f of fields) {
    const name = `a.${f.id}`
    if (f.type === 'checkbox') {
      const checked = fd.get(name) === 'on'
      if (f.required && !checked) errors[name] = 'Debe marcar esta casilla'
      answers[f.id] = checked
      continue
    }
    if (f.type === 'multiselect') {
      const picked = fd.getAll(name).map(String).filter(v => f.options.includes(v))
      if (f.required && picked.length === 0) errors[name] = 'Elija al menos una opción'
      answers[f.id] = picked
      continue
    }

    const value = String(fd.get(name) ?? '').trim()
    if (!value) {
      if (f.required) errors[name] = 'Esta pregunta es obligatoria'
      answers[f.id] = ''
      continue
    }
    const max = f.type === 'textarea' ? MAX.long : MAX.short
    if (value.length > max) errors[name] = `Máximo ${max} caracteres`
    else if (f.type === 'email' && !z.email().safeParse(value).success) errors[name] = 'Escriba un email válido'
    else if (f.type === 'phone' && value.replace(/\D/g, '').length < 7) errors[name] = 'Escriba un teléfono válido, con código de país'
    else if (f.type === 'number' && !/^-?\d+([.,]\d+)?$/.test(value)) errors[name] = 'Escriba solo un número'
    else if (f.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) errors[name] = 'Elija una fecha'
    else if (f.type === 'select' && !f.options.includes(value)) errors[name] = 'Elija una de las opciones'
    answers[f.id] = value
  }
  return { answers, errors }
}

// Respuesta como texto plano (para importar al proyecto o mostrarla)
export function answerToText(field: Pick<FormField, 'type'>, value: FormAnswer | undefined): string {
  if (value === undefined) return ''
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  if (Array.isArray(value)) return value.join('\n')
  return value
}
