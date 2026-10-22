// Teléfono normalizado: solo dígitos, con código de país (sirve para buscar y para wa.me)
export const normalizePhone = (raw: string) => raw.replace(/\D/g, '')

export function formatPhone(digits: string): string {
  if (!digits) return '—'
  // Costa Rica: +506 8888 7777
  if (digits.startsWith('506') && digits.length === 11) return `+506 ${digits.slice(3, 7)} ${digits.slice(7)}`
  return `+${digits}`
}
