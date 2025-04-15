"use client";
import HeroSection from "@/components/HeroSection";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BookedEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  venue?: {
    venue_name: string;
    city: string;
    state: string;
    image?: string;
  };
}

export default function Page() {
  const { data: events, isLoading, error } = useQuery<BookedEvent[]>({
    queryKey: ["event-bookings"],
    queryFn: async () => {
      const res = await fetch("/api/event-bookings");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
    refetchInterval: 30000,
  });

  // Add empty state
  if (!isLoading && !error && events?.length === 0) {
    return (
      <div className="bg-[#FFE6E2]">
        <HeroSection />
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#F28179] mb-4">
              No Upcoming Events
            </h2>
            <Link href="/event-booking">
              <Button className="bg-[#F28179] hover:bg-[#D0584E]">
                Book Your First Event
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
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
            <h2 className="text-3xl font-bold text-[#F28179]">Upcoming Events</h2>
            <p className="text-[#B8473F] mt-2">
              Check out our upcoming events
            </p>
          </motion.div>
          {isLoading ? (
            <p className="text-center text-[#B8473F]">Loading events...</p>
          ) : error ? (
            <p className="text-center text-red-500">
              Error fetching events. Please try again.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {events?.map((event: BookedEvent, index: number) => {
                const startDate = new Date(event.startDate);
                const formattedDate = startDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const formattedTime = startDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                });

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/event-booking/${event.id}`}>
                      <Card className="h-full overflow-hidden rounded-xl shadow-xl transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 bg-white">
                        {event.venue?.image ? (
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={event.venue.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-[#F28179] truncate">
                            {event.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-[#B8473F]">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-[#F28179]" />
                              <span>
                                {formattedDate} • {formattedTime}
                              </span>
                            </div>
                            {event.venue && (
                              <p className="truncate text-[#D0584E]">
                                {event.venue.venue_name} - {event.venue.city}, {event.venue.state}
                              </p>
                            )}
                            <p className="line-clamp-2 text-[#D0584E]">
                              {event.description || "No description available"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
