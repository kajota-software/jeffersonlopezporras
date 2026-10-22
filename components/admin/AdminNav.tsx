'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/admin/LogoutButton'

const ITEMS = [
  { href: '/admin', label: 'Inicio' },
  { href: '/admin/clientes', label: 'Clientes' },
  { href: '/admin/proyectos', label: 'Proyectos' },
  { href: '/admin/formularios', label: 'Formularios' },
  { href: '/admin/seguimientos', label: 'Seguimientos' },
]

// Lista lateral en escritorio; en móvil, un botón "Menú" que despliega la misma lista
export default function AdminNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => (href === '/admin' ? pathname === href : pathname.startsWith(href))

  return (
    <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:py-8">
      <div className="flex items-center justify-between py-3 md:block md:py-0">
        <Link href="/admin" className="flex min-h-11 items-center" aria-label="Inicio del panel">
          <Image src="/brand/logo-jefferson-lopez.svg" alt="Jefferson López" width={737} height={163} className="h-5 w-auto" priority />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="admin-menu"
          className="min-h-11 cursor-pointer px-2 text-[15px] font-semibold text-text-primary md:hidden"
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      <nav id="admin-menu" aria-label="Panel" className={`${open ? 'block' : 'hidden'} pb-4 md:mt-10 md:block md:flex-1 md:pb-0`}>
        <ul className="flex flex-col">
          {ITEMS.map(item => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-11 items-center text-[15px] transition-colors hover:text-text-primary ${active ? 'font-semibold text-accent' : 'text-text-secondary'}`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="mt-6 md:mt-auto">
          <LogoutButton />
        </div>
      </nav>
    </div>
  )
}
