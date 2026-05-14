import type { Metadata } from 'next'
import { Caveat, Lora, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://jeffersonlopezporras.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Jefferson López — Founder & Developer · FitManage.app · Costa Rica',
    template: '%s | Jefferson López',
  },
  description:
    'Co-fundador de FitManage, software para entrenadores personales con +10,000 usuarios en LATAM. Desarrollador full-stack (Python, Flutter, Node.js). Escribo sobre producto, tecnología y lo que significa construir desde cero.',
  keywords: [
    'Jefferson López developer',
    'full-stack developer Costa Rica',
    'SaaS founder LATAM',
    'FitManage co-founder',
    'developer Costa Rica',
    'full-stack developer LATAM',
    'technical founder',
    'Python developer Costa Rica',
    'Flutter developer',
    'software para entrenadores personales',
    'Jefferson López Porras',
  ],
  authors: [{ name: 'Jefferson López Porras', url: BASE_URL }],
  creator: 'Jefferson López Porras',
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'Jefferson López — Founder & Developer',
    title: 'Jefferson López — Founder & Developer',
    description:
      'Co-fundador de FitManage.app. Construyo productos digitales desde Costa Rica para LATAM.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jefferson López — Founder & Developer · FitManage.app',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jefferson López — Founder & Developer',
    description:
      'Co-fundador de FitManage.app · Desarrollador full-stack · Costa Rica → LATAM.',
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
      jobTitle: 'Co-Founder & Lead Developer',
      description:
        'Co-fundador de FitManage.app — software para entrenadores personales con +10,000 usuarios en LATAM. Desarrollador full-stack especializado en Python, Flutter y Next.js.',
      url: BASE_URL,
      email: 'jefferson.lopez.porras21@gmail.com',
      sameAs: [
        'https://www.linkedin.com/in/jeff-lp',
        'https://fitmanage.app',
      ],
      knowsAbout: [
        'Full-stack development',
        'SaaS product development',
        'Python',
        'FastAPI',
        'Flutter',
        'Node.js',
        'Next.js',
        'PostgreSQL',
        'MongoDB',
        'Docker',
        'Product management',
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
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
      },
    },
  ],
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
