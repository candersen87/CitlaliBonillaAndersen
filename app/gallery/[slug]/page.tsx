import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/app/components/Layout'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import ShareButton from '@/app/components/ShareButton'
import PaintingCarousel from '@/app/components/PaintingCarousel'
import type { Metadata } from 'next'

export const revalidate = 3600

interface PaintingDetail {
  _id: string
  title: string
  slug: { current: string }
  altText?: string
  seoTitle?: string
  seoDescription?: string
  image: {
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
    crop?: unknown
    lqip?: string
  }
  gallery?: Array<{
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
    crop?: unknown
    lqip?: string
  }>
  story?: any[]
  size?: string
  medium?: string
  price?: number
  sold?: boolean
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "painting"] { slug }`
  )
  return slugs.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const painting = await client.fetch<{
    title: string
    altText?: string
    seoTitle?: string
    seoDescription?: string
    medium?: string
    size?: string
    image: { asset: { _ref: string } }
  }>(
    `*[_type == "painting" && slug.current == $slug][0] {
      title, altText, seoTitle, seoDescription, medium, size, image
    }`,
    { slug }
  )
  if (!painting) return { title: 'Painting Not Found' }

  const pageTitle = painting.seoTitle ?? painting.title
  const description =
    painting.seoDescription ??
    [painting.medium, painting.size].filter(Boolean).join(', ') ??
    `Original painting by Citlali Bonilla Andersen.`
  const imageUrl = urlFor(painting.image).width(1200).height(630).fit('crop').url()
  const canonicalUrl = `https://brugliistudio.com/gallery/${slug}`

  return {
    title: pageTitle,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: painting.altText ?? pageTitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  }
}

export default async function PaintingDetail({ params }: PageProps) {
  const { slug } = await params

  const painting = await client.fetch<PaintingDetail>(
    `*[_type == "painting" && slug.current == $slug][0] {
      _id, title, slug, altText, seoTitle, seoDescription,
      image {
        ...,
        "lqip": asset->metadata.lqip
      },
      gallery[] {
        ...,
        "lqip": asset->metadata.lqip
      },
      story, size, medium, price, sold
    }`,
    { slug }
  )

  if (!painting) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-3xl font-light">Painting not found</h1>
        </div>
      </Layout>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: painting.title,
    url: `https://brugliistudio.com/gallery/${painting.slug.current}`,
    image: urlFor(painting.image).width(1200).url(),
    artist: {
      '@type': 'Person',
      '@id': 'https://brugliistudio.com/#artist',
      name: 'Citlali Bonilla Andersen',
    },
    ...(painting.medium && { artMedium: painting.medium }),
    ...(painting.size && { artworkSurface: painting.size }),
    ...(painting.seoDescription && { description: painting.seoDescription }),
  }

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/gallery"
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Gallery
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start">

          {/* Left: Image carousel */}
          <PaintingCarousel
            images={[
              {
                url: urlFor(painting.image).width(1200).url(),
                lqip: painting.image.lqip,
                alt: painting.altText,
              },
              ...(painting.gallery ?? []).map((img) => ({
                url: urlFor(img).width(1200).url(),
                lqip: img.lqip,
              })),
            ]}
            title={painting.title}
            sold={painting.sold}
          />

          {/* Right: Details */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">

            {/* Title */}
            <div>
              <h1 className="text-4xl font-light text-black leading-tight mb-3">
                {painting.title}
              </h1>
              <div className="w-8 h-px bg-black" />
            </div>

            {/* Price */}
            {!painting.sold && painting.price !== undefined && painting.price !== null && (
              <p className="text-2xl font-light text-black">
                {painting.price.toLocaleString('da-DK')} DKK
              </p>
            )}
            {painting.sold && (
              <p className="text-sm uppercase tracking-widest text-gray-400">This piece has been sold</p>
            )}

            {/* Metadata rows */}
            {(painting.medium || painting.size) && (
              <div className="flex flex-col gap-3 text-sm border-t border-gray-100 pt-6">
                {painting.medium && (
                  <div className="flex justify-between items-baseline">
                    <span className="uppercase tracking-widest text-xs text-gray-400">Medium</span>
                    <span className="font-light text-gray-700">{painting.medium}</span>
                  </div>
                )}
                {painting.size && (
                  <div className="flex justify-between items-baseline">
                    <span className="uppercase tracking-widest text-xs text-gray-400">Size</span>
                    <span className="font-light text-gray-700">{painting.size}</span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {painting.story && (
              <div className="border-t border-gray-100 pt-6">
                <p className="uppercase tracking-widest text-xs text-gray-400 mb-4">About this piece</p>
                <div className="prose prose-sm font-light text-gray-600 leading-relaxed">
                  <PortableText value={painting.story} />
                </div>
              </div>
            )}

            {/* Share */}
            <div className="border-t border-gray-100 pt-6">
              <ShareButton title={painting.title} />
            </div>

          </div>
        </div>
      </article>
    </Layout>
  )
}
