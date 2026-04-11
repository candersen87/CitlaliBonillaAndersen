'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageEntry {
  url: string
  lqip?: string
  alt?: string
}

interface PaintingCarouselProps {
  images: ImageEntry[]
  title: string
  sold?: boolean
}

export default function PaintingCarousel({ images, title, sold }: PaintingCarouselProps) {
  const [active, setActive] = useState(0)
  const total = images.length

  const prev = () => setActive((i) => (i - 1 + total) % total)
  const next = () => setActive((i) => (i + 1) % total)

  const current = images[active]

  return (
    <div className="relative bg-white select-none">
      {/* Museum frame: generous padding creates visual breathing room around artwork */}
      <div className="p-8 lg:p-12">
        <div className="relative overflow-hidden">
          <Image
            src={current.url}
            alt={current.alt ?? `${title}${total > 1 ? ` — view ${active + 1}` : ''}`}
            width={1200}
            height={1200}
            className={`w-full h-auto object-contain transition-opacity duration-300 ${sold ? 'opacity-60' : ''}`}
            priority={active === 0}
            placeholder={current.lqip ? 'blur' : 'empty'}
            blurDataURL={current.lqip ?? undefined}
          />

          {/* Sold ribbon */}
          {sold && (
            <div className="absolute top-0 left-0 w-40 h-40 overflow-hidden pointer-events-none">
              <div
                className="absolute bg-white text-black text-center py-1.5"
                style={{
                  width: '350px',
                  top: '27px',
                  left: '-135px',
                  transform: 'rotate(-45deg)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                <span className="uppercase tracking-widest text-xs font-light">Sold</span>
              </div>
            </div>
          )}

          {/* Prev / Next arrows — only when multiple images */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dot indicators + thumbnail strip */}
      {total > 1 && (
        <div className="flex justify-center gap-3 pt-4 pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`w-12 h-12 overflow-hidden border-2 transition ${
                i === active ? 'border-gray-900' : 'border-transparent opacity-50 hover:opacity-75'
              }`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${i + 1}`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
