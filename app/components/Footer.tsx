'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-light gap-8 md:gap-0">
          {/* Left: Copyright */}
          <div className="order-3 md:order-1 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Citlali Bonilla Andersen</p>
            <p>All rights reserved.</p>
          </div>

          {/* Center: Instagram */}
          <a
            href="https://instagram.com/citlali.bonillaa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition flex-shrink-0 order-1 md:order-2"
            aria-label="Instagram"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37 Z" />
              <circle cx="17.5" cy="6.5" r="1.5" />
            </svg>
          </a>

          {/* Right: Location */}
          <div className="text-center md:text-right order-2 md:order-3">
            <p className="text-black font-normal mb-1">Bruglii Studio</p>
            <p>Copenhagen, Denmark / Mexico City, Mexico</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
