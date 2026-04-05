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
  image?: any
  location?: string
  email?: string
}

export default async function About() {
  const about = await client.fetch<AboutData>(
    `*[_type == "about"][0] {
      name,
      bio,
      image,
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
          {about.image && (
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              <Image
                src={urlFor(about.image).url()}
                alt={about.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}

          <div>
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
        </div>
      </section>
    </Layout>
  )
}
