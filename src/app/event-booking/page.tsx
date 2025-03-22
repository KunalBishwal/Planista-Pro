//src/app/event-booking/page.tsx
"use client";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function EventBookingPage() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loadingVenues, setLoadingVenues] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventType: "",
    description: "",
    startDate: "",
    endDate: "",
    numGuests: "",
    venueId: "",
  });

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch("/api/venues");
        if (!response.ok) throw new Error("Failed to fetch venues");
        const data = await response.json();
        setVenues(data);
        setLoadingVenues(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setLoadingVenues(false);
      }
    }
    fetchVenues();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Handle changes for description
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewEvent({ ...newEvent, description: e.target.value });
  };

  const handleVenueSelect = (value: string) => {
    setNewEvent({ ...newEvent, venueId: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newEvent.eventName || !newEvent.startDate || !newEvent.endDate || !newEvent.venueId || !newEvent.numGuests) {
      alert("Please fill in all required fields.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (newEvent.startDate < today) {
      alert("Start date cannot be in the past!");
      return;
    }

    if (newEvent.endDate < newEvent.startDate) {
      alert("End date cannot be before the start date!");
      return;
    }

    try {
      const res = await fetch("/api/event-bookings", {
        method: "POST",
        body: JSON.stringify({
          title: newEvent.eventName,
          eventType: newEvent.eventType,
          description: newEvent.description,
          startDate: newEvent.startDate,
          endDate: newEvent.endDate,
          numGuests: parseInt(newEvent.numGuests, 10),
          venueId: newEvent.venueId,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Failed to add event booking");

      setSuccessMessage("Event booked successfully! ✅");

      setNewEvent({
        eventName: "",
        eventType: "",
        description: "",
        startDate: "",
        endDate: "",
        numGuests: "",
        venueId: "",
      });

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error occurred");
    }
  };

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

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto bg-green-500 text-white text-center py-2 rounded-md mb-6"
          >
            {successMessage}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto shadow-lg bg-[#FFD1CC] rounded-xl border border-[#F9B4AB]">
            <CardHeader>
              <CardTitle className="text-[#8A2D2B]">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventName" className="text-[#8A2D2B] font-medium">
                  Event Name *
                </Label>
                <Input
                  id="eventName"
                  name="eventName"
                  placeholder="Enter event name"
                  value={newEvent.eventName}
                  onChange={handleInputChange}
                  className="border-[#C0403E] bg-white text-[#8A2D2B] placeholder-gray-500 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventType" className="text-[#8A2D2B] font-medium">
                  Event Type
                </Label>
                <Input
                  id="eventType"
                  name="eventType"
                  placeholder="e.g., Wedding, Corporate"
                  value={newEvent.eventType}
                  onChange={handleInputChange}
                  className="border-[#C0403E] bg-white text-[#8A2D2B] placeholder-gray-500 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#8A2D2B] font-medium">
                  Description
                </Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter event description"
                  value={newEvent.description}
                  onChange={handleDescriptionChange}
                  className="w-full border-[#C0403E] bg-white text-[#8A2D2B] placeholder-gray-500 shadow-sm p-2 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-[#8A2D2B] font-medium">
                    Start Date & Time *
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={newEvent.startDate}
                    onChange={handleInputChange}
                    className="border-[#C0403E] bg-white text-[#8A2D2B] shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-[#8A2D2B] font-medium">
                    End Date & Time *
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={newEvent.endDate}
                    min={newEvent.startDate || undefined}
                    onChange={handleInputChange}
                    className="border-[#C0403E] bg-white text-[#8A2D2B] shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numGuests" className="text-[#8A2D2B] font-medium">
                  Number of Guests *
                </Label>
                <Input
                  id="numGuests"
                  name="numGuests"
                  type="number"
                  placeholder="Enter number of guests"
                  value={newEvent.numGuests}
                  onChange={handleInputChange}
                  className="border-[#C0403E] bg-white text-[#8A2D2B] placeholder-gray-500 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue" className="text-[#8A2D2B] font-medium">
                  Select Venue *
                </Label>
                {loadingVenues ? (
                  <p className="text-sm text-[#8A2D2B]">Loading venues...</p>
                ) : (
                  <>
                    <Select onValueChange={handleVenueSelect}>
                      <SelectTrigger id="venue" className="border-[#C0403E] bg-white text-[#8A2D2B] shadow-sm">
                        <SelectValue placeholder="Choose a venue" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-[#8A2D2B]">
                        {venues.map((venue) => (
                          <SelectItem key={venue.venue_id} value={venue.venue_id}>
                            {venue.venue_name} - {venue.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-2">
                      <Link href="/venues" className="text-sm text-[#C0403E] hover:underline">
                        View all venues
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                className="w-full bg-[#C0403E] hover:bg-[#a23330] transition-all shadow-md text-white"
              >
                Book Event
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
