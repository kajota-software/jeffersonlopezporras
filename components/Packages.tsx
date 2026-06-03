'use client'

import { motion } from 'framer-motion'
import type { Transition, TargetAndTransition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useModal } from '@/context/ModalContext'
import type { PlanKey } from '@/context/ModalContext'
import { t } from '@/lib/translations'

interface MotionAnim {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  viewport: { once: boolean; margin: string }
  transition: Transition
}

const cardAnim = (i: number): MotionAnim => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.12 },
})

const PLAN_KEYS: PlanKey[] = ['arranca', 'crece', 'sistema']

interface PackageCardProps {
  situation: string
  name: string
  price: string
  resolves: string
  includes: string[]
  cta: string
  planKey: PlanKey
  highlighted?: boolean
  index: number
}

function PackageCard({ situation, name, price, resolves, includes, cta, planKey, highlighted, index }: PackageCardProps) {
  const { openModal } = useModal()

  return (
    <motion.div
      {...cardAnim(index)}
      className="relative flex flex-col rounded-2xl p-8"
      style={{
        background: highlighted ? 'rgba(139,69,19,0.05)' : 'rgba(28,18,9,0.03)',
        border: highlighted
          ? '1px solid rgba(139,69,19,0.28)'
          : '1px solid rgba(28,18,9,0.1)',
      }}
    >
      {highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold px-4 py-1 rounded-full"
          style={{ background: '#8b4513', color: '#f5f0e8' }}
        >
          Popular
        </div>
      )}

      <p className="text-[13px] italic leading-snug mb-5" style={{ color: '#7a6045' }}>
        {situation}
      </p>

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-1" style={{ color: '#1c1209' }}>{name}</h3>
        <p className="text-3xl font-bold" style={{ color: highlighted ? '#8b4513' : '#1c1209' }}>
          {price}
        </p>
      </div>

      <p className="text-[14px] leading-[1.7] mb-6" style={{ color: '#4a3520' }}>{resolves}</p>

      <ul className="flex flex-col gap-2.5 mb-8 flex-1">
        {includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13px]" style={{ color: '#7a6045' }}>
            <span className="mt-0.5 shrink-0" style={{ color: '#8b4513' }}>—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => openModal(planKey)}
        className="mt-auto block w-full text-center rounded-lg py-3 text-sm font-semibold cursor-pointer transition-all duration-200"
        style={
          highlighted
            ? { background: '#8b4513', color: '#f5f0e8', border: 'none' }
            : {
                background: 'rgba(28,18,9,0.05)',
                color: '#4a3520',
                border: '1px solid rgba(28,18,9,0.12)',
              }
        }
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement
          if (highlighted) el.style.background = '#b5642a'
          else { el.style.background = 'rgba(28,18,9,0.1)'; el.style.color = '#1c1209' }
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement
          if (highlighted) el.style.background = '#8b4513'
          else { el.style.background = 'rgba(28,18,9,0.05)'; el.style.color = '#4a3520' }
        }}
      >
        {cta}
      </button>
    </motion.div>
  )
}

export default function Packages() {
  const { lang } = useLanguage()
  const pk = t.packages

  return (
    <section id="packages" className="py-28 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1c1209' }}>
            {pk.title[lang]}
          </h2>
          <p className="text-[15px] max-w-xl" style={{ color: '#7a6045' }}>
            {pk.subtitle[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[pk.p1, pk.p2, pk.p3].map((card, i) => (
            <PackageCard
              key={card.name[lang]}
              index={i}
              situation={card.situation[lang]}
              name={card.name[lang]}
              price={card.price[lang]}
              resolves={card.resolves[lang]}
              includes={card.includes[lang]}
              cta={card.cta[lang]}
              planKey={PLAN_KEYS[i]}
              highlighted={i === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
