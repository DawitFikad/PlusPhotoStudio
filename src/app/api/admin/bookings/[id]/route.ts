import { NextRequest, NextResponse } from "next/server";
import { StudioDB, BookingStatus, PaymentStatus } from "@/lib/booking-store";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = StudioDB.getBookingById(id);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { status, note, adminNotes, depositAmount, paymentStatus } = body;

    const updated = StudioDB.updateBookingStatus(
      id,
      status as BookingStatus,
      note,
      adminNotes,
      depositAmount,
      paymentStatus as PaymentStatus
    );

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
