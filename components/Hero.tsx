'use client'

import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useModal } from '@/context/ModalContext'
import { t } from '@/lib/translations'

const tr = (delay: number): Transition => ({ duration: 0.6, ease: 'easeOut', delay })

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: tr(delay),
})

export default function Hero() {
  const { lang } = useLanguage()
  const { openModal } = useModal()
  const h = t.hero

  return (
    <section id="home" className="relative dot-grid md:min-h-screen md:flex md:items-center" style={{ paddingTop: '64px' }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 10% 10%, rgba(139,69,19,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1100px] px-6 pt-10 pb-16 md:py-28 relative z-10">
        <motion.p
          {...fadeUp(0)}
          className="mb-6 text-sm font-medium uppercase"
          style={{ color: '#7a6045', letterSpacing: '0.07em' }}
        >
          {h.eyebrow[lang]}
        </motion.p>

        <h1 className="max-w-3xl leading-[1.05]" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 700 }}>
          <motion.span {...fadeUp(0.15)} className="block" style={{ color: '#1c1209' }}>
            {h.h1a[lang]}
          </motion.span>
          <motion.span {...fadeUp(0.3)} className="block gradient-text mt-1">
            {h.h1b[lang]}
          </motion.span>
        </h1>

        <motion.p
          {...fadeUp(0.5)}
          className="mt-7 max-w-[560px] text-[1.05rem] leading-[1.75]"
          style={{ color: '#4a3520' }}
        >
          {h.sub[lang]}
        </motion.p>

        <motion.div {...fadeUp(0.65)} className="mt-9 flex flex-wrap gap-3">
          <button
            onClick={() => openModal()}
            className="rounded-lg text-sm font-semibold text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: '#8b4513', padding: '12px 28px', border: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#b5642a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#8b4513' }}
          >
            {h.cta1[lang]}
          </button>
          <a
            href="#projects"
            className="rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(28,18,9,0.16)',
              background: 'rgba(28,18,9,0.04)',
              color: '#4a3520',
              padding: '12px 28px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1c1209' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#4a3520' }}
          >
            {h.cta2[lang]}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
