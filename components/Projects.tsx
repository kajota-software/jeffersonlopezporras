'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import { SectionLabel } from './SectionLabel'

function thumbUrl(siteUrl: string) {
  return `https://image.thum.io/get/width/800/crop/500/noanimate/${siteUrl}`
}

function BrowserChrome({ url }: { url: string }) {
  const displayHost = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 border-b"
      style={{ background: '#e0d8cc', borderColor: '#c4b49a' }}
    >
      <div className="flex gap-1 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#c4b49a]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#c4b49a]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#c4b49a]" />
      </div>
      <div
        className="flex-1 text-center text-xs truncate rounded-sm px-2 py-0.5"
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: '#7a6045',
          background: 'rgba(196, 180, 154, 0.35)',
        }}
      >
        {displayHost}
      </div>
    </div>
  )
}

function SmallProjectCard({
  name, badges, desc, pills, url, linkText,
}: {
  name: string
  badges: string[]
  desc: string
  pills: string[]
  url: string
  linkText: string
}) {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-lg transition-all duration-300"
      style={{ background: '#f5f0e8', border: '1px solid #c4b49a' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#9a8070' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#c4b49a' }}
    >
      <div className="relative overflow-hidden" style={{ background: '#ede8db' }}>
        <BrowserChrome url={url} />
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={thumbUrl(url)}
            alt={`Preview de ${name}`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 500px"
            unoptimized
          />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(28, 18, 9, 0.52)' }}
          >
            <span
              className="px-4 py-2 rounded text-sm font-medium text-[#f5f0e8]"
              style={{
                fontFamily: 'var(--font-lora), Georgia, serif',
                border: '1px solid rgba(245, 240, 232, 0.5)',
                background: 'rgba(139, 69, 19, 0.75)',
              }}
            >
              {linkText} →
            </span>
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 border-t border-[#c4b49a]">
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b}
              className="px-2.5 py-0.5 text-xs italic rounded-sm"
              style={{
                fontFamily: 'var(--font-lora), Georgia, serif',
                color: '#8b4513',
                background: 'rgba(139, 69, 19, 0.08)',
                border: '1px solid rgba(139, 69, 19, 0.2)',
              }}
            >
              {b}
            </span>
          ))}
        </div>
        <h3
          className="text-2xl font-semibold text-[#1c1209] leading-tight"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-[#4a3520]" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
          {desc}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {pills.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-sm text-[#7a6045]"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                background: 'rgba(139, 69, 19, 0.06)',
                border: '1px solid rgba(139, 69, 19, 0.15)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { lang } = useLanguage()
  const p = t.projects
  const fm = p.p1

  return (
    <section id="projects" className="border-t border-[#c4b49a]" style={{ background: '#ede8db' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-24">
        <SectionLabel>{p.badge[lang]}</SectionLabel>

        <h2
          className="mt-4 text-[2.6rem] font-semibold leading-tight text-[#1c1209] md:text-5xl"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {p.title[lang]}
        </h2>
        <p className="mt-2 max-w-lg text-sm text-[#4a3520]" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
          {p.sub[lang]}
        </p>

        {/* ── FitManage — protagonista ─────────────────── */}
        <div
          className="group mt-12 overflow-hidden rounded-lg"
          style={{ border: '2px solid #9a8070', background: '#f5f0e8' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Screenshot */}
            <div className="relative overflow-hidden" style={{ background: '#ede8db', minHeight: '300px' }}>
              <BrowserChrome url={fm.url} />
              <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
                <Image
                  src={thumbUrl(fm.url)}
                  alt="Preview de FitManage.app"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 550px"
                  unoptimized
                />
                <a
                  href={fm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(28, 18, 9, 0.52)' }}
                >
                  <span
                    className="px-5 py-2.5 rounded text-sm font-medium text-[#f5f0e8]"
                    style={{
                      fontFamily: 'var(--font-lora), Georgia, serif',
                      border: '1px solid rgba(245, 240, 232, 0.5)',
                      background: 'rgba(139, 69, 19, 0.75)',
                    }}
                  >
                    {fm.link[lang]}
                  </span>
                </a>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 p-7 md:p-10 border-t md:border-t-0 md:border-l border-[#c4b49a]">
              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {[fm.badge1[lang], fm.badge2[lang]].map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-0.5 text-xs italic rounded-sm"
                    style={{
                      fontFamily: 'var(--font-lora), Georgia, serif',
                      color: '#8b4513',
                      background: 'rgba(139, 69, 19, 0.1)',
                      border: '1px solid rgba(139, 69, 19, 0.25)',
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <h3
                className="text-3xl font-semibold text-[#1c1209] leading-tight"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                {fm.name[lang]}
              </h3>

              <p className="text-sm leading-relaxed text-[#4a3520]" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                {fm.desc[lang]}
              </p>
              <p className="text-sm leading-relaxed text-[#4a3520]" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                {fm.desc2[lang]}
              </p>

              {/* Métricas */}
              <div className="flex gap-6 py-4 border-y border-[#c4b49a]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold text-[#8b4513]" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
                    {fm.metric1n[lang]}
                  </span>
                  <span className="text-xs text-[#7a6045]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    {fm.metric1l[lang]}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold text-[#8b4513]" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
                    {fm.metric2n[lang]}
                  </span>
                  <span className="text-xs text-[#7a6045]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    {fm.metric2l[lang]}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#7a6045] italic" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                {fm.metric3[lang]}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2">
                {fm.pills.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-sm text-[#7a6045]"
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      background: 'rgba(139, 69, 19, 0.06)',
                      border: '1px solid rgba(139, 69, 19, 0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Otros proyectos ──────────────────────────── */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <SmallProjectCard
            name={p.p2.name[lang]}
            badges={[p.p2.badge1[lang], p.p2.badge2[lang]]}
            desc={p.p2.desc[lang]}
            pills={p.p2.pills}
            url={p.p2.url}
            linkText={p.p2.link[lang]}
          />
          <SmallProjectCard
            name={p.p3.name[lang]}
            badges={[p.p3.badge1[lang], p.p3.badge2[lang]]}
            desc={p.p3.desc[lang]}
            pills={p.p3.pills}
            url={p.p3.url}
            linkText={p.p3.link[lang]}
          />
        </div>
      </div>
    </section>
  )
}
