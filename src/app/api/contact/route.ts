import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { StudioDB } from "@/lib/booking-store";
import { sendWeb3ContactInquiry } from "@/lib/web3forms";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  service: z.string().optional(),
  contactPreference: z.enum(["phone", "whatsapp", "email"]).default("phone"),
  message: z.string().min(5, "Message must be at least 5 characters."),
  access_key: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = inquirySchema.parse(body);

    // Save locally into Studio database for Admin Suite
    const record = StudioDB.createInquiry({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      service: validated.service,
      contactPreference: validated.contactPreference,
      message: validated.message,
    });

    // Forward to Web3Forms API for instant email delivery to studio director
    let web3Status = false;
    try {
      const web3Res = await sendWeb3ContactInquiry({
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        service: validated.service,
        contactPreference: validated.contactPreference,
        message: validated.message,
      });
      web3Status = web3Res.success;
    } catch (e) {
      console.warn("Web3Forms forward warning (inquiry stored locally in StudioDB):", e);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Our Bole studio team will respond promptly.",
        id: record.id,
        web3formsDelivered: web3Status,
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
      { error: "Internal server error while processing message." },
      { status: 500 }
    );
  }
}
