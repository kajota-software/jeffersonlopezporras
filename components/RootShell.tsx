import type { ReactNode } from 'react'
import { inter } from '@/lib/fonts'
import { LanguageProvider } from '@/context/LanguageContext'
import type { Lang } from '@/context/LanguageContext'
import { DiagnosticProvider } from '@/context/DiagnosticContext'
import DiagnosticModal from '@/components/diagnostic/DiagnosticModal'
import Analytics from '@/components/Analytics'

// <html> y <body> compartidos por los dos layouts raíz: (es) y (en)
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang === 'es' ? 'es-CR' : 'en'} className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Es el <head> del layout raíz (App Router); la regla de lint aplica a pages/ */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Las animaciones de aparición solo ocultan contenido si hay JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <LanguageProvider lang={lang}>
          <DiagnosticProvider>
            {children}
            <DiagnosticModal />
          </DiagnosticProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
