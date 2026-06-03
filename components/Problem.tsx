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

const slideLeft: MotionAnim = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerItem = (i: number): MotionAnim => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
})

export default function Problem() {
  const { lang } = useLanguage()
  const p = t.problem
  const blocks = [p.block1, p.block2, p.block3]

  return (
    <section className="py-28 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div {...slideLeft}>
            <h2
              className="font-bold leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1c1209' }}
            >
              {p.left[lang].split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
          </motion.div>

          <div className="flex flex-col">
            {blocks.map((block, i) => (
              <motion.div key={i} {...staggerItem(i)}>
                <div
                  className="py-7"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(28,18,9,0.09)' }}
                >
                  <p className="text-[15px] leading-[1.8] mb-1" style={{ color: '#1c1209' }}>
                    {block.first[lang]}
                  </p>
                  <p className="text-[15px] leading-[1.8]" style={{ color: '#7a6045' }}>
                    {block.rest[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
