'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

export default function Footer({ onBlog = false }: { onBlog?: boolean }) {
  const ctx = useLanguage()
  const lang = onBlog ? 'es' : ctx.lang

  return (
    <footer style={{ borderTop: '1px solid rgba(28,18,9,0.09)' }}>
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 py-7">
        <span className="flex items-center gap-3 text-sm" style={{ color: '#7a6045' }}>
          <Image src="/brand/logo-jefferson-lopez.svg" alt="Jefferson López" width={737} height={163} className="h-5 w-auto" />
          {t.footer.year[lang]}
        </span>

        <div className="flex flex-wrap items-center gap-6">
          <Link href="/blog" className="text-sm transition-colors duration-200 hover:text-text-primary" style={{ color: '#7a6045' }}>
            {t.nav.blog[lang]}
          </Link>
          {[
            { href: 'https://fitmanage.app', label: t.footer.fitmanage[lang] },
            { href: 'https://www.linkedin.com/in/jeff-lp', label: 'LinkedIn' },
            { href: 'mailto:jefferson.lopez.porras21@gmail.com', label: 'Email' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-sm transition-colors duration-200"
              style={{ color: '#7a6045' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1c1209' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#7a6045' }}
            >
              {label}
            </a>
          ))}
        </div>

        <span className="text-sm" style={{ color: '#7a6045' }}>
          {t.footer.cr[lang]}
        </span>
      </div>
    </footer>
  )
}
