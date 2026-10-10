import { NextRequest, NextResponse } from "next/server";
import { StudioDB } from "@/lib/booking-store";

export async function GET() {
  const packages = StudioDB.getPackages();
  return NextResponse.json({ packages });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, price, isDraft, isPopular, name, highlights } = body;

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    const updated = StudioDB.updatePackage(id, {
      ...(price !== undefined ? { price: Number(price) } : {}),
      ...(isDraft !== undefined ? { isDraft: Boolean(isDraft) } : {}),
      ...(isPopular !== undefined ? { isPopular: Boolean(isPopular) } : {}),
      ...(name !== undefined ? { name } : {}),
      ...(highlights !== undefined ? { highlights } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update package rates" },
      { status: 500 }
    );
  }
}
