'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

// Llamado al diagnóstico: fondo suave a todo el ancho, sin caja con borde
export default function CTA({ position = 'middle' }: { position?: 'middle' | 'end' }) {
  const pathname = usePathname()

  return (
    <aside className="my-14 mx-[calc(50%-50vw)] py-14 md:py-16" style={{ background: 'rgba(139,69,19,0.06)' }}>
      <div className="mx-auto max-w-[68ch] px-6">
        <p className="text-[1.35rem] font-semibold leading-[1.4] tracking-tight text-text-primary md:text-[1.6rem]">
          ¿Cuántas reservas se le están escapando?
        </p>
        <p className="mt-3 text-[1.075rem] leading-[1.7]" style={{ color: '#4a3520' }}>
          Haga el diagnóstico gratis: 2 minutos y sabe qué plan le corresponde.
        </p>
        <Link
          href="/?diagnostico=1"
          onClick={() => track('blog_cta_click', { position, article: pathname })}
          className="mt-7 inline-block w-full rounded-xl bg-accent px-7 py-3.5 text-center text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-accent-bright sm:w-auto"
        >
          Hacer mi diagnóstico gratis
        </Link>
      </div>
    </aside>
  )
}
