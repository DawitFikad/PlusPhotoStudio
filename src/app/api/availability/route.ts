import { NextRequest, NextResponse } from "next/server";
import { StudioDB } from "@/lib/booking-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required in YYYY-MM-DD format." },
      { status: 400 }
    );
  }

  // Validate format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
    return NextResponse.json(
      { error: "Invalid date format. Expected YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const result = StudioDB.checkAvailability(date);

  // Notice: We strictly DO NOT leak client names or private booking details (security requirement)
  return NextResponse.json({
    date,
    available: result.available,
    reason: result.reason || null,
    businessTimezone: "Africa/Addis_Ababa",
  });
}
