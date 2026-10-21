'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import Reveal, { stagger } from '@/components/Reveal'
import StartButton from '@/components/StartButton'
import PhoneMockup from '@/components/PhoneMockup'

export default function Hero() {
  const { lang } = useLanguage()
  const h = t.hero

  return (
    <section id="home" className="relative dot-grid md:flex md:min-h-screen md:items-center" style={{ paddingTop: '64px' }}>
      <div className="relative z-10 mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-14 px-6 pt-10 pb-20 md:grid-cols-[1.25fr_0.75fr] md:gap-16 md:py-24">
        <div>
          <Reveal delay={stagger(0)}>
            <p className="mb-6 text-[13px] font-medium uppercase" style={{ color: '#7a6045', letterSpacing: '0.08em' }}>
              {h.eyebrow[lang]}
            </p>
          </Reveal>

          <Reveal delay={stagger(1)}>
            <h1
              className="font-bold leading-[1.04] tracking-tight text-text-primary"
              style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.6rem)' }}
            >
              {h.h1[lang]}
            </h1>
          </Reveal>

          <Reveal delay={stagger(2)}>
            <p className="mt-7 max-w-[540px] text-[1.075rem] leading-[1.75]" style={{ color: '#4a3520' }}>
              {h.sub[lang]}
            </p>
          </Reveal>

          <Reveal delay={stagger(3)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <StartButton />
            <a
              href="#projects"
              className="py-3.5 text-center text-[15px] font-semibold underline-offset-4 transition-colors duration-200 hover:underline sm:text-left"
              style={{ color: '#4a3520' }}
            >
              {h.secondary[lang]} →
            </a>
          </Reveal>
        </div>

        <Reveal delay={stagger(3)}>
          <PhoneMockup />
        </Reveal>
      </div>
    </section>
  )
}
