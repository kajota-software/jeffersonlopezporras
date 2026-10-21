import fs from 'node:fs'
import path from 'node:path'
import type { ComponentType } from 'react'
import { slugify } from '@/lib/slug'

export interface PostMeta {
  title: string          // H1
  seoTitle: string       // <title>, ≤ 60 caracteres, palabra clave al inicio
  description: string    // meta description, ≤ 155 caracteres
  keyword: string
  date: string           // AAAA-MM-DD
  intro: string          // respuesta corta a la pregunta principal
  faq: { q: string; a: string }[]
  sources: { label: string; url: string }[]
  related: string[]      // slugs
}

export interface Post {
  slug: string
  meta: PostMeta
  Content: ComponentType
  headings: { id: string; text: string }[]
  minutes: number
}

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://jeffersonlopezporras.com'
export const CENTRAL_SLUG = 'reservas-directas-hospedajes-costa-rica'

// Orden del listado (el central va destacado aparte)
export const POST_SLUGS = [
  'reservas-directas-hospedajes-costa-rica',
  'comision-booking-airbnb-costa-rica',
  'aparecer-en-google-maps-negocio-turistico',
  'google-hoteles-sitio-oficial-reserva-gratis',
  'whatsapp-business-reservas-hospedaje',
  'conseguir-resenas-google-hospedaje',
  'temporada-baja-costa-rica-hospedaje',
  'pagina-web-hospedaje-tour-rent-a-car',
]

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const WORDS_PER_MINUTE = 200

// Texto del artículo sin el bloque `export const meta` ni los componentes JSX
function body(slug: string): string {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8')
  return raw
    .replace(/^export const meta = \{[\s\S]*?^\}\s*$/m, '')
    .replace(/^<[\s\S]*?\/>\s*$/gm, '')
}

const plain = (md: string) => md.replace(/\*\*|__|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()

function headings(text: string) {
  return [...text.matchAll(/^## (.+)$/gm)].map(m => {
    const t = plain(m[1])
    return { id: slugify(t), text: t }
  })
}

export async function getPost(slug: string): Promise<Post> {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as unknown as { default: ComponentType; meta: PostMeta }
  const text = body(slug)
  const words = (mod.meta.intro + ' ' + text).split(/\s+/).filter(Boolean).length
  return {
    slug,
    meta: mod.meta,
    Content: mod.default,
    headings: headings(text),
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  }
}

export const getAllPosts = () => Promise.all(POST_SLUGS.map(getPost))

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-CR', { day: 'numeric', month: 'long', year: 'numeric' })
}
