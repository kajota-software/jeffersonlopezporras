// Datos de contacto y del sitio en un solo lugar
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://jeffersonlopezporras.com'

// Cambiar por un correo del dominio cuando exista
export const CONTACT_EMAIL = 'jefferson.lopez.porras21@gmail.com'

// WhatsApp en formato internacional, sin "+" ni espacios
export const WHATSAPP_PHONE = '50685112743'

// Fecha del último cambio de contenido del inicio (sitemap). Actualizar a mano al editar textos.
export const HOME_UPDATED = '2026-10-21'

// Ruta del inicio en cada idioma (el blog queda solo en español)
export const HOME_PATH = { es: '/', en: '/en' } as const
