"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Venue {
  id: string;
  name: string;
  location: {
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    zip_code: string;
  };
  capacity: number;
  price: number;
  image: string;
}

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  // Compose a full address string from the composite location fields.
  const fullAddress = `${venue.location.address_line1}${venue.location.address_line2 ? ", " + venue.location.address_line2 : ""}, ${venue.location.city}, ${venue.location.state} ${venue.location.zip_code}`;

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="cursor-pointer">
      <Card className="overflow-hidden shadow-xl">
        <div className="aspect-video relative overflow-hidden">
          <motion.img
            src={venue.image || "/placeholder.svg"}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-[#bd5851]">{venue.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#bd5851]">
            {fullAddress} • {venue.capacity} guests
          </p>
          <p className="text-[#bd5851] font-semibold mt-2">${venue.price}/day</p>
          <div className="mt-4 flex space-x-4">
            <Button
              asChild
              className="bg-[#F28179] text-white shadow-md hover:bg-[#f8a9a3] hover:shadow-lg transition-all duration-300 rounded-full"
            >
              <Link href={`/venues/${venue.id}`}>View Details</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white text-[#F28179] hover:bg-[#F9B4AB] px-4 py-2 hover:text-white transition-all duration-300"
            >
              <Link href="/checkout">Book Now</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
