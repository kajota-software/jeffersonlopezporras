'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import { CONTACT_EMAIL } from '@/lib/config'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const LINK = 'inline-flex min-h-11 items-center text-sm transition-colors duration-200 hover:text-text-primary'

export default function Footer({ onBlog = false }: { onBlog?: boolean }) {
  const ctx = useLanguage()
  const lang = onBlog ? 'es' : ctx.lang
  const f = t.footer

  return (
    <footer style={{ borderTop: '1px solid rgba(28,18,9,0.09)' }}>
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-7">
        <span className="flex items-center gap-3 text-sm" style={{ color: '#7a6045' }}>
          <Image src="/brand/logo-jefferson-lopez.svg" alt="Jefferson López" width={737} height={163} className="h-5 w-auto" />
          {f.year[lang]}
        </span>

        <div className="flex flex-wrap items-center gap-x-6" style={{ color: '#7a6045' }}>
          <Link href="/blog" className={LINK}>{t.nav.blog[lang]}</Link>
          <a href="https://fitmanage.app" target="_blank" rel="noopener noreferrer" className={LINK}>{f.fitmanage[lang]}</a>
          <a href="https://www.linkedin.com/in/jeff-lp" target="_blank" rel="noopener noreferrer" className={LINK}>LinkedIn</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>Email</a>
        </div>

        <span className="text-sm" style={{ color: '#7a6045' }}>{f.cr[lang]}</span>
      </div>

      {/* Único enlace directo a WhatsApp del sitio, discreto a propósito */}
      <p className="mx-auto max-w-[1100px] px-6 pb-7 text-[13px]" style={{ color: '#7a6045' }}>
        {f.whatsapp[lang]}{' '}
        <a
          href={buildWhatsAppUrl(f.whatsappMsg[lang])}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-text-primary"
        >
          WhatsApp
        </a>
      </p>
    </footer>
  )
}
