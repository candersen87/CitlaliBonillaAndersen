import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Layout from '@/app/components/Layout'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Ally Bruglii — a contemporary abstract painter based in Copenhagen, Denmark.',
  openGraph: {
    title: 'About — Ally Bruglii',
    description: 'Contemporary abstract painter based in Copenhagen, Denmark.',
    url: 'https://allybruglii.com/about',
  },
}

interface AboutData {
  name: string
  bio?: any[]
  image?: {
    asset?: {
      metadata?: {
        dimensions?: { width: number; height: number }
      }
    }
    [key: string]: any
  }
  location?: string
  email?: string
}

export default async function About() {
  const about = await client.fetch<AboutData>(
    `*[_type == "about"][0] {
      name,
      bio,
      image { ..., asset->{ _id, metadata { dimensions } } },
      location,
      email
    }`
  )

  if (!about) {
    return (
      <Layout>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-light mb-6 text-black">About me</h1>
          <p className="text-gray-600">No about information yet.</p>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="order-first">
            <h1 className="text-5xl font-light mb-6 text-black text-center">{about.name}</h1>

            {about.bio && (
              <div className="mb-8 text-gray-700 text-center space-y-4">
                <PortableText
                  value={about.bio}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-base font-light leading-relaxed text-gray-600">{children}</p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-light tracking-tight text-gray-900 mt-8 mb-2">{children}</h2>
                      ),
                    },
                  }}
                />
              </div>
            )}

            {about.location && (
              <p className="text-gray-600 mb-4 font-light text-center">
                <span className="font-medium">Location:</span> {about.location}
              </p>
            )}

            {about.email && (
              <p className="text-gray-600 font-light text-center">
                <span className="font-medium">Email:</span>{' '}
                <a href={`mailto:${about.email}`} className="hover:text-gray-400">
                  {about.email}
                </a>
              </p>
            )}
          </div>

          {about.image && (() => {
            const dims = about.image?.asset?.metadata?.dimensions
            const width = dims?.width ?? 800
            const height = dims?.height ?? 1000
            return (
              <div className="relative overflow-hidden bg-gray-100 w-full md:order-first">
                <Image
                  src={urlFor(about.image).url()}
                  alt={about.name}
                  width={width}
                  height={height}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-contain"
                />
              </div>
            )
          })()}
        </div>
      </section>
    </Layout>
  )
}
