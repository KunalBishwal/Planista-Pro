"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChevronRight, Calendar, MapPin, Users, BarChart2 } from "lucide-react"

const recentBookings = [
  { id: 1, event: "Summer Gala", date: "2023-07-15", status: "Confirmed" },
  { id: 2, event: "Tech Conference", date: "2023-08-22", status: "Pending" },
  { id: 3, event: "Wedding Reception", date: "2023-09-05", status: "Confirmed" },
  { id: 4, event: "Corporate Retreat", date: "2023-10-10", status: "Cancelled" },
]

const statusColors = {
  Confirmed: "text-green-600",
  Pending: "text-yellow-600",
  Cancelled: "text-red-600",
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") return <LoadingSpinner />

  if (!session || !session.user.isAdmin) {
    router.push("/")
    return null
  }

  return (
    <div className="bg-gradient-to-br from-[#FFE6E2] to-[#FFF0ED] min-h-screen py-12">
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white border-2 border-[#F9B4AB] shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white">
                <CardTitle className="text-2xl">Recent Bookings</CardTitle>
                <CardDescription className="text-pink-100">Overview of the latest event bookings</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50">
                      <TableHead className="text-[#8A2D2B]">Event</TableHead>
                      <TableHead className="text-[#8A2D2B]">Date</TableHead>
                      <TableHead className="text-[#8A2D2B]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-pink-50 transition-colors">
                        <TableCell className="text-[#8A2D2B] font-medium">{booking.event}</TableCell>
                        <TableCell className="text-[#8A2D2B]">{booking.date}</TableCell>
                        <TableCell className={`font-medium ${statusColors[booking.status as keyof typeof statusColors]}`}>
                          {booking.status}
                        </TableCell>
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
            <Card className="bg-white border-2 border-[#F9B4AB] shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white ">
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
                <CardDescription className="text-pink-100">Manage your events and settings</CardDescription>
              </CardHeader>
              <CardContent className="p-6 my-2">
                <div className="space-y-8">
                <QuickActionButton className="mb-6" href="/event-booking" icon={<Calendar />} text="Create New Event" />
                <QuickActionButton className="mb-6" href="/venues" icon={<MapPin />} text="Manage Venues" />
                <QuickActionButton className="mb-6" href="/staff" icon={<Users />} text="Manage Staff" />
                <QuickActionButton className="mb-6" href="#" icon={<BarChart2 />} text="View Reports" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

interface QuickActionButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  className?: string;
}
function QuickActionButton({ className, href, icon, text }: QuickActionButtonProps) {
  return (
    <Link href={href}>
      <Button className={`w-full bg-gradient-to-r from-[#F9B4AB] to-[#F28179] hover:from-[#F28179] hover:to-[#F9B4AB] transition-all shadow-md text-white text-left flex items-center justify-between group ${className ? className : ""}`}>
        <span className="flex items-center">
          {icon}
          <span className="ml-2">{text}</span>
        </span>
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  )
}


function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFE6E2]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F28179]"></div>
    </div>
  )
}

