'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useModal } from '@/context/ModalContext'
import { t } from '@/lib/translations'

const navTr: Transition = { duration: 0.5, ease: 'easeOut' }

export default function Nav() {
  const { lang, toggle } = useLanguage()
  const { openModal } = useModal()
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
        <a href="#home" className="text-[1.05rem] font-semibold tracking-tight" style={{ color: '#1c1209' }}>
          Jefferson López
        </a>

        <nav className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-6 mr-4">
            {[
              { href: '#projects', label: t.nav.projects },
              { href: '#packages', label: t.nav.packages },
              { href: '#contact',  label: t.nav.contact  },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm transition-colors duration-200"
                style={{ color: '#7a6045' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1c1209' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#7a6045' }}
              >
                {label[lang]}
              </a>
            ))}
          </div>

          <button
            onClick={toggle}
            className="cursor-pointer rounded-full text-xs font-medium transition-all duration-200"
            style={{
              border: '1px solid rgba(28,18,9,0.14)',
              background: 'rgba(28,18,9,0.04)',
              color: '#7a6045',
              padding: '4px 12px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#1c1209' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#7a6045' }}
          >
            {t.nav.langToggle[lang]}
          </button>

          <button
            onClick={() => openModal()}
            className="rounded-lg text-sm font-semibold text-white cursor-pointer transition-all duration-200"
            style={{ background: '#8b4513', padding: '6px 16px', border: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#b5642a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#8b4513' }}
          >
            {t.nav.cta[lang]}
          </button>
        </nav>
      </div>
    </motion.header>
  )
}
