// En Mongo todo va en UTC; en pantalla, hora de Costa Rica (UTC-6, sin horario de verano)
export const TIME_ZONE = 'America/Costa_Rica'
const CR_OFFSET = '-06:00'

const dateFmt = new Intl.DateTimeFormat('es-CR', { timeZone: TIME_ZONE, day: 'numeric', month: 'short', year: 'numeric' })
const dateTimeFmt = new Intl.DateTimeFormat('es-CR', { timeZone: TIME_ZONE, day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
const isoDayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' })

export const formatDate = (d: Date | null | undefined) => (d ? dateFmt.format(d) : '—')
export const formatDateTime = (d: Date | null | undefined) => (d ? dateTimeFmt.format(d) : '—')

// Día en Costa Rica como 'YYYY-MM-DD' (para <input type="date"> y comparaciones por día)
export const toDayString = (d: Date) => isoDayFmt.format(d)

// 'YYYY-MM-DD' (+ 'HH:MM' opcional) interpretado en hora de Costa Rica → Date UTC
export function fromDayString(day: string, time = '00:00'): Date {
  return new Date(`${day}T${time}:00${CR_OFFSET}`)
}

// Inicio del día de hoy en Costa Rica, desplazado n días
export function startOfDayCR(offsetDays = 0, from = new Date()): Date {
  const start = fromDayString(toDayString(from))
  return new Date(start.getTime() + offsetDays * 86_400_000)
}

// Hora por defecto de un seguimiento sin hora elegida
export const DEFAULT_DUE_TIME = '09:00'
const timeFmt = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, hour: '2-digit', minute: '2-digit' })

// Fecha de un seguimiento: sin hora si es la de por defecto
export const formatDue = (d: Date) => (timeFmt.format(d) === DEFAULT_DUE_TIME ? formatDate(d) : formatDateTime(d))

export const daysFromNow = (d: Date) => Math.round((startOfDayCR(0, d).getTime() - startOfDayCR().getTime()) / 86_400_000)
