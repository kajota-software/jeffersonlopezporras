import { z } from 'zod'

// Texto opcional recortado, con límite de largo
export const text = (max: number) => z.string().trim().max(max, `Máximo ${max} caracteres`).default('')
export const requiredText = (max: number, message: string) => z.string().trim().min(1, message).max(max, `Máximo ${max} caracteres`)

export const objectIdString = z.string().regex(/^[0-9a-f]{24}$/i, 'Identificador no válido')

export const optionalEmail = z
  .string()
  .trim()
  .max(200)
  .default('')
  .refine(v => v === '' || z.email().safeParse(v).success, 'Email no válido')

export const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .default('')
  .refine(v => v === '' || /^https?:\/\/\S+$/.test(v), 'Debe empezar con http:// o https://')

export const dayString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Elija una fecha')
export const optionalDay = z.union([z.literal(''), dayString]).default('')
export const optionalTime = z.union([z.literal(''), z.string().regex(/^\d{2}:\d{2}$/, 'Hora no válida')]).default('')

// FormData → objeto plano (los checkbox ausentes no llegan, igual que en HTML)
export function formToObject(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of fd.entries()) if (typeof value === 'string' && !key.startsWith('$ACTION')) out[key] = value
  return out
}
