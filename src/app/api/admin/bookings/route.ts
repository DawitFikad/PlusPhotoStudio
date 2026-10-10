import { NextRequest, NextResponse } from "next/server";
import { StudioDB, BookingStatus } from "@/lib/booking-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as BookingStatus | null;
  const search = searchParams.get("search")?.toLowerCase();

  let bookings = StudioDB.getAllBookings();

  if (status) {
    bookings = bookings.filter((b) => b.status === status);
  }

  if (search) {
    bookings = bookings.filter(
      (b) =>
        b.customerName.toLowerCase().includes(search) ||
        b.referenceNumber.toLowerCase().includes(search) ||
        b.customerEmail.toLowerCase().includes(search) ||
        b.location.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ bookings });
}
