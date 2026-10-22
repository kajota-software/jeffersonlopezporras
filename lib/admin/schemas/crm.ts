import { z } from 'zod'
import { MANUAL_ACTIVITY_TYPES } from '@/lib/admin/constants'
import { dayString, optionalTime, requiredText } from './common'

export const activitySchema = z.object({
  type: z.enum(MANUAL_ACTIVITY_TYPES as [string, ...string[]]),
  body: requiredText(5000, 'Escriba el detalle'),
})

export const followupSchema = z.object({
  clientId: z.string().regex(/^[0-9a-f]{24}$/i, 'Elija un cliente'),
  title: requiredText(200, 'Escriba qué hay que hacer'),
  dueDay: dayString,
  dueTime: optionalTime,
})
