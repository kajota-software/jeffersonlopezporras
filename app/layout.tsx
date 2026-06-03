import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { ModalProvider } from '@/context/ModalContext'
import ContactModal from '@/components/ContactModal'

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
    default: 'Jefferson López — Presencia digital para negocios de servicio en LATAM',
    template: '%s | Jefferson López',
  },
  description:
    'Construyo webs y sistemas digitales para negocios de servicio en Costa Rica y LATAM. Co-fundador de FitManage.app, software para entrenadores personales con +10,000 usuarios. Entrega en 10 días.',
  keywords: [
    'diseño web Costa Rica',
    'desarrollador web LATAM',
    'landing page negocio Costa Rica',
    'sistema reservas WhatsApp',
    'web para negocios Costa Rica',
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
    title: 'Jefferson López — Presencia digital para negocios de servicio en LATAM',
    description:
      'Construyo webs y sistemas que informan, califican y convierten — antes del primer mensaje. Co-fundador de FitManage.app.',
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
    title: 'Jefferson López — Presencia digital para negocios de servicio',
    description:
      'Webs y sistemas que convierten para negocios de servicio en LATAM. Co-fundador de FitManage.app.',
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
          <ModalProvider>
            {children}
            <ContactModal />
          </ModalProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
