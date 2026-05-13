'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

export default function Nav() {
  const { lang, toggle } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#c4b49a] bg-[#f5f0e8]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3.5">
        {/* Logo — Caveat */}
        <span
          className="text-[1.7rem] font-bold text-[#1c1209] leading-none"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          Jefferson López
        </span>

        <nav className="flex items-center gap-3">
          {/* Links internos — desktop */}
          <div className="hidden md:flex items-center gap-5 mr-3">
            {[
              { href: '#services', label: { es: 'Servicios', en: 'Services'  } },
              { href: '#projects', label: { es: 'Proyectos', en: 'Projects'  } },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-[#7a6045] transition-colors hover:text-[#1c1209]"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {label[lang]}
              </a>
            ))}
          </div>

          {/* Toggle idioma */}
          <button
            onClick={toggle}
            className="cursor-pointer rounded-full border border-[#c4b49a] bg-[#ede8db] px-3 py-1 text-xs font-medium text-[#7a6045] transition-colors duration-200 hover:border-[#9a8070] hover:text-[#1c1209]"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {t.nav.langToggle[lang]}
          </button>

          {/* CTA → Calendly */}
          <a
            href="#contact"
            className="rounded-lg bg-[#8b4513] px-4 py-1.5 text-sm font-medium text-[#f5f0e8] transition-all duration-200 hover:bg-[#b5642a]"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {t.nav.cta[lang]}
          </a>
        </nav>
      </div>
    </header>
  )
}
