import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { DiagnosticProvider } from '@/context/DiagnosticContext'
import Diagnostic from '@/components/diagnostic/Diagnostic'
import { MotionProvider } from '@/components/Reveal'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://jeffersonlopezporras.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Sistema Reserva Directa | Reservas directas para hospedajes, tours y rent a car en Costa Rica',
    template: '%s | Jefferson López',
  },
  description:
    'En 14 días instalo un sistema para que los turistas lo encuentren en Google, entiendan su oferta en su idioma y le reserven a usted, sin comisión.',
  keywords: [
    'reservas directas Costa Rica',
    'sistema de reservas WhatsApp',
    'web para hospedajes Costa Rica',
    'web para tours Costa Rica',
    'web para rent a car Costa Rica',
    'reservas sin comisión',
    'Jefferson López desarrollador',
    'FitManage co-fundador',
    'presencia digital LATAM',
    'Jefferson López Porras',
  ],
  authors: [{ name: 'Jefferson López Porras', url: BASE_URL }],
  creator: 'Jefferson López Porras',
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'Jefferson López',
    title: 'Reservas directas, sin comisión, en su WhatsApp',
    description:
      'Sistema de reservas directas para hospedajes, tours y rent a car en Costa Rica. Haga el diagnóstico gratis en 2 minutos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jefferson López — Desarrollador y fundador · Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reservas directas, sin comisión, en su WhatsApp',
    description:
      'Sistema de reservas directas para hospedajes, tours y rent a car en Costa Rica.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Jefferson López Porras',
      jobTitle: 'Desarrollador web y co-fundador de FitManage.app',
      description:
        'Construyo webs y sistemas digitales para negocios de servicio en Costa Rica y LATAM. Co-fundador de FitManage.app — software para entrenadores personales con +10,000 usuarios.',
      url: BASE_URL,
      email: 'jefferson.lopez.porras21@gmail.com',
      sameAs: [
        'https://www.linkedin.com/in/jeff-lp',
        'https://fitmanage.app',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CR',
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
      author: {
        '@type': 'Person',
        name: 'Jefferson López Porras',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <DiagnosticProvider>
            <MotionProvider>
              {children}
              <Diagnostic />
            </MotionProvider>
          </DiagnosticProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
