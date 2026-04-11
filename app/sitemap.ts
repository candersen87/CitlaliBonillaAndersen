import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://citlalibonillaandersen.com'

  const paintings = await client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(
    `*[_type == "painting"] { slug, _updatedAt }`
  )

  const paintingUrls = paintings.map((p) => ({
    url: `${baseUrl}/gallery/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...paintingUrls,
  ]
}
