'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import Reveal, { stagger } from '@/components/Reveal'

const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.08em]'

export default function Solution() {
  const { lang } = useLanguage()
  const s = t.solution

  return (
    <section className="py-24 md:py-32 section-border" style={{ background: 'rgba(28,18,9,0.025)' }}>
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <h2 className="max-w-[760px] font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {s.h2[lang]}
          </h2>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {/* Encabezados de columna (solo escritorio) */}
          <div className="hidden grid-cols-2 gap-16 pb-4 md:grid">
            <span className={LABEL} style={{ color: '#7a6045' }}>{s.colA[lang]}</span>
            <span className={LABEL} style={{ color: '#8b4513' }}>{s.colB[lang]}</span>
          </div>

          <ul>
            {s.rows.map((row, i) => (
              <li key={i} style={{ borderTop: '1px solid rgba(28,18,9,0.1)' }}>
                <Reveal delay={stagger(i)} className="grid grid-cols-1 gap-1.5 py-5 md:grid-cols-2 md:gap-16 md:py-6">
                  <p className="text-[15px] leading-[1.6] md:text-[1.05rem]" style={{ color: '#7a6045' }}>
                    <span className="sr-only">{s.colA[lang]}: </span>{row.a[lang]}
                  </p>
                  <p className="text-[1.05rem] font-semibold leading-[1.55] text-text-primary md:text-lg">
                    <span aria-hidden className="mr-2 md:hidden" style={{ color: '#8b4513' }}>→</span>
                    <span className="sr-only">{s.colB[lang]}: </span>{row.b[lang]}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div style={{ borderTop: '1px solid rgba(28,18,9,0.1)' }} />
        </div>
      </div>
    </section>
  )
}
