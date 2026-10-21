import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import CTA from '@/components/blog/CTA'
import { getPost, POST_SLUGS, formatDate, SITE_URL } from '@/lib/blog'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return POST_SLUGS.map(slug => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const { meta } = await getPost(slug)
  const url = `/blog/${slug}`
  return {
    title: { absolute: meta.seoTitle },
    description: meta.description,
    authors: [{ name: 'Jefferson López', url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'es_CR',
      url,
      siteName: 'Jefferson López',
      title: meta.seoTitle,
      description: meta.description,
      publishedTime: meta.date,
      modifiedTime: meta.date,
      authors: ['Jefferson López'],
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: meta.title }],
    },
    twitter: { card: 'summary_large_image', title: meta.seoTitle, description: meta.description, images: ['/og-image.png'] },
  }
}

const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.08em]'
const DIVIDER = '1px solid rgba(28,18,9,0.1)'

export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const post = await getPost(slug)
  const { meta, Content, headings, minutes } = post
  const related = await Promise.all(meta.related.map(getPost))
  const url = `${SITE_URL}/blog/${slug}`
  const author = { '@type': 'Person', name: 'Jefferson López', url: SITE_URL }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: meta.title,
        description: meta.description,
        datePublished: meta.date,
        dateModified: meta.date,
        inLanguage: 'es-CR',
        keywords: meta.keyword,
        image: `${SITE_URL}/og-image.png`,
        url,
        mainEntityOfPage: url,
        author,
        publisher: author,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: meta.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: meta.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Nav onBlog />

      <main className="overflow-x-clip pt-28 md:pt-36">
        <article className="mx-auto max-w-[68ch] px-6">
          <nav aria-label="Migas de pan" className="text-[13px]" style={{ color: '#7a6045' }}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li><Link href="/" className="hover:text-text-primary">Inicio</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/blog" className="hover:text-text-primary">Blog</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-text-primary">{meta.title}</li>
            </ol>
          </nav>

          {/* Sin animación: título, intro e índice son lo primero que se ve */}
          <div>
            <h1 className="mt-8 font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              {meta.title}
            </h1>
            <p className="mt-6 text-[13px] tabular-nums" style={{ color: '#7a6045' }}>
              Por <span className="font-medium text-text-primary">Jefferson López</span> · <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {minutes} min de lectura
            </p>
            <p className="mt-10 text-[1.2rem] font-medium leading-[1.7] text-text-primary md:text-[1.3rem]">{meta.intro}</p>
          </div>

          <nav aria-labelledby="toc" className="mt-12 py-8" style={{ borderTop: DIVIDER, borderBottom: DIVIDER }}>
              <p id="toc" className={LABEL} style={{ color: '#7a6045' }}>En este artículo</p>
              <ol className="mt-4 flex flex-col gap-2.5">
                {headings.map((h, i) => (
                  <li key={h.id} className="flex gap-3 text-[15px] leading-[1.5]">
                    <span className="shrink-0 tabular-nums" style={{ color: '#8b4513' }}>{String(i + 1).padStart(2, '0')}</span>
                    <a href={`#${h.id}`} className="underline-offset-4 hover:underline" style={{ color: '#33241a' }}>{h.text}</a>
                  </li>
                ))}
              </ol>
          </nav>

          <div className="mt-4">
            <Content />
          </div>

          <CTA position="end" />
        </article>

        <FAQ
          id="preguntas"
          title={{ es: 'Preguntas frecuentes', en: 'Preguntas frecuentes' }}
          questions={meta.faq.map(({ q, a }) => ({ q: { es: q, en: q }, a: { es: a, en: a } }))}
        />

        <section className="mx-auto max-w-[68ch] px-6 pb-8">
          <h2 className="text-[1.3rem] font-bold tracking-tight text-text-primary">Fuentes</h2>
          <ol className="mt-5 flex list-decimal flex-col gap-2.5 pl-5 text-[15px] leading-[1.6] marker:text-accent" style={{ color: '#4a3520' }}>
            {meta.sources.map(s => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-words underline decoration-[rgba(139,69,19,0.35)] underline-offset-4 hover:decoration-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto mt-16 max-w-[68ch] px-6 pb-24">
          <h2 className="text-[1.3rem] font-bold tracking-tight text-text-primary">Artículos relacionados</h2>
          <ul className="mt-4">
            {related.map(r => (
              <li key={r.slug} style={{ borderTop: DIVIDER }}>
                <Link href={`/blog/${r.slug}`} className="group block py-5">
                  <span className="block text-[1.075rem] font-semibold leading-snug text-text-primary transition-colors group-hover:text-accent">
                    {r.meta.title}
                  </span>
                  <span className="mt-1.5 block text-[14px] leading-[1.6]" style={{ color: '#7a6045' }}>{r.meta.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer onBlog />
    </>
  )
}
