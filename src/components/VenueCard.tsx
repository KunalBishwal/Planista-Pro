"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Venue {
  venue_id: string;
  venue_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  capacity: number;
  price_per_day: number;
  image?: string;
  availability: boolean;
}

interface VenueCardProps {
  venue: Venue;
  isAdmin?: boolean;
  onDelete?: () => void;
}

export default function VenueCard({
  venue,
  isAdmin = false,
  onDelete,
}: VenueCardProps) {
  const fullAddress = `${venue.address_line1}${venue.address_line2 ? ", " + venue.address_line2 : ""
    }, ${venue.city}, ${venue.state} ${venue.zip_code}`;

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden shadow-xl">
        <div className="aspect-video relative overflow-hidden">
          <motion.img
            src={venue.image || "/placeholder.svg"}
            alt={venue.venue_name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-[#bd5851]">
            {venue.venue_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#bd5851]">
            {fullAddress} • {venue.capacity} guests
          </p>
          <p className="text-[#bd5851] font-semibold mt-2">
            ${venue.price_per_day}/day
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              asChild
              className="bg-[#F28179] text-white shadow-md hover:bg-[#f8a9a3] hover:shadow-lg transition duration-300"
            >
              <Link href={`/venues/${venue.venue_id}`}>View Details</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white text-[#F28179] hover:bg-[#F9B4AB] hover:text-white transition duration-300"
            >
              <Link href="/checkout">Book Now</Link>
            </Button>

            {isAdmin && onDelete && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    variant="outline"
                    className="bg-white text-[#F28179] hover:bg-[#F9B4AB] hover:text-white transition duration-300"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white">
                    <AlertDialogTitle>Delete Venue?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deleting <strong>{venue.venue_name}</strong> is{" "}
                      <span className="font-semibold">permanent</span> and cannot be
                      undone. Are you sure you want to continue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete()}
                      className="bg-[#F28179] text-white hover:bg-[#D0584E] transition-colors"
                    >
                      Confirm Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
