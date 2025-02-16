"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Calendar, Star, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    // Changed from bg-blue-100 to a light pinkish shade
    <div className="min-h-screen bg-[#FFE6E2]">
      <section className="relative h-[400px] overflow-hidden">
        {/* Background image and overlay gradient changed from blue to coral/pink */}
        <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2070&auto=format&fit=crop')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F28179]/30 to-[#F9B4AB]/20" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl font-bold mb-6">About Planista Pro</h1>
            <p className="text-xl opacity-90">
              Transforming event planning through innovation and expertise
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-3"
          >
            <AboutCard
              title="Our Mission"
              icon={<Star className="h-5 w-5 text-[#F28179]" />}
              image="https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2015&auto=format&fit=crop"
              description="To revolutionize event planning by providing an all-in-one platform that simplifies organization while maintaining professional standards."
              stats={["5000+ Successful Events", "98% Customer Satisfaction"]}
            />
            <AboutCard
              title="Our Values"
              icon={<Users className="h-5 w-5 text-[#F28179]" />}
              image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              description="Committed to innovation, transparency, and exceptional service in every aspect of event management."
              stats={["24/7 Support Team", "Eco-friendly Initiatives"]}
            />
            <AboutCard
              title="Our Team"
              icon={<Calendar className="h-5 w-5 text-[#F28179]" />}
              image="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
              description="A dedicated team of event professionals with combined experience of over 50 years in the industry."
              stats={["100+ Certified Professionals", "Global Network"]}
            />
          </motion.div>
        </div>
      </section>

      {/* Changed from bg-blue-500 to a deeper coral/pink tone */}
      <section className="py-20 bg-[#F28179]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Create Magic?
            </h2>
            <p className="text-pink-50 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who've transformed their event
              planning experience with our platform.
            </p>
            <Button size="lg" variant="secondary">
              <Link href="/auth" className="flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

interface AboutCardProps {
  title: string
  icon: React.ReactNode
  image: string
  description: string
  stats: string[]
}

function AboutCard({ title, icon, image, description, stats }: AboutCardProps) {
  return (
    <Card className="overflow-hidden shadow-[#F9B4AB] shadow-xl hover:shadow-2xl transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        {/* text-[#F28179] used for headings */}
        <CardTitle className="text-xl flex items-center gap-2 text-[#F28179]">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[#B8473F]">{description}</p>
        <ul className="mt-4 space-y-2 text-sm text-[#D0584E]">
          {stats.map((stat, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#F28179] rounded-full" />
              {stat}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
