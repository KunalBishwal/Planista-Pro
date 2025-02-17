"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

const recentBookings = [
  { id: 1, event: "Summer Gala", date: "2023-07-15", status: "Confirmed" },
  { id: 2, event: "Tech Conference", date: "2023-08-22", status: "Pending" },
  { id: 3, event: "Wedding Reception", date: "2023-09-05", status: "Confirmed" },
  { id: 4, event: "Corporate Retreat", date: "2023-10-10", status: "Cancelled" },
]

export default function AdminPage() {
  return (
    <div className="bg-[#FFE6E2] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#C0403E] mb-8 text-center"
        >
          Admin Dashboard
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Bookings Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white border border-[#F9B4AB] shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#8A2D2B]">Recent Bookings</CardTitle>
                <CardDescription className="text-[#aa3530]">
                  Overview of the latest event bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#8A2D2B]">Event</TableHead>
                      <TableHead className="text-[#8A2D2B]">Date</TableHead>
                      <TableHead className="text-[#8A2D2B]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="text-[#8A2D2B]">{booking.event}</TableCell>
                        <TableCell className="text-[#8A2D2B]">{booking.date}</TableCell>
                        <TableCell className="text-[#8A2D2B]">{booking.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
      
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white border border-[#F9B4AB] shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#8A2D2B]">Quick Actions</CardTitle>
                <CardDescription className="text-[#aa3530]">
                  Manage your events and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-[#dc5654] hover:bg-[#a23330] transition-all shadow-md text-white">
                <Link href="/event-booking">
                  Create New Event
                </Link>
                </Button>
                <Button className="w-full bg-[#dc5654] hover:bg-[#a23330] transition-all shadow-md text-white" variant="outline">
                  <Link href="/venues">
                  Manage Venues
                  </Link>
                </Button>

                <Button className="w-full bg-[#dc5654] hover:bg-[#a23330] transition-all shadow-md text-white" variant="outline">
                <Link href="/staff">
                  Manage Staff
                  </Link>
                </Button>

                <Button className="w-full bg-[#dc5654] hover:bg-[#a23330] transition-all shadow-md text-white" variant="outline">
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
