'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { t } from '@/lib/translations'
import Reveal, { stagger } from '@/components/Reveal'

const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.08em]'

export default function Packages() {
  const { lang } = useLanguage()
  const { open } = useDiagnostic()
  const pk = t.packages

  return (
    <section id="packages" className="py-24 md:py-32 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <h2 className="font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {pk.title[lang]}
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem]" style={{ color: '#7a6045' }}>{pk.subtitle[lang]}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-y-4 md:mt-20 md:grid-cols-3 md:gap-x-10">
          {pk.items.map((item, i) => {
            const highlighted = i === 1
            return (
              <Reveal
                key={item.name.es}
                delay={stagger(i)}
                className={`flex flex-col py-10 ${highlighted ? 'rounded-2xl px-6 md:-mx-6 md:px-6' : ''}`}
                style={highlighted ? { background: 'rgba(139,69,19,0.06)' } : undefined}
              >
                <p className={`${LABEL} mb-3 ${highlighted ? '' : 'hidden md:invisible md:block'}`} style={{ color: '#8b4513' }}>
                  {pk.recommended[lang]}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-text-primary">{item.name[lang]}</h3>
                <p className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight tabular-nums" style={{ color: highlighted ? '#8b4513' : '#1c1209' }}>
                  {item.price[lang]}
                </p>
                {'priceNote' in item && item.priceNote && (
                  <p className="mt-1.5 text-[13px] leading-[1.5]" style={{ color: '#7a6045' }}>{item.priceNote[lang]}</p>
                )}
                <p className="mt-5 text-[15px] leading-[1.7]" style={{ color: '#4a3520' }}>{item.forWho[lang]}</p>
                <ul className="mt-5 mb-8 flex flex-1 flex-col gap-2">
                  {item.includes[lang].map(inc => (
                    <li key={inc} className="flex gap-3 text-[15px] text-text-primary">
                      <span aria-hidden style={{ color: '#8b4513' }}>—</span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={open}
                  className={`w-full cursor-pointer rounded-xl py-3.5 text-[15px] font-semibold transition-colors duration-200 ${
                    highlighted
                      ? 'bg-accent text-white hover:bg-accent-bright'
                      : 'bg-[rgba(28,18,9,0.06)] text-text-primary hover:bg-[rgba(28,18,9,0.1)]'
                  }`}
                >
                  {pk.cta[lang]}
                </button>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-14 pt-8" style={{ borderTop: '1px solid rgba(28,18,9,0.09)' }}>
          <p className="text-[1.05rem] leading-[1.7] text-text-primary">
            {pk.custom[lang]}{' '}
            <button type="button" onClick={open} className="cursor-pointer font-semibold underline-offset-4 hover:underline" style={{ color: '#8b4513' }}>
              {t.cta.start[lang]} →
            </button>
          </p>
          <p className="mt-3 text-[13px] leading-[1.6]" style={{ color: '#7a6045' }}>{pk.note[lang]}</p>
        </Reveal>
      </div>
    </section>
  )
}
