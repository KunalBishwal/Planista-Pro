"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const staffMembers = [
  { id: 1, name: "Alice Johnson", role: "Event Coordinator", image: "https://i.pravatar.cc/150?img=1", gender: "female" },
  { id: 2, name: "Bob Smith", role: "Venue Manager", image: "https://i.pravatar.cc/150?img=11", gender: "male" },
  { id: 3, name: "Carol Williams", role: "Catering Specialist", image: "https://i.pravatar.cc/150?img=23", gender: "female" },
  { id: 4, name: "David Brown", role: "Technical Support", image: "https://i.pravatar.cc/150?img=14", gender: "male" },
  { id: 5, name: "Eva Martinez", role: "Decor Specialist", image: "https://i.pravatar.cc/150?img=5", gender: "female" },
  { id: 6, name: "Frank Lee", role: "Security Manager", image: "https://i.pravatar.cc/150?img=18", gender: "male" },
]

export default function StaffPage() {
  return (
    <div className="bg-[#FFE6E2] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#F28179] mb-8 text-center"
        >
          Our Staff
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staffMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage
                      src={
                        member.image ||
                        (member.gender === "female"
                          ? "/default-female.svg"
                          : "/default-male.svg")
                      }
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-[#F28179]">{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-[#B8473F]">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
