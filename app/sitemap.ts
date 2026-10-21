import { MetadataRoute } from 'next'
import { getAllPosts, SITE_URL } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map(p => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(`${p.meta.date}T12:00:00`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
