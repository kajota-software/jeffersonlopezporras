import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { inter } from '@/lib/fonts'

// Con dos layouts raíz, (es) y (en), las rutas que no existen usan esta página
export const metadata: Metadata = {
  title: 'Página no encontrada | Jefferson López',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="es-CR" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <main className="mx-auto flex min-h-screen max-w-[640px] flex-col justify-center px-6">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Esta página no existe.</h1>
          <p className="mt-4 text-[1.05rem] leading-[1.7]" style={{ color: '#4a3520' }}>
            Puede volver al inicio o leer las guías del blog.
          </p>
          <p className="mt-8 flex gap-6 text-[15px] font-semibold" style={{ color: '#8b4513' }}>
            <Link href="/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">Ir al inicio</Link>
            <Link href="/blog" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">Ver el blog</Link>
          </p>
        </main>
      </body>
    </html>
  )
}
