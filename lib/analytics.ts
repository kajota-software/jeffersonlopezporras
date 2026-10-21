type TrackFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: TrackFn
    fbq?: TrackFn
  }
}

// Aún no hay analytics instalado; cuando se agregue GA4 (gtag) o Meta Pixel (fbq),
// los eventos se envían sin tocar los componentes.
export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return
  const payload = { ...params, page: window.location.pathname }
  window.gtag?.('event', event, payload)
  window.fbq?.('trackCustom', event, payload)
  if (process.env.NODE_ENV === 'development') console.debug('[analytics]', event, payload)
}

// Conversión principal: envío del diagnóstico a WhatsApp
export function trackWhatsAppClick(location: string, params: Record<string, string | number> = {}) {
  track('whatsapp_click', { location, ...params })
  window.fbq?.('track', 'Contact', { location })
}
