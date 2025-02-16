"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop')]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent backdrop-blur-sm" />

      {/* Content Container */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-5xl font-bold mb-6">Create Unforgettable Events with Us</h1>
          <p className="text-xl opacity-90 mb-8">
            Discover beautiful venues, professional staff, and everything you need to make your event extraordinary.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white hover:opacity-90"
              asChild
            >
              <Link href="/venues" className="flex items-center">
                Browse Venues
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white hover:opacity-90"
              asChild
            >
              <Link href="/about">
                About Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

