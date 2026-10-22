import { z } from 'zod'
import { DELIVERABLE_KINDS, PACKAGES, PROJECT_STAGES } from '@/lib/admin/constants'
import { optionalDay, requiredText, text } from './common'

export const projectCreateSchema = z.object({
  clientId: z.string().regex(/^[0-9a-f]{24}$/i, 'Elija un cliente'),
  name: requiredText(160, 'Escriba el nombre del proyecto'),
  package: z.enum(PACKAGES),
  startDate: optionalDay,
  dueDate: optionalDay,
})

export const projectInfoSchema = z.object({
  name: requiredText(160, 'Escriba el nombre del proyecto'),
  startDate: optionalDay,
  dueDate: optionalDay,
})

export const stageSchema = z.enum(PROJECT_STAGES)

// Límites de lo que se guarda por sección (los campos válidos los define la sección guardada, no el formulario)
export const SECTION_LIMITS = { value: 5000, notes: 10_000, comment: 1000 } as const

export const deliverableSchema = z.object({
  kind: z.enum(DELIVERABLE_KINDS),
  title: requiredText(200, 'Escriba un título'),
  intro: text(5000),
  sections: z.array(z.string().max(60)).min(1, 'Elija al menos una sección').max(30),
})
