'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import Reveal from '@/components/Reveal'
import StartButton from '@/components/StartButton'

export default function ContactCTA() {
  const { lang } = useLanguage()

  return (
    <section id="contact" className="py-28 md:py-36 section-border">
      <Reveal className="mx-auto max-w-[820px] px-6 text-center">
        <h2 className="font-bold leading-[1.12] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}>
          {t.contactCta.h2[lang]}
        </h2>
        <div className="mt-12">
          <StartButton center large />
        </div>
      </Reveal>
    </section>
  )
}
