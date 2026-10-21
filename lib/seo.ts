import type { Metadata } from 'next'
import type { Lang } from '@/context/LanguageContext'
import { SITE_URL, CONTACT_EMAIL, HOME_PATH } from '@/lib/config'
import { t } from '@/lib/translations'

const OG_ALT = { es: 'Reservas directas, sin comisión, en su WhatsApp', en: 'Direct bookings, commission-free, right on your WhatsApp' }
const OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630 }

// Valores comunes a todas las páginas (los usa cada layout raíz)
export function siteMetadata(lang: Lang): Metadata {
  const verification = process.env.GOOGLE_SITE_VERIFICATION
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: 'Jefferson López', template: '%s | Jefferson López' },
    authors: [{ name: 'Jefferson López Porras', url: SITE_URL }],
    creator: 'Jefferson López Porras',
    openGraph: {
      siteName: 'Jefferson López',
      locale: lang === 'es' ? 'es_CR' : 'en_US',
      images: [{ ...OG_IMAGE, alt: OG_ALT[lang] }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    // Search Console: solo se imprime si la variable existe
    ...(verification ? { verification: { google: verification } } : {}),
  }
}

const HOME = {
  title: {
    es: 'Reservas directas para hospedajes y tours en Costa Rica | Jefferson López',
    en: 'Direct bookings for lodges and tours in Costa Rica | Jefferson López',
  },
  description: {
    es: 'En 14 días instalo un sistema para que los turistas lo encuentren en Google, entiendan su oferta en su idioma y le reserven a usted, sin comisión.',
    en: 'In 14 days I set up a system so travelers find you on Google, understand your offer in their own language and book with you, commission-free.',
  },
  ogDescription: {
    es: 'Sistema de reservas directas para hospedajes, tours y rent a car en Costa Rica. Haga el diagnóstico gratis en 2 minutos.',
    en: 'Direct booking system for lodges, tours and car rentals in Costa Rica. Take the free 2-minute assessment.',
  },
}

// URLs absolutas del inicio en cada idioma
const homeUrl = (lang: Lang) => (lang === 'es' ? SITE_URL : `${SITE_URL}${HOME_PATH.en}`)

export function homeMetadata(lang: Lang): Metadata {
  const image = { ...OG_IMAGE, alt: OG_ALT[lang] }
  return {
    title: { absolute: HOME.title[lang] },
    description: HOME.description[lang],
    alternates: {
      canonical: homeUrl(lang),
      languages: { es: homeUrl('es'), en: homeUrl('en'), 'x-default': homeUrl('es') },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'es' ? 'es_CR' : 'en_US',
      alternateLocale: lang === 'es' ? 'en_US' : 'es_CR',
      url: homeUrl(lang),
      siteName: 'Jefferson López',
      title: OG_ALT[lang],
      description: HOME.ogDescription[lang],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: OG_ALT[lang],
      description: HOME.ogDescription[lang],
      images: [image],
    },
  }
}

// ── JSON-LD del inicio: un solo @graph ───────────────────────────────

const PERSON_ID = `${SITE_URL}/#person`

const OFFERS = [
  { name: 'Esencial', price: '590', description: '$590 + $39/mes. Sitio de una página pensado para el celular, con fotos, servicios, precios y botón de WhatsApp con mensaje prellenado.' },
  { name: 'Reserva Directa', price: '990', description: '$990 + $59/mes. Todo lo de Esencial + sitio bilingüe con una página por habitación o tour, formulario que califica al cliente y píxel de Meta.' },
  { name: 'Reserva Directa + Gestión', price: '2500', description: 'Desde $2,500' },
]

export function homeJsonLd(lang: Lang) {
  const url = homeUrl(lang)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Jefferson López Porras',
        jobTitle: 'Desarrollador de sistemas de reservas directas',
        description:
          'Construyo sistemas de reservas directas para hospedajes, tours y rent a car en Costa Rica. Cofundador de FitManage.',
        url: SITE_URL,
        image: `${SITE_URL}/brand/icono-jl-512.png`,
        email: CONTACT_EMAIL,
        sameAs: ['https://www.linkedin.com/in/jeff-lp', 'https://fitmanage.app'],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Jefferson López — Sistema Reserva Directa',
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo-jefferson-lopez.png`,
        image: `${SITE_URL}/og-image.png`,
        areaServed: { '@type': 'Country', name: 'Costa Rica' },
        founder: { '@id': PERSON_ID },
        priceRange: '$590–$5,000',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Paquetes',
          itemListElement: OFFERS.map(o => ({
            '@type': 'Offer',
            price: o.price,
            priceCurrency: 'USD',
            description: o.description,
            itemOffered: { '@type': 'Service', name: o.name },
          })),
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'FitManage',
        url: 'https://fitmanage.app',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        description:
          'Software para entrenadores personales: rutinas, nutrición, pagos y CRM. Más de 10,000 usuarios activos en LATAM.',
        author: { '@id': PERSON_ID },
      },
      {
        '@type': 'FAQPage',
        url,
        inLanguage: lang === 'es' ? 'es-CR' : 'en',
        mainEntity: t.faq.questions.map(({ q, a }) => ({
          '@type': 'Question',
          name: q[lang],
          acceptedAnswer: { '@type': 'Answer', text: a[lang] },
        })),
      },
    ],
  }
}

// JSON seguro para <script type="application/ld+json">
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
