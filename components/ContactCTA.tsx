'use client'

import { motion } from 'framer-motion'
import type { Transition, TargetAndTransition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useModal } from '@/context/ModalContext'
import { t } from '@/lib/translations'

interface MotionAnim {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  viewport: { once: boolean; margin: string }
  transition: Transition
}

const scaleIn: MotionAnim = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function ContactCTA() {
  const { lang } = useLanguage()
  const { openModal } = useModal()
  const c = t.contactCta

  return (
    <section
      id="contact"
      className="py-28 section-border"
      style={{ background: 'rgba(139,69,19,0.04)' }}
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <motion.div {...scaleIn} className="text-center max-w-2xl mx-auto">
          <h2
            className="font-bold leading-[1.15]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1c1209' }}
          >
            {c.h2[lang]}
          </h2>

          <p className="mt-5 text-[1.05rem] leading-[1.75]" style={{ color: '#4a3520' }}>
            {c.sub[lang].split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>

          <button
            onClick={() => openModal()}
            className="mt-10 inline-block rounded-xl text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: '#8b4513', padding: '16px 40px', border: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#b5642a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#8b4513' }}
          >
            {c.btn[lang]}
          </button>

          <p className="mt-6 text-sm" style={{ color: '#7a6045' }}>
            {c.trust[lang]}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
