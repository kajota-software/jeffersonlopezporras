import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { t } from '@/lib/translations'
import type { Lang } from '@/context/LanguageContext'

const GUIDE_SLUGS = [
  'reservas-directas-hospedajes-costa-rica',
  'comision-booking-airbnb-costa-rica',
  'aparecer-en-google-maps-negocio-turistico',
]

const DIVIDER = '1px solid rgba(28,18,9,0.1)'

// Tres artículos del blog en lista simple, antes del FAQ (el blog está solo en español)
export default async function Guides({ lang }: { lang: Lang }) {
  const posts = await Promise.all(GUIDE_SLUGS.map(getPost))
  const g = t.guides

  return (
    <section id="guias" className="py-24 md:py-32 section-border">
      <div className="mx-auto max-w-[820px] px-6">
        <h2 className="font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          {g.h2[lang]}
        </h2>
        {g.note[lang] && <p className="mt-4 text-[15px]" style={{ color: '#7a6045' }}>{g.note[lang]}</p>}

        <ul className="mt-12" style={{ borderBottom: DIVIDER }}>
          {posts.map(post => (
            <li key={post.slug} style={{ borderTop: DIVIDER }}>
              <Link href={`/blog/${post.slug}`} hrefLang="es" className="group block py-7">
                <h3 className="text-[1.2rem] font-semibold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-[1.3rem]">
                  {post.meta.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: '#4a3520' }}>{post.meta.description}</p>
                <span className="mt-3 inline-block text-[15px] font-semibold" style={{ color: '#8b4513' }}>{g.read[lang]} →</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/blog" className="mt-8 inline-flex min-h-11 items-center text-[15px] font-semibold underline-offset-4 hover:underline" style={{ color: '#8b4513' }}>
          {g.all[lang]} →
        </Link>
      </div>
    </section>
  )
}
