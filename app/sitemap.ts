import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL, HOME_UPDATED } from '@/lib/config'

const day = (iso: string) => new Date(`${iso}T12:00:00`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  // /blog cambia cuando se publica o actualiza un artículo
  const blogUpdated = posts.map(p => p.meta.date).sort().at(-1)!
  const homeAlternates = {
    languages: { es: SITE_URL, en: `${SITE_URL}/en`, 'x-default': SITE_URL },
  }

  return [
    { url: SITE_URL, lastModified: day(HOME_UPDATED), changeFrequency: 'monthly', priority: 1, alternates: homeAlternates },
    { url: `${SITE_URL}/en`, lastModified: day(HOME_UPDATED), changeFrequency: 'monthly', priority: 0.9, alternates: homeAlternates },
    { url: `${SITE_URL}/blog`, lastModified: day(blogUpdated), changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map(p => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: day(p.meta.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
