import { z } from 'zod'
import { diag } from '@/lib/translations'

// Cada respuesta es el índice de una opción válida de esa pregunta (o null si se saltó)
const answers = z
  .array(z.number().int().min(0).max(9).nullable())
  .length(diag.questions.length)
  .refine(list => list.every((a, i) => a === null || a < diag.questions[i].options.length), 'Respuesta fuera de rango')

// Envío público del diagnóstico: validación estricta + campo trampa para bots
export const diagnosticLeadSchema = z.object({
  answers,
  lang: z.enum(['es', 'en']),
  contact: z.object({
    name: z.string().trim().min(1).max(120),
    business: z.string().trim().min(1).max(160),
    countryCode: z.string().regex(/^\+\d{1,4}$/),
    phone: z.string().trim().min(6).max(30),
    email: z.string().trim().max(200).refine(v => v === '' || z.email().safeParse(v).success),
  }),
  // Honeypot: un humano nunca lo llena porque está oculto
  website: z.string().max(0),
})
export type DiagnosticLeadInput = z.input<typeof diagnosticLeadSchema>
