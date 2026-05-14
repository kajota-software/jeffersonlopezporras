'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import { SectionLabel } from './SectionLabel'

const stack = [
  'Python', 'FastAPI', 'PostgreSQL', 'MongoDB',
  'Flutter', 'Node.js', 'Next.js', 'Tailwind CSS',
  'Docker', 'Railway',
]

export default function About() {
  const { lang } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="border-t border-[#c4b49a]" style={{ background: '#f5f0e8' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-24">
        <SectionLabel>{a.badge[lang]}</SectionLabel>

        <div className="mt-8 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
          {/* Bio */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[1.18rem] leading-relaxed text-[#1c1209]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              {a.p1[lang]}
            </p>
            <p
              className="text-base leading-relaxed text-[#4a3520]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {a.p2[lang]}
            </p>
            <p
              className="text-base leading-relaxed text-[#4a3520]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {a.p3[lang]}
            </p>
            <p
              className="text-base leading-relaxed text-[#4a3520]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {a.p4[lang]}
            </p>
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-6">
            <p
              className="text-xs uppercase tracking-widest text-[#7a6045]"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {a.stack_label[lang]}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm rounded-md text-[#4a3520]"
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    background: 'rgba(139, 69, 19, 0.07)',
                    border: '1px solid rgba(139, 69, 19, 0.2)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* FitManage callout */}
            <div
              className="mt-4 rounded-lg p-5"
              style={{ background: '#ede8db', border: '1px solid #c4b49a' }}
            >
              <p
                className="text-sm leading-relaxed text-[#4a3520]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                {lang === 'es'
                  ? 'Todo este stack lo uso actualmente en FitManage — en producción, con usuarios reales, resolviendo problemas reales.'
                  : 'I currently use all of this stack in FitManage — in production, with real users, solving real problems.'}
              </p>
              <a
                href="https://fitmanage.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-[#8b4513] transition-colors hover:text-[#b5642a]"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                fitmanage.app →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
