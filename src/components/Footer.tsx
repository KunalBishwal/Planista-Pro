import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Planista-Pro</h3>
            <p className="text-sm opacity-80">Your ultimate event management solution</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/venues" className="text-sm hover:underline">
                  Venues
                </Link>
              </li>
              <li>
                <Link href="/event-booking" className="text-sm hover:underline">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/staff" className="text-sm hover:underline">
                  Staff
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={24} aria-hidden="true" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80" aria-label="Visit our X page">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80" aria-label="Visit our Instagram page">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Planista-Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

