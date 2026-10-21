'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import type { ProjectItem } from '@/lib/translations'
import Reveal from '@/components/Reveal'

const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.08em]'

function ProjectRow({ project, logoSide, isFirst }: { project: ProjectItem; logoSide: 'left' | 'right'; isFirst: boolean }) {
  const { lang } = useLanguage()
  const labels = t.projects.labels
  const { logoSrc, logoAlt, invertLogo, name, category, pain, done, url } = project

  const logoCol = (
    <Reveal className="flex min-h-[120px] items-center justify-center md:min-h-[240px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-full max-h-[110px] w-auto max-w-[240px] object-contain md:max-h-[180px] md:max-w-[300px]"
        style={{ filter: invertLogo ? 'invert(1)' : 'none' }}
      />
    </Reveal>
  )

  const textCol = (
    <Reveal delay={0.08} className="flex flex-col">
      <p className={LABEL} style={{ color: '#8b4513' }}>{category[lang]}</p>
      <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-[1.75rem]">{name}</h3>

      {pain ? (
        <dl className="mt-6 flex flex-col gap-5">
          <div>
            <dt className={LABEL} style={{ color: '#7a6045' }}>{labels.pain[lang]}</dt>
            <dd className="mt-1.5 text-[1.05rem] leading-[1.65]" style={{ color: '#4a3520' }}>{pain[lang]}</dd>
          </div>
          <div>
            <dt className={LABEL} style={{ color: '#7a6045' }}>{labels.done[lang]}</dt>
            <dd className="mt-1.5 text-[1.05rem] leading-[1.65] text-text-primary">{done[lang]}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-[1.05rem] leading-[1.65] text-text-primary">{done[lang]}</p>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 w-fit text-[15px] font-semibold underline-offset-4 transition-colors duration-200 hover:underline"
        style={{ color: '#8b4513' }}
      >
        {labels.visit[lang]}
      </a>
    </Reveal>
  )

  return (
    <div className="py-14 md:py-20" style={{ borderTop: isFirst ? 'none' : '1px solid rgba(28,18,9,0.09)' }}>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-20">
        {logoSide === 'left' ? (
          <>
            {logoCol}
            {textCol}
          </>
        ) : (
          <>
            <div className="order-2 md:order-1">{textCol}</div>
            <div className="order-1 md:order-2">{logoCol}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const { lang } = useLanguage()
  const p = t.projects

  return (
    <section id="projects" className="pt-24 pb-8 md:pt-32 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal className="mb-6">
          <h2 className="font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {p.title[lang]}
          </h2>
          <p className="mt-4 text-[1.05rem]" style={{ color: '#7a6045' }}>{p.sub[lang]}</p>
        </Reveal>
        {p.items.map((project, i) => (
          <ProjectRow key={project.logoAlt} project={project} logoSide={i % 2 === 0 ? 'left' : 'right'} isFirst={i === 0} />
        ))}
      </div>
    </section>
  )
}
