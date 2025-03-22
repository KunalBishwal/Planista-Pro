// src\app\api\venues\route.ts
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Prisma } from '@prisma/client'

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
        image: true
      }
    })

    return new Response(JSON.stringify(venues), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error fetching venues:', error)
    return new Response(
      JSON.stringify({
        error: 'Error fetching venues',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.role || session.user.role !== 'admin') {
    return new Response(
      JSON.stringify({ error: 'Unauthorized', details: 'Admin privileges required' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const data = await req.json()
    
    const requiredFields = [
      'venue_name', 'address_line1', 'city', 'state', 'zip_code',
      'capacity', 'price_per_day'
    ]
    
    const missingFields = requiredFields.filter(field => !data[field])
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields', missingFields }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (isNaN(Number(data.capacity)) || isNaN(Number(data.price_per_day))) {
      return new Response(
        JSON.stringify({ error: 'Invalid number format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
        price_per_day: new Prisma.Decimal(Number(data.price_per_day).toFixed(2)),
        image: data.image?.trim(),
        availability: true
      }
    })

    return new Response(JSON.stringify(venue), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error creating venue:', error)
    return new Response(
      JSON.stringify({
        error: 'Error creating venue',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}