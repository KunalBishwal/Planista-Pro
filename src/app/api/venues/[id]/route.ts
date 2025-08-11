import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Only admins can delete
  const session = await getServerSession(authOptions)
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized", details: "Admin privileges required" },
      { status: 403 }
    )
  }

  try {
    await prisma.venue.delete({
      where: { venue_id: params.id },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting venue:", error)
    return NextResponse.json(
      {
        error: "Error deleting venue",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
