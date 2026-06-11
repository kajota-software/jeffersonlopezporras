'use client'

import { motion } from 'framer-motion'
import type { Transition, TargetAndTransition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

interface MotionAnim {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  viewport: { once: boolean; margin: string }
  transition: Transition
}

const fromLeft: MotionAnim = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const fromRight: MotionAnim = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

function Badge({ label, variant = 'default' }: { label: string; variant?: 'default' | 'wip' }) {
  return (
    <span
      className="inline-flex text-[11px] font-semibold px-3 py-1 rounded-full"
      style={
        variant === 'wip'
          ? {
              background: 'rgba(28,18,9,0.06)',
              color: '#7a6045',
              border: '1px solid rgba(28,18,9,0.12)',
            }
          : {
              background: 'rgba(139,69,19,0.08)',
              color: '#8b4513',
              border: '1px solid rgba(139,69,19,0.22)',
            }
      }
    >
      {label}
    </span>
  )
}

interface ProjectRowProps {
  logoSide: 'left' | 'right'
  logoSrc: string
  logoAlt: string
  badge: string
  wipBadge?: string
  name: string
  desc: string
  details: string[]
  url: string
  linkText: string
  inProgress?: boolean
  invertLogo?: boolean
  isFirst?: boolean
}

function ProjectRow({ logoSide, logoSrc, logoAlt, badge, wipBadge, name, desc, details, url, linkText, inProgress, invertLogo, isFirst }: ProjectRowProps) {
  const logoAnim = logoSide === 'left' ? fromLeft : fromRight
  const textAnim = logoSide === 'left' ? fromRight : fromLeft

  const logoCol = (
    <motion.div {...logoAnim} className="relative min-h-[200px] md:min-h-[240px] flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={logoAlt}
        className="w-full h-full object-contain p-8 max-h-[220px]"
        style={{ filter: invertLogo ? 'invert(1)' : 'none' }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
          const ph = el.parentElement
          if (ph) {
            ph.innerHTML = `<div style="width:100%;min-height:180px;display:flex;align-items:center;justify-content:center;background:rgba(28,18,9,0.03);border:1px solid rgba(28,18,9,0.08);border-radius:12px"><span style="font-size:1.3rem;font-weight:700;color:rgba(28,18,9,0.15)">${logoAlt}</span></div>`
          }
        }}
      />
    </motion.div>
  )

  const textCol = (
    <motion.div {...textAnim} className="flex flex-col justify-center gap-4 py-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge label={badge} />
        {inProgress && wipBadge && <Badge label={wipBadge} variant="wip" />}
      </div>
      <h3 className="text-2xl font-bold leading-tight" style={{ color: '#1c1209' }}>{name}</h3>
      <p className="text-[15px] leading-[1.75]" style={{ color: '#4a3520' }}>{desc}</p>
      <ul className="flex flex-col gap-1.5">
        {details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: '#7a6045' }}>
            <span className="mt-0.5 shrink-0" style={{ color: '#8b4513' }}>→</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      {!inProgress ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-sm font-medium transition-colors duration-200"
          style={{ color: '#8b4513' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1c1209' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#8b4513' }}
        >
          {linkText}
        </a>
      ) : (
        <span className="mt-1 text-sm italic" style={{ color: '#7a6045' }}>
          {linkText}
        </span>
      )}
    </motion.div>
  )

  return (
    <div
      className="py-16"
      style={{ borderTop: isFirst ? 'none' : '1px solid rgba(28,18,9,0.09)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {logoSide === 'left' ? (
          <>
            <div>{logoCol}</div>
            <div>{textCol}</div>
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
  const wipLabel = { es: 'En proceso', en: 'In progress' }

  const projects = [
    {
      logoSide: 'left' as const,
      logoSrc: '/logos/fma.png',
      logoAlt: 'FitManage',
      badge: p.fitmanage.badge[lang],
      name: p.fitmanage.name[lang],
      desc: p.fitmanage.desc[lang],
      details: lang === 'es' ? p.fitmanage.details : p.fitmanage.detailsEn,
      url: p.fitmanage.url,
      linkText: p.fitmanage.link[lang],
      inProgress: false,
    },
    {
      logoSide: 'right' as const,
      logoSrc: '/logos/sloth.png',
      logoAlt: 'Sloth RentACar',
      badge: p.sloth.badge[lang],
      wipBadge: wipLabel[lang],
      name: p.sloth.name[lang],
      desc: p.sloth.desc[lang],
      details: lang === 'es' ? p.sloth.details : p.sloth.detailsEn,
      url: p.sloth.url,
      linkText: p.sloth.link[lang],
      inProgress: true,
      invertLogo: true,
    },
    {
      logoSide: 'left' as const,
      logoSrc: '/logos/logofbv.png',
      logoAlt: 'Finca Buena Vista',
      badge: p.finca.badge[lang],
      name: p.finca.name[lang],
      desc: p.finca.desc[lang],
      details: lang === 'es' ? p.finca.details : p.finca.detailsEn,
      url: p.finca.url,
      linkText: p.finca.link[lang],
      inProgress: false,
    },
    {
      logoSide: 'right' as const,
      logoSrc: '/logos/serenia.png',
      logoAlt: 'Serenia CR',
      badge: p.serenia.badge[lang],
      name: p.serenia.name[lang],
      desc: p.serenia.desc[lang],
      details: lang === 'es' ? p.serenia.details : p.serenia.detailsEn,
      url: p.serenia.url,
      linkText: p.serenia.link[lang],
      inProgress: false,
    },
  ]

  return (
    <section id="projects" className="py-16 section-border">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-4">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1c1209' }}>
            {p.title[lang]}
          </h2>
          <p className="mt-3 text-[15px]" style={{ color: '#7a6045' }}>{p.sub[lang]}</p>
        </div>
        {projects.map((proj, i) => (
          <ProjectRow key={proj.logoAlt} {...proj} isFirst={i === 0} />
        ))}
      </div>
    </section>
  )
}
