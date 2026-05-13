import type { Metadata } from 'next'
import { Caveat, Lora, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

/* ── next/font: auto-host, zero render-block ────── */
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

/* ── URL base — cambia cuando tengas dominio ──────
   O define NEXT_PUBLIC_BASE_URL en tu .env.local   */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://jeffersonlopez.dev'

/* ── Metadata orientada al emprendedor ───────────── */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Jefferson López — Webs que consiguen clientes para tu negocio | Costa Rica',
    template: '%s | Jefferson López',
  },
  description:
    'Diseño webs, sistemas de reservas y agentes IA para emprendedores en LATAM y EEUU. Si tienes un buen negocio pero tu presencia online no lo refleja, te ayudo a cambiarlo. Primera llamada gratis.',
  keywords: [
    'página web para emprendedores',
    'landing page para negocio',
    'web para captar clientes',
    'sistema de reservas online',
    'agente IA para negocio',
    'chatbot para atender clientes 24/7',
    'diseño web freelancer Costa Rica',
    'automatización para pequeñas empresas',
    'web para gimnasio',
    'web para clínica dental',
    'Jefferson López desarrollador web',
    'freelancer web Costa Rica',
    'web developer for entrepreneurs',
    'AI chatbot integration freelancer',
  ],
  authors: [{ name: 'Jefferson López Porras', url: BASE_URL }],
  creator: 'Jefferson López Porras',
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'Jefferson López — Webs para emprendedores',
    title: 'Jefferson López — Tu negocio merece una web que consiga clientes',
    description:
      'Diseño webs, reservas online y agentes IA para emprendedores. Basado en Costa Rica, trabajo con clientes en toda LATAM y EEUU. Primera llamada gratis.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jefferson López — Webs que consiguen clientes para tu negocio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jefferson López — Tu negocio merece una web que consiga clientes',
    description:
      'Webs de conversión, reservas online y agentes IA para emprendedores. Costa Rica → LATAM y EEUU.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
}

/* ── JSON-LD: FreelanceService orientado al emprendedor ── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jefferson López Porras',
  jobTitle: 'Desarrollador web freelance para emprendedores',
  description:
    'Diseño webs de conversión, sistemas de reservas y agentes IA para emprendedores en LATAM y EEUU. Primera llamada siempre gratis.',
  url: BASE_URL,
  email: 'jefferson.lopez.porras21@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/jeff-lp',
    'https://fitmanage.app',
    'https://calendly.com/jeffersonlopez690/30min',
  ],
  knowsAbout: [
    'Diseño web para emprendedores',
    'Landing pages de conversión',
    'Sistemas de reservas online',
    'Agentes IA y chatbots para negocios',
    'Automatización de procesos',
    'Next.js',
    'React',
    'Python',
    'FastAPI',
    'PostgreSQL',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CR',
    addressRegion: 'Cartago',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '1200',
    highPrice: '5000',
    offerCount: '3',
    offers: [
      {
        '@type': 'Offer',
        name: 'Landing page de conversión',
        description: 'Una página diseñada para capturar clientes y medir resultados. Incluye formulario, analytics y SEO básico.',
        price: '1200',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Web completa + sistema de reservas online',
        description: 'Web profesional de 5-7 páginas con calendario de reservas integrado, email automático al cliente y panel de gestión.',
        price: '2800',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Web + agente IA que atiende clientes',
        description: 'Web de conversión más agente IA entrenado con la información de tu negocio. Responde preguntas y captura leads 24/7.',
        price: '3500',
        priceCurrency: 'USD',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${caveat.variable} ${lora.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
