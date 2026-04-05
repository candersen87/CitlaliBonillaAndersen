'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/commissions', label: 'Commissions' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop nav row */}
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo3.png"
              alt="Citlali Bonilla Andersen"
              width={1800}
              height={500}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop links — hidden on mobile */}
          <ul className="hidden md:flex gap-8 text-sm font-light text-black">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-link text-black ${isActive(href) ? 'border-b-2 border-black' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger — visible on mobile only */}
          <button
            className="md:hidden text-gray-600 hover:text-black focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <ul className="flex flex-col gap-4 text-sm font-light text-black">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block nav-link text-black ${isActive(href) ? 'border-b-2 border-black' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
