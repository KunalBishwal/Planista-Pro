"use client";
import { motion } from 'framer-motion';

const featuredEvents = [
  { id: 1, title: "Summer Gala", image: "/events/event1.jpg" },
  { id: 2, title: "Tech Conference", image: "/events/event2.jpg" },
  // Add more events as needed
];

export default function Carousel() {
  return (
    <div className="overflow-x-auto py-8">
      <div className="flex space-x-6">
        {featuredEvents.map((event) => (
          <motion.div
            key={event.id}
            className="min-w-[300px] bg-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{event.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
