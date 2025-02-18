"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [username, setUsername] = useState(session?.user?.name || "")
  const [profilePic, setProfilePic] = useState(session?.user?.image || "")

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    // Save the updated profile data (e.g., call API to update the profile)
  }

  return (
    <div className="min-h-screen bg-[#FFE6E2] py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#F28179]">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={profilePic || "/default-profile.jpg"}
                    alt="Profile Picture"
                    className="w-32 h-32 object-cover rounded-full border-4 border-[#F9B4AB]"
                  />
                  <Label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-[#F28179] text-white p-2 rounded-full cursor-pointer hover:bg-[#F9B4AB] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username-input" className="text-[#bd3b32]">
                  Username
                </Label>
                <Input
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="border-[#F9B4AB] focus:ring-[#F28179] focus:border-[#F28179] text-[#df5950]"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                className="w-full bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white hover:opacity-90"
              >
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

