export const PHONE = '50685112743'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}

export const WA_DEFAULT_ES =
  'Hola Jefferson, quiero agendar una llamada para hablar sobre mi negocio.'
export const WA_DEFAULT_EN =
  'Hi Jefferson, I would like to schedule a call to talk about my business.'
