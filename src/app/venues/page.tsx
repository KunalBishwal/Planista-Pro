"use client"
import { motion } from "framer-motion"
import VenueCard from "@/components/VenueCard"

const venues = [
  {
    id: 1,
    name: "Elegant Ballroom",
    location: "Downtown",
    capacity: 300,
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Rustic Barn",
    location: "Countryside",
    capacity: 150,
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1470016342826-876ea880d0be?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Beachfront Resort",
    location: "Coastal Area",
    capacity: 200,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1578530332818-6ba472e67b9f?auto=format&fit=crop&q=80",
  },
]

export default function VenuesPage() {
  return (
    <div className="bg-[#FFE6E2] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#F28179] mb-8 text-center"
        >
          Explore Our Venues
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VenueCard venue={venue} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
