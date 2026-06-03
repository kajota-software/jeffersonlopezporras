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

const stepAnim = (i: number): MotionAnim => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.15 },
})

export default function HowItWorks() {
  const { lang } = useLanguage()
  const steps = t.howItWorks.steps

  return (
    <section id="how" className="py-28 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              {...stepAnim(i)}
              className="relative flex flex-col gap-4 md:px-10"
              style={{
                borderLeft: i > 0 ? '1px solid rgba(28,18,9,0.09)' : 'none',
              }}
            >
              <span
                className="block font-bold select-none"
                style={{
                  fontSize: 'clamp(5rem, 8vw, 7rem)',
                  color: 'rgba(28,18,9,0.07)',
                  lineHeight: 1,
                  marginBottom: '-0.5rem',
                }}
              >
                {step.num}
              </span>

              <h3 className="text-[1.1rem] font-semibold leading-snug" style={{ color: '#1c1209' }}>
                {step.title[lang]}
              </h3>
              <p className="text-[14px] leading-[1.75]" style={{ color: '#7a6045' }}>
                {step.desc[lang]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
