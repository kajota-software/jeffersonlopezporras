'use client'

import { motion } from 'framer-motion'
import type { Transition, TargetAndTransition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

interface MotionAnim {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  viewport: { once: boolean; margin: string }
  transition: Transition
}

const fadeIn: MotionAnim = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function About() {
  const { lang } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="py-24 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <motion.div {...fadeIn} className="max-w-2xl">
          <p className="text-[1.15rem] leading-[1.8]" style={{ color: '#4a3520' }}>
            {a.p1[lang]}
          </p>
          <p className="mt-5 text-[1.15rem] leading-[1.8]" style={{ color: '#7a6045' }}>
            {a.p2[lang]}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
