"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentBookings = [
  { id: 1, event: "Summer Gala", date: "2023-07-15", status: "Confirmed" },
  { id: 2, event: "Tech Conference", date: "2023-08-22", status: "Pending" },
  { id: 3, event: "Wedding Reception", date: "2023-09-05", status: "Confirmed" },
  { id: 4, event: "Corporate Retreat", date: "2023-10-10", status: "Cancelled" },
]

export default function AdminPage() {
  return (
    <div className="bg-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-blue-600 mb-8 text-center"
        >
          Admin Dashboard
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Overview of the latest event bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.event}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.status}</TableCell>
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
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your events and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Create New Event</Button>
                <Button className="w-full" variant="outline">
                  Manage Venues
                </Button>
                <Button className="w-full" variant="outline">
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

