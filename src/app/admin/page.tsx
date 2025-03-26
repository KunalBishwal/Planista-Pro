//src\app\admin\page.tsx
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChevronRight, Calendar, MapPin, Users, BarChart2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

interface BookedEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  venue?: {
    venue_name: string;
    city: string;
    state: string;
    image?: string;
  };
}

const statusColors = {
  Confirmed: "text-green-600",
  Pending: "text-yellow-600",
  Cancelled: "text-red-600",
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  
  const { data: events, isLoading, error } = useQuery<BookedEvent[]>({
    queryKey: ["event-bookings"],
    queryFn: async () => {
      const res = await fetch("/api/event-bookings");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
    refetchInterval: 30000,
  });

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
                    <TableRow className="bg-gray-100">
                      <TableHead className="text-gray-900 font-semibold">Event</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Date</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events?.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="text-gray-800 font-medium">{booking.title}</TableCell>
                        <TableCell className="text-gray-800">{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {booking.status}
                          </span>
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
      <Button className={`w-full bg-gradient-to-r from-[#F9B4AB] to-[#F28179] hover:from-[#F28179] hover:to-[#F9B4AB] transition-all shadow-md text-white text-left flex items-center justify-between group ${className || ""}`}>
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

