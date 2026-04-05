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
  image: any
  gallery?: any[]
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
  const painting = await client.fetch<{ title: string }>(
    `*[_type == "painting" && slug.current == $slug][0] { title }`,
    { slug }
  )
  if (!painting) return { title: 'Painting Not Found' }
  return { title: `${painting.title} | Ally Bruglii` }
}

export default async function PaintingDetail({ params }: PageProps) {
  const { slug } = await params

  const painting = await client.fetch<PaintingDetail>(
    `*[_type == "painting" && slug.current == $slug][0] {
      _id, title, slug, image, gallery, story, size, medium, price, sold
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

  return (
    <Layout>
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
              urlFor(painting.image).width(1200).url(),
              ...(painting.gallery ?? []).map((img: any) => urlFor(img).width(1200).url()),
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

