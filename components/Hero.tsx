'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

export default function Hero() {
  const { lang } = useLanguage()

  return (
    <section className="relative min-h-[88vh] dot-grid flex items-center">
      {/* Manchas de papel en las esquinas */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(139,69,19,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(139,69,19,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 relative z-10">
        {/* Saludo intro */}
        <p
          className="mb-4 text-base text-[#7a6045]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
        >
          {lang === 'es' ? 'Hola, soy Jefferson —' : "Hi, I'm Jefferson —"}
        </p>

        {/* H1 en Caveat */}
        <h1
          className="max-w-2xl text-[#1c1209] leading-[1.08]"
          style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
        >
          <span className="block">{t.hero.h1a[lang]}</span>
          <span className="block mt-1 ink-underline" style={{ color: '#8b4513' }}>
            {t.hero.h1b[lang]}
          </span>
        </h1>

        {/* H2 solo SEO */}
        <h2 className="sr-only">
          {lang === 'es'
            ? 'Diseño webs, reservas online y agentes IA para emprendedores — Costa Rica, LATAM, EEUU'
            : 'Web design, online booking systems and AI agents for entrepreneurs — Costa Rica, LATAM, US'}
        </h2>

        {/* Subheading */}
        <p
          className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[#4a3520]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {t.hero.sub[lang]}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          {/* CTA principal → sección Calendly */}
          <a
            href="#contact"
            className="rounded-lg bg-[#8b4513] px-6 py-3 text-sm font-medium text-[#f5f0e8] transition-all duration-200 hover:bg-[#b5642a] hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {t.hero.cta1[lang]}
          </a>
          {/* CTA secundario → portafolio */}
          <a
            href="#projects"
            className="rounded-lg border border-[#c4b49a] bg-[#ede8db] px-6 py-3 text-sm font-medium text-[#4a3520] transition-all duration-200 hover:border-[#9a8070] hover:text-[#1c1209] hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {t.hero.cta2[lang]}
          </a>
        </div>

        {/* Stats — números en Caveat, labels en Inter */}
        <div className="mt-14 flex flex-wrap gap-10 border-t border-[#c4b49a] pt-12">
          {[
            { n: t.hero.stat1n[lang], l: t.hero.stat1l[lang] },
            { n: t.hero.stat2n[lang], l: t.hero.stat2l[lang] },
            { n: t.hero.stat3n[lang], l: t.hero.stat3l[lang] },
          ].map(({ n, l }) => (
            <div key={l} className="flex flex-col gap-1">
              <span
                className="text-4xl font-bold leading-none text-[#8b4513]"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                {n}
              </span>
              <span
                className="text-xs text-[#7a6045] max-w-[140px] leading-snug"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
