'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import { SectionLabel } from './SectionLabel'

const posts = [
  {
    tag:   { es: 'Origen',     en: 'Origin'     },
    title: {
      es: 'Cómo empecé a construir FitManage (y lo que nadie te dice del primer año)',
      en: 'How I started building FitManage (and what nobody tells you about year one)',
    },
    desc: {
      es: 'Por qué lo hice, qué falló al inicio, qué cambió.',
      en: 'Why I did it, what failed early, what changed.',
    },
  },
  {
    tag:   { es: 'Producto',    en: 'Product'    },
    title: {
      es: 'Lo que aprendí de hablar con 50 entrenadores personales antes de lanzar',
      en: 'What I learned from talking to 50 personal trainers before launching',
    },
    desc: {
      es: 'Útil para entrenadores.',
      en: 'Useful for trainers.',
    },
  },
  {
    tag:   { es: 'Reflexión',   en: 'Reflection' },
    title: {
      es: 'Ser founder y developer al mismo tiempo: lo que ganas y lo que sacrificas',
      en: 'Being founder and developer at the same time: what you gain and what you give up',
    },
    desc: {
      es: 'Personal, reflexivo, honesto.',
      en: 'Personal, reflective, honest.',
    },
  },
]

export default function BlogPreview() {
  const { lang } = useLanguage()
  const b = t.blog

  return (
    <section id="blog" className="border-t border-[#c4b49a]" style={{ background: '#f5f0e8' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-24">
        <SectionLabel>{b.badge[lang]}</SectionLabel>

        <h2
          className="mt-4 text-[2.6rem] font-semibold leading-tight text-[#1c1209] md:text-5xl"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {b.title[lang]}
        </h2>
        <p className="mt-2 max-w-lg text-sm text-[#4a3520]" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
          {b.sub[lang]}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <article
              key={i}
              className="flex flex-col gap-4 rounded-lg p-6"
              style={{ background: '#ede8db', border: '1px solid #c4b49a' }}
            >
              {/* Tag + coming soon */}
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-0.5 text-xs italic rounded-sm"
                  style={{
                    fontFamily: 'var(--font-lora), Georgia, serif',
                    color: '#8b4513',
                    background: 'rgba(139, 69, 19, 0.08)',
                    border: '1px solid rgba(139, 69, 19, 0.2)',
                  }}
                >
                  {post.tag[lang]}
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest text-[#7a6045]"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {b.soon[lang]}
                </span>
              </div>

              <h3
                className="text-xl font-semibold leading-snug text-[#1c1209]"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                {post.title[lang]}
              </h3>

              <p
                className="text-sm leading-relaxed text-[#7a6045]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                {post.desc[lang]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
