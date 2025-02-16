import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    // Warm gradient background for the navbar
    <nav className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand name in white for contrast */}
        <Link href="/" className="text-2xl font-bold text-white">
          Planista-Pro
        </Link>

        <div className="space-x-1 sm:space-x-2">
          {/* Ghost buttons: white text, subtle hover background */}
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/">Home</Link>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/venues">Venues</Link>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/event-booking">Events</Link>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/staff">Staff</Link>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/about">About</Link>
          </Button>

          {/* Default button: white background, coral text, transitions on hover */}
          <Button
            variant="default"
            className="bg-white text-[#F28179] hover:bg-[#F9B4AB] hover:text-white rounded-full px-4 py-2"
            asChild
          >
            <Link href="/checkout">Checkout</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
