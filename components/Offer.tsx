'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import Reveal, { stagger } from '@/components/Reveal'

const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.08em]'
const DIVIDER = '1px solid rgba(28,18,9,0.1)'

export default function Offer() {
  const { lang } = useLanguage()
  const o = t.offer

  return (
    <section id="precios" className="py-24 md:py-32 section-border" style={{ background: 'rgba(28,18,9,0.025)' }}>
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal>
          <h2 className="font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {o.h2[lang]}
          </h2>
        </Reveal>

        <ul className="mt-12 md:mt-16">
          {o.items.map((item, i) => (
            <li key={i} style={{ borderTop: DIVIDER }}>
              <Reveal delay={stagger(i)} className="flex items-baseline justify-between gap-6 py-5">
                <span className="text-[15px] leading-[1.6] text-text-primary md:text-[1.05rem]">{item.label[lang]}</span>
                <span className="shrink-0 text-[15px] font-medium tabular-nums md:text-[1.05rem]" style={{ color: '#7a6045' }}>
                  {item.value}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="flex items-baseline justify-between gap-6 py-5" style={{ borderTop: '1px solid rgba(28,18,9,0.22)' }}>
            <span className="text-[15px]" style={{ color: '#7a6045' }}>{o.totalLabel[lang]}</span>
            <s className="text-lg tabular-nums" style={{ color: '#7a6045' }}>{o.total}</s>
          </div>
          <div className="flex flex-col gap-1 pt-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="text-lg font-semibold text-text-primary">{o.investLabel[lang]}</span>
            <span className="font-bold tracking-tight tabular-nums" style={{ color: '#8b4513', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              {o.invest[lang]}
            </span>
          </div>
        </Reveal>

        <Reveal className="mt-16 flex flex-col gap-10 md:mt-20">
          {o.guarantees.map(g => (
            <div key={g.label.es}>
              <p className={LABEL} style={{ color: '#8b4513' }}>{g.label[lang]}</p>
              <p className="mt-3 font-medium leading-[1.5] tracking-tight text-text-primary" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)' }}>
                {g.text[lang]}
              </p>
            </div>
          ))}
          <p className="text-[1.05rem] leading-[1.7]" style={{ color: '#4a3520' }}>{o.ownership[lang]}</p>
        </Reveal>
      </div>
    </section>
  )
}
