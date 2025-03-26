// src/app/api/event-bookings/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const upcomingEvents = await prisma.eventBooking.findMany({
      where: {
        startDate: { gt: new Date() },
        status: {
          in: ["confirmed", "pending"] // Include both statuses
        }
      },
      orderBy: { startDate: "asc" },
      include: {
        venue: true
      }
    });
    return new Response(JSON.stringify(upcomingEvents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching event bookings:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch event bookings" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response(
      JSON.stringify({ error: "Unauthorized", details: "Login required" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  
  try {
    const body = await request.json();
    const newEventBooking = await prisma.eventBooking.create({
      data: {
        title: body.title,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        status: body.status || "pending",
        userId: session.user.id,
        venueId: body.venueId,
      },
    });
    return new Response(JSON.stringify(newEventBooking), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating event booking:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create event booking",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
