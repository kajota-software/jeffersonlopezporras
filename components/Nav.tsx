'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { t } from '@/lib/translations'

const navTr: Transition = { duration: 0.5, ease: 'easeOut' }

const LINKS = [
  { href: '#projects', label: t.nav.projects },
  { href: '#precios',  label: t.nav.pricing  },
  { href: '#faq',      label: t.nav.faq      },
]

export default function Nav() {
  const { lang, toggle } = useLanguage()
  const { open } = useDiagnostic()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={navTr}
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(28,18,9,0.09)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        <a href="#home" className="whitespace-nowrap text-[1.05rem] font-semibold tracking-tight" style={{ color: '#1c1209' }}>
          Jefferson López
        </a>

        <nav className="flex items-center gap-3">
          <div className="mr-4 hidden items-center gap-6 md:flex">
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm transition-colors duration-200 hover:text-text-primary"
                style={{ color: '#7a6045' }}
              >
                {label[lang]}
              </a>
            ))}
          </div>

          <button
            onClick={toggle}
            className="cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 hover:text-text-primary"
            style={{ background: 'rgba(28,18,9,0.05)', color: '#7a6045' }}
          >
            {t.nav.langToggle[lang]}
          </button>

          <button
            onClick={open}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-accent text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-bright"
            style={{ padding: '6px 14px' }}
          >
            <span className="sm:hidden">{t.nav.ctaShort[lang]}</span>
            <span className="hidden sm:inline">{t.nav.cta[lang]}</span>
          </button>
        </nav>
      </div>
    </motion.header>
  )
}
