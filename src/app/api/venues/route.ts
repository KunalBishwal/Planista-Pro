// src/app/api/venues/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Prisma } from "@prisma/client"

export async function GET() {
  try {
    const venues = await prisma.venue.findMany({
      where: { availability: true },
      select: {
        venue_id: true,
        venue_name: true,
        address_line1: true,
        address_line2: true,
        city: true,
        state: true,
        zip_code: true,
        capacity: true,
        price_per_day: true,
        image: true,
      },
    })

    // No Cache-Control header, so this always fetches fresh data
    return NextResponse.json(venues, { status: 200 })
  } catch (error) {
    console.error("Error fetching venues:", error)
    return NextResponse.json(
      {
        error: "Error fetching venues",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized", details: "Admin privileges required" },
      { status: 403 }
    )
  }

  try {
    const data = await req.json()

    const requiredFields = [
      "venue_name",
      "address_line1",
      "city",
      "state",
      "zip_code",
      "capacity",
      "price_per_day",
    ]
    const missingFields = requiredFields.filter((f) => !data[f])
    if (missingFields.length) {
      return NextResponse.json(
        { error: "Missing required fields", missingFields },
        { status: 400 }
      )
    }

    if (isNaN(Number(data.capacity)) || isNaN(Number(data.price_per_day))) {
      return NextResponse.json(
        { error: "Invalid number format" },
        { status: 400 }
      )
    }

    const venue = await prisma.venue.create({
      data: {
        venue_name: data.venue_name.trim(),
        address_line1: data.address_line1.trim(),
        address_line2: data.address_line2?.trim(),
        city: data.city.trim(),
        state: data.state.trim(),
        zip_code: data.zip_code.trim(),
        capacity: Number(data.capacity),
        price_per_day: new Prisma.Decimal(
          Number(data.price_per_day).toFixed(2)
        ),
        image: data.image?.trim(),
        availability: true,
      },
    })

    return NextResponse.json(venue, { status: 201 })
  } catch (error) {
    console.error("Error creating venue:", error)
    return NextResponse.json(
      {
        error: "Error creating venue",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
