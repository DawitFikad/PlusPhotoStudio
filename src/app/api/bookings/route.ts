import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { StudioDB } from "@/lib/booking-store";
import { sendWeb3BookingNotification } from "@/lib/web3forms";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  customerEmail: z.string().email("Invalid email address."),
  customerPhone: z.string().min(8, "Phone number is required."),
  serviceId: z.string().min(1, "Service selection is required."),
  serviceName: z.string().min(1, "Service name is required."),
  packageName: z.string().min(1, "Package selection is required."),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD."),
  preferredStartTime: z.string().default("10:00 AM"),
  estimatedDuration: z.string().default("Full Day"),
  location: z.string().min(2, "Location or venue is required."),
  coverageDetails: z.string().optional(),
  specialNotes: z.string().optional(),
  contactPreference: z.enum(["phone", "whatsapp", "email"]).default("phone"),
  totalAmount: z.number().nonnegative("Total amount must be non-negative."),
  consentPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to submit a booking.",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = bookingSchema.parse(body);

    // Server-side availability validation to prevent race conditions & double-booking
    const availability = StudioDB.checkAvailability(validated.eventDate);
    if (!availability.available) {
      return NextResponse.json(
        {
          error:
            availability.reason ||
            "Selected date is not available. Please choose another date.",
        },
        { status: 409 }
      );
    }

    const newBooking = StudioDB.createBooking({
      customerName: validated.customerName,
      customerEmail: validated.customerEmail,
      customerPhone: validated.customerPhone,
      serviceId: validated.serviceId,
      serviceName: validated.serviceName,
      packageName: validated.packageName,
      eventDate: validated.eventDate,
      preferredStartTime: validated.preferredStartTime,
      estimatedDuration: validated.estimatedDuration,
      location: validated.location,
      coverageDetails: validated.coverageDetails,
      specialNotes: validated.specialNotes,
      contactPreference: validated.contactPreference,
      totalAmount: validated.totalAmount,
      depositAmount: 0,
      currency: "ETB",
    });

    // Forward booking details to Web3Forms for immediate email dispatch
    try {
      await sendWeb3BookingNotification({
        referenceNumber: newBooking.referenceNumber,
        customerName: newBooking.customerName,
        customerEmail: newBooking.customerEmail,
        customerPhone: newBooking.customerPhone,
        serviceName: newBooking.serviceName,
        packageName: newBooking.packageName,
        eventDate: newBooking.eventDate,
        preferredStartTime: newBooking.preferredStartTime,
        estimatedDuration: newBooking.estimatedDuration,
        location: newBooking.location,
        totalAmount: newBooking.totalAmount,
        coverageDetails: newBooking.coverageDetails,
        specialNotes: newBooking.specialNotes,
      });
    } catch (e) {
      console.warn("Web3Forms booking email alert warning:", e);
    }

    return NextResponse.json(
      {
        success: true,
        referenceNumber: newBooking.referenceNumber,
        booking: {
          referenceNumber: newBooking.referenceNumber,
          customerName: newBooking.customerName,
          serviceName: newBooking.serviceName,
          packageName: newBooking.packageName,
          eventDate: newBooking.eventDate,
          totalAmount: newBooking.totalAmount,
          currency: newBooking.currency,
          status: newBooking.status,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Validation failed." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error while processing booking." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");

  if (!ref) {
    return NextResponse.json(
      { error: "Reference number is required." },
      { status: 400 }
    );
  }

  const booking = StudioDB.getBookingById(ref);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  // Sanitize sensitive contact info for public reference lookup
  return NextResponse.json({
    referenceNumber: booking.referenceNumber,
    serviceName: booking.serviceName,
    packageName: booking.packageName,
    eventDate: booking.eventDate,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    currency: booking.currency,
  });
}
