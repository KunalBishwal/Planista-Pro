import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET: Fetch all venues
export async function GET() {
  try {
    const venues = await prisma.venue.findMany();
    return new Response(JSON.stringify(venues), { status: 200 });
  } catch (error) {
    console.error("Error fetching venues:", error);
    return new Response(JSON.stringify({ 
      error: "Error fetching venues",
      details: error instanceof Error ? error.message : "Unknown error"
    }), { status: 500 });
  }
}

// POST: Insert a new venue
export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.venue_name || !data.address_line1 || !data.city || !data.state || !data.zip_code) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const venue = await prisma.venue.create({
      data: {
        venue_name: data.venue_name,
        address_line1: data.address_line1,
        address_line2: data.address_line2 || null,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        capacity: parseInt(data.capacity, 10),
        price_per_day: new Prisma.Decimal(data.price_per_day),
        image: data.image || null,
        availability: true,
      },
    });
    return new Response(JSON.stringify(venue), { status: 201 });
  } catch (error) {
    console.error("Error creating venue:", error);
    return new Response(JSON.stringify({ 
      error: "Error creating venue",
      details: error instanceof Error ? error.message : "Unknown error"
    }), { status: 500 });
  }
}