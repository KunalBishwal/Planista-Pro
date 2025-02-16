"use client"
import HeroSection from "@/components/HeroSection"
import { motion } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Calendar } from "lucide-react"

// Dummy featured events data
const featuredEvents = [
  {
    id: 1,
    title: "Summer Gala",
    coverImage:
      "https://images.unsplash.com/photo-1560189236-71c235494695?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Join us for an unforgettable summer gala event.",
    startDate: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Tech Conference",
    coverImage:
      "https://images.unsplash.com/photo-1700936655679-83f4b37d7d74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Explore the latest in tech innovations.",
    startDate: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Art Expo",
    coverImage:
      "https://images.unsplash.com/photo-1559813114-cda845612ae7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Experience modern art like never before.",
    startDate: new Date().toISOString(),
  },
]

export default function Page() {
  return (
    // Changed from bg-blue-100 to a light coral/pink background
    <div className="bg-[#FFE6E2]">
      <HeroSection />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {/* Changed text color from text-blue-600 to text-[#F28179] */}
            <h2 className="text-3xl font-bold text-[#F28179]">Featured Events</h2>
            {/* Changed text-blue-800 to a darker coral shade */}
            <p className="text-[#B8473F] mt-2">Check out our upcoming events</p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Updated shadow color to match pink/coral theme */}
                <Card className="overflow-hidden rounded-xl shadow-xl shadow-[#F9B4AB] transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-white">
                  {event.coverImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={event.coverImage || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-[#F28179]">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-[#B8473F]">
                      <div className="flex items-center gap-2">
                        {/* Updated icon color */}
                        <Calendar className="h-4 w-4 text-[#F28179]" />
                        {new Date(event.startDate).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      {/* Updated text color */}
                      <CardDescription className="line-clamp-2 text-[#D0584E]">
                        {event.description}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
