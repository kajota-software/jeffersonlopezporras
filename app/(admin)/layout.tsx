import type { Metadata } from 'next'
import '../globals.css'
import { inter } from '@/lib/fonts'

// Layout raíz del área privada (/login y /admin): fuera de buscadores
export const metadata: Metadata = {
  title: { default: 'Administración', template: '%s | Jefferson López' },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR" className={inter.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
