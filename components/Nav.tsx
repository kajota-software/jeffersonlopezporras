'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { HOME_PATH } from '@/lib/config'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { t } from '@/lib/translations'

const CTA_CLASS = 'inline-flex min-h-11 cursor-pointer items-center whitespace-nowrap rounded-lg bg-accent px-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-bright'
const LINK_CLASS = 'text-sm transition-colors duration-200 hover:text-text-primary'

const LINKS = [
  { href: '#projects', label: t.nav.projects },
  { href: '#precios',  label: t.nav.pricing  },
  { href: '#faq',      label: t.nav.faq      },
]

// En el blog (solo español) los enlaces apuntan al inicio y no hay cambio de idioma
export default function Nav({ onBlog = false }: { onBlog?: boolean }) {
  const { lang } = useLanguage()
  const { open } = useDiagnostic()
  const [scrolled, setScrolled] = useState(false)
  const otherLang = lang === 'es' ? 'en' : 'es'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(28,18,9,0.09)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-2.5">
        <Link href={onBlog ? '/' : '#home'} aria-label={lang === 'es' ? 'Jefferson López — inicio' : 'Jefferson López — home'} className="flex min-h-11 shrink-0 items-center">
          <Image src="/brand/logo-jefferson-lopez.svg" alt="Jefferson López" width={737} height={163} priority className="h-[22px] w-auto sm:h-6" />
        </Link>

        <nav className="flex items-center gap-2" aria-label={lang === 'es' ? 'Principal' : 'Main'}>
          <div className="mr-4 hidden items-center gap-6 md:flex" style={{ color: '#7a6045' }}>
            {LINKS.map(({ href, label }) => (
              <Link key={href} href={onBlog ? `/${href}` : href} className={LINK_CLASS}>
                {label[lang]}
              </Link>
            ))}
            <Link href="/blog" hrefLang="es" className={LINK_CLASS} style={onBlog ? { color: '#1c1209' } : undefined}>
              {t.nav.blog[lang]}
            </Link>
          </div>

          {/* Cambia de versión: / y /en tienen layouts raíz distintos, así que es una navegación completa */}
          {!onBlog && (
            <a
              href={HOME_PATH[otherLang]}
              hrefLang={otherLang}
              lang={otherLang}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-xs font-medium transition-colors duration-200 hover:text-text-primary"
              style={{ color: '#7a6045' }}
            >
              <span className="rounded-full px-3 py-1" style={{ background: 'rgba(28,18,9,0.05)' }}>
                {t.nav.langToggle[lang]}
                <span className="sr-only">{lang === 'es' ? ' (English version)' : ' (versión en español)'}</span>
              </span>
            </a>
          )}

          {onBlog ? (
            <Link href="/?diagnostico=1" className={CTA_CLASS}>
              <span className="sm:hidden">{t.nav.ctaShort[lang]}</span>
              <span className="hidden sm:inline">{t.nav.cta[lang]}</span>
            </Link>
          ) : (
            <button type="button" onClick={open} className={CTA_CLASS}>
              <span className="sm:hidden">{t.nav.ctaShort[lang]}</span>
              <span className="hidden sm:inline">{t.nav.cta[lang]}</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
