import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import Layout from './components/Layout'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Citlali Bonilla Andersen — Contemporary Abstract Paintings',
  description:
    'Citlali Bonilla Andersen is a contemporary abstract painter based in Copenhagen. Discover original paintings that explore color, movement, and emotion.',
  openGraph: {
    title: 'Citlali Bonilla Andersen — Contemporary Abstract Paintings',
    description: 'Original abstract paintings exploring color, movement, and emotion.',
    url: 'https://citlalibonillaandersen.com',
  },
}

interface Painting {
  _id: string
  title: string
  slug: { current: string }
  image: any
}

export const revalidate = 3600

export default async function Home() {
  const paintings = await client.fetch<Painting[]>(
    `*[_type == "painting"] | order(_createdAt desc)[0...6] {
      _id,
      title,
      slug,
      image
    }`
  )

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/Heroimage.png"
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-60"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6 text-white">
            BRUGLII STUDIO
          </h1>
          <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8">
            An ongoing series of sophisticated contemporary abstracts where rich impasto layering and palette knife scraping transform the flat canvas. These works explore the intersection of light and complex textures.
          </p>
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 border-2 border-white font-light text-white hover:bg-white hover:text-black transition"
          >
            View Work
          </Link>
        </div>
      </section>

      {/* Featured Paintings Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-light mb-12 text-black text-center">Recent Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paintings.map((painting) => (
            <Link key={painting._id} href={`/gallery/${painting.slug.current}`}>
              <div className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={urlFor(painting.image).url()}
                    alt={painting.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-lg font-light mb-1 text-black group-hover:text-gray-600 text-center">
                  {painting.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="px-8 py-3 border border-black font-light text-black hover:bg-black hover:text-white transition inline-block"
          >
            View All Works
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gray-50 p-12 text-center">
          <h2 className="text-3xl font-light mb-6 text-black">Get in touch</h2>
          <p className="text-gray-600 mb-8 font-light">
            For inquiries or more information, you're welcome to reach out via Instagram or the contact form.<br />I look forward to hearing from you.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 border border-black font-light text-black hover:bg-black hover:text-white transition inline-block"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </Layout>
  )
}
