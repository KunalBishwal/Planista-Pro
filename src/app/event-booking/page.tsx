"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventBookingPage() {
  return (
    <div className="bg-[#FFE6E2] min-h-screen py-12 flex items-center">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#C0403E] mb-8 text-center"
        >
          Book Your Event
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto shadow-lg bg-[#FFD1CC] rounded-xl border border-[#F9B4AB]">
            <CardHeader>
              <CardTitle className="text-[#8A2D2B]">Event Details</CardTitle>
              <CardDescription className="text-[#5C1E1C]">
                Fill in the details for your event booking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-name" className="text-[#8A2D2B] font-medium">Event Name</Label>
                <Input 
                  id="event-name" 
                  placeholder="Enter event name" 
                  className="border-[#C0403E] bg-white text-[#8A2D2B] placeholder-gray-500 shadow-sm" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type" className="text-[#8A2D2B] font-medium">Event Type</Label>
                <Select>
                  <SelectTrigger 
                    id="event-type" 
                    className="border-[#C0403E] bg-white text-[#8A2D2B] shadow-sm"
                  >
                    <SelectValue placeholder="Select event type" className="placeholder-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-[#8A2D2B]">
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="birthday">Birthday Party</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-date" className="text-[#8A2D2B] font-medium">Event Date</Label>
                <Input 
                  id="event-date" 
                  type="date" 
                  className="border-[#C0403E] bg-white text-[#8A2D2B] shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="num-guests" className="text-[#8A2D2B] font-medium">Number of Guests</Label>
                <Input 
                  id="num-guests" 
                  type="number" 
                  placeholder="Enter number of guests" 
                  className="border-[#C0403E] bg-white text-[#8A2D2B] placeholder-gray-500 shadow-sm"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#C0403E] hover:bg-[#a23330] transition-all shadow-md text-white">
                Book Event
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
