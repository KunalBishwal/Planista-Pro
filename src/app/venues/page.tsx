// /src/app/venues/page.tsx
"use client"
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { motion } from "framer-motion"
import VenueCard from "@/components/VenueCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VenuesPage() {
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const [newVenue, setNewVenue] = useState({
    venue_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
    capacity: "",
    price_per_day: "",
    image: "",
  })

  // Success‐added modal
  const [showSuccess, setShowSuccess] = useState(false)

  // Check admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const session = await res.json()
        setIsAdmin(session?.user?.role === "admin")
      } catch {
        console.error("Error checking admin status")
      }
    }
    checkAdminStatus()
  }, [])

  // Fetch venues
  const fetchVenues = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/venues")
      if (!res.ok) throw new Error(`Error! status: ${res.status}`)
      const data = await res.json()
      setVenues(data)
    } catch (error) {
      console.error("Error fetching venues:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchVenues() }, [])

  // Delete handler
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/venues/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete venue")
      setVenues((prev) => prev.filter((v) => v.venue_id !== id))
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error")
    }
  }

  // Form handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewVenue({ ...newVenue, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/venues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVenue),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to add venue")

      // Show themed success popup instead of alert()
      setShowSuccess(true)

      // Reset form + reload list
      setNewVenue({
        venue_name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip_code: "",
        capacity: "",
        price_per_day: "",
        image: "",
      })
      fetchVenues()
      setShowForm(false)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error occurred")
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#FFE6E2] to-[#FFF0ED] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#F28179] mb-8 text-center"
        >
          Explore Our Venues
        </motion.h1>

        {isAdmin && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#F28179] text-white hover:bg-[#D0584E] transition-colors duration-300 my-5"
            >
              {showForm ? "Hide Form" : "Add New Venue"}
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F28179]" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue, idx) => (
              <motion.div
                key={venue.venue_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <VenueCard
                  venue={venue}
                  isAdmin={isAdmin}
                  onDelete={() => handleDelete(venue.venue_id)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {isAdmin && showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-white shadow-lg border-2 border-[#F9B4AB]">
              <CardHeader className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white">
                <CardTitle className="text-2xl">Add New Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="venue_name" className="text-[#B8473F]">
                        Venue Name *
                      </Label>
                      <Input
                        type="text"
                        name="venue_name"
                        value={newVenue.venue_name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address_line1" className="text-[#B8473F]">
                        Address Line 1 *
                      </Label>
                      <Input
                        type="text"
                        name="address_line1"
                        value={newVenue.address_line1}
                        onChange={handleInputChange}
                        required
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address_line2" className="text-[#B8473F]">
                        Address Line 2
                      </Label>
                      <Input
                        type="text"
                        name="address_line2"
                        value={newVenue.address_line2}
                        onChange={handleInputChange}
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-[#B8473F]">
                        City *
                      </Label>
                      <Input
                        type="text"
                        name="city"
                        value={newVenue.city}
                        onChange={handleInputChange}
                        required
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-[#B8473F]">
                        State *
                      </Label>
                      <Input
                        type="text"
                        name="state"
                        value={newVenue.state}
                        onChange={handleInputChange}
                        required
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip_code" className="text-[#B8473F]">
                        Zip Code *
                      </Label>
                      <Input
                        type="text"
                        name="zip_code"
                        value={newVenue.zip_code}
                        onChange={handleInputChange}
                        required
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity" className="text-[#B8473F]">
                        Capacity *
                      </Label>
                      <Input
                        type="number"
                        name="capacity"
                        value={newVenue.capacity}
                        onChange={handleInputChange}
                        required
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price_per_day" className="text-[#B8473F]">
                        Price Per Day *
                      </Label>
                      <Input
                        type="number"
                        name="price_per_day"
                        step="0.01"
                        value={newVenue.price_per_day}
                        onChange={handleInputChange}
                        required
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="image" className="text-[#B8473F]">
                        Image URL
                      </Label>
                      <Input
                        type="text"
                        name="image"
                        value={newVenue.image}
                        onChange={handleInputChange}
                        className="mt-1 text-[#B8473F]"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white hover:from-[#F28179] hover:to-[#F9B4AB] transition-all duration-300"
                  >
                    Add Venue
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* THEMED SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg overflow-hidden bg-white shadow-lg">
            {/* header */}
            <div className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] px-4 py-3">
              <h3 className="text-lg font-semibold text-white">Venue Added</h3>
            </div>
            {/* body */}
            <div className="p-4 text-gray-800">
              <p>Your new venue has been added successfully.</p>
            </div>
            {/* footer */}
            <div className="flex justify-end px-4 py-3">
              <Button
                onClick={() => setShowSuccess(false)}
                className="bg-[#F28179] text-white hover:bg-[#D0584E]"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
