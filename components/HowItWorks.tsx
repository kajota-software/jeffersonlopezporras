'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import Reveal, { stagger } from '@/components/Reveal'

export default function HowItWorks() {
  const { lang } = useLanguage()
  const h = t.howItWorks

  return (
    <section id="how" className="py-24 md:py-32 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <h2 className="mb-14 font-bold leading-[1.1] tracking-tight text-text-primary md:mb-20" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {h.title[lang]}
          </h2>
        </Reveal>

        <ol className="grid grid-cols-1 md:grid-cols-3">
          {h.steps.map((step, i) => (
            <li
              key={step.num}
              className={`${i > 0 ? 'border-t md:border-t-0 md:border-l' : ''} border-[rgba(28,18,9,0.09)] py-8 md:px-10 md:py-0 ${i === 0 ? 'md:pl-0' : ''}`}
            >
              <Reveal delay={stagger(i)} className="flex flex-col gap-4">
                <span className="block select-none font-bold leading-none" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: 'rgba(28,18,9,0.08)' }}>
                  {step.num}
                </span>
                <h3 className="text-[1.2rem] font-semibold leading-snug text-text-primary">{step.title[lang]}</h3>
                <p className="text-[15px] leading-[1.75]" style={{ color: '#7a6045' }}>{step.desc[lang]}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
