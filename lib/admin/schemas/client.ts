import { z } from 'zod'
import { BUSINESS_TYPES, CLIENT_SOURCES, CLIENT_STATUSES } from '@/lib/admin/constants'
import { normalizePhone } from '@/lib/admin/phone'
import { dayString, optionalEmail, optionalUrl, requiredText, text } from './common'

const phone = z
  .string()
  .trim()
  .max(30)
  .default('')
  .transform(normalizePhone)
  .refine(v => v === '' || v.length >= 8, 'Incluya el código de país, por ejemplo 506 8888 7777')

export const contactSchema = z.object({
  name: text(120),
  role: text(80),
  phone,
  email: optionalEmail,
})

// Etiquetas separadas por comas → lista sin repetidos
const tags = z
  .string()
  .max(500)
  .default('')
  .transform(v => [...new Set(v.split(',').map(t => t.trim().toLowerCase()).filter(Boolean))].slice(0, 20))

// Los contactos llegan como JSON desde el editor de filas del formulario
const contacts = z
  .string()
  .max(20_000)
  .default('[]')
  .transform((v, ctx) => {
    try { return JSON.parse(v) as unknown } catch { ctx.addIssue({ code: 'custom', message: 'Contactos no válidos' }); return z.NEVER }
  })
  .pipe(z.array(contactSchema).max(20, 'Máximo 20 contactos'))
  .transform(list => list.filter(c => c.name || c.phone || c.email))

export const clientSchema = z.object({
  name: requiredText(120, 'Escriba el nombre'),
  business: text(160),
  businessType: z.enum(BUSINESS_TYPES),
  whatsapp: phone,
  email: optionalEmail,
  country: text(80),
  location: text(120),
  status: z.enum(CLIENT_STATUSES),
  source: z.enum(CLIENT_SOURCES),
  tags,
  notes: text(5000),
  contacts,
})
export type ClientInput = z.infer<typeof clientSchema>

export const clientTechSchema = z.object({
  domain: text(200),
  registrar: text(120),
  domainExpiresAt: z.union([z.literal(''), dayString]).default(''),
  hosting: text(120),
  productionUrl: optionalUrl,
  repoUrl: optionalUrl,
  accessNotes: text(2000),
})
