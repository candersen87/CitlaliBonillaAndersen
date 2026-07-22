import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse original abstract paintings by Citlali Bonilla Andersen. A collection exploring color, emotion, and form.',
  openGraph: {
    title: 'Gallery — Citlali Bonilla Andersen',
    description: 'Browse original abstract paintings by Citlali Bonilla Andersen.',
    url: 'https://brugliistudio.com/gallery',
  },
}

interface Painting {
  _id: string
  title: string
  slug: { current: string }
  image: {
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
    crop?: unknown
    lqip?: string
  }
  sold?: boolean
}

export const revalidate = 3600

export default async function Gallery() {
  const paintings = await client.fetch<Painting[]>(
    `*[_type == "painting"] | order(sold asc, _createdAt desc) {
      _id,
      title,
      slug,
      image {
        ...,
        "lqip": asset->metadata.lqip
      },
      sold
    }`
  )

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl font-light mb-4 text-black text-center">Gallery</h1>
        <p className="text-lg text-gray-600 font-light mb-14 text-center">
          A collection of original paintings exploring color, emotion, and form
        </p>

        {paintings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paintings.map((painting) => (
              <Link key={painting._id} href={`/gallery/${painting.slug.current}`}>
                <div className="group cursor-pointer">
                  {/* Museum frame: white mat padding around artwork */}
                  <div className="bg-white p-5 shadow-sm group-hover:shadow-md transition-shadow duration-300 mb-5">
                    <div className="aspect-square relative overflow-hidden bg-gray-50">
                      <Image
                        src={urlFor(painting.image).url()}
                        alt={painting.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`object-cover group-hover:scale-105 transition duration-300 ${painting.sold ? 'opacity-60' : ''}`}
                        placeholder={painting.image.lqip ? 'blur' : 'empty'}
                        blurDataURL={painting.image.lqip ?? undefined}
                      />
                      {painting.sold && (
                        <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden pointer-events-none">
                          <div
                            className="absolute bg-white text-black text-center py-1"
                            style={{
                              width: '300px',
                              top: '20px',
                              left: '-120px',
                              transform: 'rotate(-45deg)',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                            }}
                          >
                            <span className="uppercase tracking-widest text-xs font-light">Sold</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2 className="text-lg font-light text-gray-600 group-hover:text-black transition text-center">
                    {painting.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">No paintings yet. Check back soon!</p>
          </div>
        )}
      </section>
    </Layout>
  )
}
