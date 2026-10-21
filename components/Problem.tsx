'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import Reveal, { stagger } from '@/components/Reveal'

export default function Problem() {
  const { lang } = useLanguage()
  const p = t.problem

  return (
    <section className="py-24 md:py-32 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-24">
          <Reveal>
            <h2 className="font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {p.h2[lang]}
            </h2>
          </Reveal>

          <ol className="flex flex-col">
            {p.points.map((point, i) => (
              <li key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(28,18,9,0.09)' }}>
                <Reveal delay={stagger(i)} className="flex gap-5 py-6">
                  <span className="shrink-0 pt-1 text-[13px] font-semibold tabular-nums" style={{ color: '#8b4513' }}>
                    0{i + 1}
                  </span>
                  <p className="text-[1.05rem] leading-[1.7] text-text-primary">{point[lang]}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20 max-w-[860px] md:mt-28">
          <p className="font-semibold leading-[1.25] tracking-tight text-text-primary" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.5rem)' }}>
            {p.closing[lang]}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
