'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import Reveal from '@/components/Reveal'

export default function About() {
  const { lang } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="py-24 md:py-32 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal className="max-w-[760px]">
          <p className="font-semibold leading-[1.35] tracking-tight text-text-primary" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)' }}>
            {a.p1[lang]}
          </p>
          <p className="mt-6 text-[1.1rem] leading-[1.8]" style={{ color: '#4a3520' }}>
            {a.p2[lang]}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
