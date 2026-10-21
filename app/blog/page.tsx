import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { getAllPosts, formatDate, CENTRAL_SLUG, SITE_URL } from '@/lib/blog'

const TITLE = 'Blog: reservas directas para negocios turísticos'
const DESCRIPTION =
  'Guías prácticas para hospedajes, tours y rent a car en Costa Rica: comisiones, Google Maps, WhatsApp, reseñas y cómo recibir más reservas directas.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: '/blog',
    siteName: 'Jefferson López',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og-image.png'] },
}

const META = 'text-[13px] tabular-nums'

export default async function BlogPage() {
  const posts = await getAllPosts()
  const featured = posts.find(p => p.slug === CENTRAL_SLUG)!
  const rest = posts.filter(p => p.slug !== CENTRAL_SLUG)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: TITLE,
    url: `${SITE_URL}/blog`,
    inLanguage: 'es-CR',
    author: { '@type': 'Person', name: 'Jefferson López', url: SITE_URL },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Nav onBlog />
      <main className="mx-auto max-w-[860px] px-6 pt-32 pb-24 md:pt-40">
        <Reveal>
          <h1 className="font-bold leading-[1.08] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            {TITLE}
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.1rem] leading-[1.7]" style={{ color: '#4a3520' }}>
            Lo que necesita saber para depender menos de las plataformas y recibir más reservas directas, explicado sin tecnicismos.
          </p>
        </Reveal>

        {/* Artículo central, destacado */}
        <Reveal className="mt-16 md:mt-20">
          <Link href={`/blog/${featured.slug}`} className="group block py-10" style={{ borderTop: '1px solid rgba(28,18,9,0.22)', borderBottom: '1px solid rgba(28,18,9,0.22)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#8b4513' }}>Guía completa</p>
            <h2 className="mt-3 text-[1.75rem] font-bold leading-[1.2] tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-[2.25rem]">
              {featured.meta.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[1.075rem] leading-[1.7]" style={{ color: '#4a3520' }}>{featured.meta.description}</p>
            <p className={`${META} mt-5`} style={{ color: '#7a6045' }}>
              {featured.minutes} min de lectura · {formatDate(featured.meta.date)}
            </p>
          </Link>
        </Reveal>

        <ul className="mt-4">
          {rest.map((post, i) => (
            <li key={post.slug} style={{ borderBottom: '1px solid rgba(28,18,9,0.09)' }}>
              <Reveal delay={(i % 4) * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block py-8">
                  <h2 className="text-[1.3rem] font-semibold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-[1.45rem]">
                    {post.meta.title}
                  </h2>
                  <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.7]" style={{ color: '#4a3520' }}>{post.meta.description}</p>
                  <p className={`${META} mt-3`} style={{ color: '#7a6045' }}>
                    {post.minutes} min de lectura · {formatDate(post.meta.date)}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </main>
      <Footer onBlog />
    </>
  )
}
