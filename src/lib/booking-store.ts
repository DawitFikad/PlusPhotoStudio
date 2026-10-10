import fs from "fs";
import path from "path";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "AWAITING_DEPOSIT"
  | "DEPOSIT_RECEIVED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DECLINED";

export type PaymentStatus =
  | "UNPAID"
  | "DEPOSIT_PENDING"
  | "DEPOSIT_PAID"
  | "FULLY_PAID"
  | "REFUNDED";

export interface BookingRecord {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  packageName: string;
  eventDate: string; // ISO date YYYY-MM-DD
  preferredStartTime: string;
  estimatedDuration: string;
  location: string;
  coverageDetails?: string;
  specialNotes?: string;
  contactPreference: "phone" | "whatsapp" | "email";
  totalAmount: number; // in ETB
  depositAmount: number; // in ETB
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  adminNotes?: string;
  statusHistory: {
    from: BookingStatus;
    to: BookingStatus;
    date: string;
    note?: string;
    by?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  contactPreference: "phone" | "whatsapp" | "email";
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface BlockedDateRecord {
  id: string;
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface StudioPackageRecord {
  id: string;
  serviceSlug: string;
  name: string;
  price: number; // in ETB
  duration: string;
  isPopular: boolean;
  isDraft: boolean;
  description: string;
  highlights: string[];
}

interface DatabaseData {
  bookings: BookingRecord[];
  inquiries: InquiryRecord[];
  blockedDates: BlockedDateRecord[];
  packages: StudioPackageRecord[];
}

const DB_FILE_PATH = path.join(process.cwd(), "src", "data", "studio-data.json");

const initialData: DatabaseData = {
  blockedDates: [
    { id: "b1", date: "2025-01-07", reason: "Ethiopian Christmas (Genna)" },
    { id: "b2", date: "2025-01-19", reason: "Ethiopian Epiphany (Timket)" },
    { id: "b3", date: "2025-09-11", reason: "Ethiopian New Year (Enkutatash)" },
    { id: "b4", date: "2025-09-27", reason: "Meskel Festival" },
  ],
  packages: [
    {
      id: "pkg-wed-ess",
      serviceSlug: "wedding-photography",
      name: "Essential Wedding",
      price: 25000,
      duration: "6 Hours Coverage",
      isPopular: false,
      isDraft: true,
      description: "Ideal for intimate ceremonies and couple portraits.",
      highlights: [
        "1 Senior Photographer",
        "400+ curated edited photos",
        "Online private gallery",
        "Digital download rights",
      ],
    },
    {
      id: "pkg-wed-sig",
      serviceSlug: "wedding-photography",
      name: "Signature Wedding",
      price: 45000,
      duration: "10 Hours Coverage",
      isPopular: true,
      isDraft: true,
      description: "Our most requested comprehensive full-day narrative coverage.",
      highlights: [
        "2 Professional Photographers",
        "700+ color-graded images",
        "Complimentary engagement session",
        "Premium 30x30cm linen album",
      ],
    },
    {
      id: "pkg-wed-roy",
      serviceSlug: "wedding-photography",
      name: "Heritage Royal",
      price: 75000,
      duration: "Multi-Day (Wedding + Melse)",
      isPopular: false,
      isDraft: true,
      description: "Complete heirloom coverage for multi-day cultural celebrations.",
      highlights: [
        "2 Senior Photographers + 1 Assistant",
        "Covers Wedding Day + Melse ceremony",
        "1,000+ master edited images",
        "Bespoke Italian-leather master album + 2 parent albums",
      ],
    },
    {
      id: "pkg-vid-hl",
      serviceSlug: "wedding-videography",
      name: "Highlight Film",
      price: 35000,
      duration: "8 Hours Coverage",
      isPopular: false,
      isDraft: true,
      description: "4–5 minute cinematic highlight film set to licensed emotional soundtrack.",
      highlights: [
        "1 Filmmaker with cinema rig",
        "4K digital delivery",
        "Multi-track audio of vows & speeches",
        "Color graded to warm Ethiopian tones",
      ],
    },
    {
      id: "pkg-vid-sig",
      serviceSlug: "wedding-videography",
      name: "Signature Wedding Cinema",
      price: 60000,
      duration: "12 Hours Coverage",
      isPopular: true,
      isDraft: true,
      description: "Full cinematic story with documentary ceremony edit and speeches.",
      highlights: [
        "2 Cinematographers with cinema camera bodies",
        "7–10 minute extended cinematic film",
        "Full documentary speeches & ceremony edit",
        "Archival keepsake custom USB gift box",
      ],
    },
    {
      id: "pkg-ev-half",
      serviceSlug: "event-coverage",
      name: "Half-Day Event",
      price: 28000,
      duration: "Up to 6 Hours",
      isPopular: true,
      isDraft: true,
      description: "Corporate symposiums, gala dinners, and milestone celebrations.",
      highlights: ["2 Photographers", "350+ edited photos", "Next-day preview batch", "Full commercial license"],
    },
    {
      id: "pkg-port-sig",
      serviceSlug: "portrait-photography",
      name: "Editorial Portrait",
      price: 12000,
      duration: "2 Hours Session",
      isPopular: true,
      isDraft: true,
      description: "Studio or location portrait session with 3 wardrobe changes.",
      highlights: ["3 Looks & 2 Backdrops", "15 master-retouched photos", "Full digital proofs", "Priority 4-day delivery"],
    },
    {
      id: "pkg-comm-brand",
      serviceSlug: "commercial-photography",
      name: "Brand Profile Session",
      price: 30000,
      duration: "Half-Day On-Site",
      isPopular: true,
      isDraft: true,
      description: "Environmental portraits and workplace in action for modern enterprises.",
      highlights: ["25 licensed commercial images", "Color-calibrated files", "High-res print & web crops"],
    },
    {
      id: "pkg-prod-std",
      serviceSlug: "product-photography",
      name: "Standard Product Collection",
      price: 25000,
      duration: "Up to 25 Products",
      isPopular: true,
      isDraft: true,
      description: "Stylized lifestyle staging, studio surfaces, and macro detail cutouts.",
      highlights: ["Lifestyle props & textures", "Hero promotional social sets", "Macro detail focus stacking"],
    },
    {
      id: "pkg-mv-perf",
      serviceSlug: "music-video-production",
      name: "Performance Visualizer",
      price: 50000,
      duration: "Single Day / 2 Looks",
      isPopular: true,
      isDraft: true,
      description: "Dynamic cinema camera performance video in Addis Ababa.",
      highlights: ["1 Location in Addis Ababa", "Cinema lighting crew", "4K master edit", "2 vertical teasers"],
    },
  ],
  bookings: [
    {
      id: "book-001",
      referenceNumber: "PLUS-2025-4819",
      customerName: "Abebe Kebede",
      customerEmail: "abebe.k@example.com",
      customerPhone: "+251 91 123 4567",
      serviceId: "wedding-photography",
      serviceName: "Wedding Photography",
      packageName: "Signature Wedding",
      eventDate: "2025-04-12",
      preferredStartTime: "09:00 AM",
      estimatedDuration: "10 Hours",
      location: "Sheraton Addis & Bole Church",
      coverageDetails: "Morning bride preparation, church ceremony, garden photos, reception.",
      specialNotes: "Family arriving from abroad, would love extra family portraits during reception.",
      contactPreference: "phone",
      totalAmount: 45000,
      depositAmount: 13500,
      currency: "ETB",
      status: "CONFIRMED",
      paymentStatus: "DEPOSIT_PAID",
      adminNotes: "Client signed contract on Feb 10. Deposit received via CBE transfer.",
      statusHistory: [
        { from: "PENDING", to: "AWAITING_DEPOSIT", date: "2025-02-08T10:00:00Z", note: "Quote approved by client" },
        { from: "AWAITING_DEPOSIT", to: "CONFIRMED", date: "2025-02-10T14:30:00Z", note: "30% deposit verified" },
      ],
      createdAt: "2025-02-08T09:12:00Z",
      updatedAt: "2025-02-10T14:30:00Z",
    },
    {
      id: "book-002",
      referenceNumber: "PLUS-2025-9124",
      customerName: "Bethlehem Tadesse",
      customerEmail: "beth.tadesse@example.com",
      customerPhone: "+251 92 345 6789",
      serviceId: "portrait-photography",
      serviceName: "Portrait Photography",
      packageName: "Editorial Portrait",
      eventDate: "2025-03-22",
      preferredStartTime: "02:00 PM",
      estimatedDuration: "2 Hours",
      location: "Plus Studio, Bole",
      coverageDetails: "Graduation and executive portfolio branding.",
      specialNotes: "Requires studio styling advice for traditional Habesha Kemis and corporate blazer.",
      contactPreference: "whatsapp",
      totalAmount: 12000,
      depositAmount: 0,
      currency: "ETB",
      status: "PENDING",
      paymentStatus: "UNPAID",
      adminNotes: "New inquiry from website. Need to confirm studio availability slot.",
      statusHistory: [],
      createdAt: "2025-02-15T16:45:00Z",
      updatedAt: "2025-02-15T16:45:00Z",
    },
    {
      id: "book-003",
      referenceNumber: "PLUS-2025-7731",
      customerName: "Yared Wolde (Addis Agro Exports)",
      customerEmail: "yared@addisagro.example.com",
      customerPhone: "+251 91 888 9999",
      serviceId: "commercial-photography",
      serviceName: "Commercial Photography",
      packageName: "Brand Profile Session",
      eventDate: "2025-03-29",
      preferredStartTime: "10:00 AM",
      estimatedDuration: "Half Day",
      location: "Bole Medhanialem Office & Roastery",
      coverageDetails: "Export coffee cupping laboratory and executive portraits.",
      specialNotes: "High-resolution raw files needed for international specialty coffee expo brochure.",
      contactPreference: "email",
      totalAmount: 30000,
      depositAmount: 9000,
      currency: "ETB",
      status: "DEPOSIT_RECEIVED",
      paymentStatus: "DEPOSIT_PAID",
      adminNotes: "Commercial agreement executed. Shoot scheduled for Saturday morning.",
      statusHistory: [
        { from: "PENDING", to: "DEPOSIT_RECEIVED", date: "2025-02-14T11:00:00Z", note: "Advance deposit confirmed" },
      ],
      createdAt: "2025-02-12T08:20:00Z",
      updatedAt: "2025-02-14T11:00:00Z",
    },
  ],
  inquiries: [
    {
      id: "inq-001",
      name: "Helen Assefa",
      email: "helen.a@example.com",
      phone: "+251 94 456 7890",
      service: "wedding-photography",
      contactPreference: "whatsapp",
      message: "Hello! We are planning our wedding reception in Bole for November 2025. Could you share package details including drone filming?",
      isRead: false,
      createdAt: "2025-02-16T11:22:00Z",
    },
    {
      id: "inq-002",
      name: "Michael Girma",
      email: "m.girma@example.com",
      phone: "+251 91 555 1212",
      service: "music-video-production",
      contactPreference: "phone",
      message: "Looking to shoot a visualizer for a new Afrobeat single in Addis Ababa next month. Want to discuss cinematic concept ideas.",
      isRead: true,
      createdAt: "2025-02-14T15:10:00Z",
    },
  ],
};

function ensureDbFile(): DatabaseData {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE_PATH)) {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(content) as DatabaseData;
  } catch {
    return initialData;
  }
}

function saveDbFile(data: DatabaseData) {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

export const StudioDB = {
  // ── Bookings ──────────────────────────────────────────
  getAllBookings(): BookingRecord[] {
    const data = ensureDbFile();
    return data.bookings.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getBookingById(id: string): BookingRecord | null {
    const data = ensureDbFile();
    return data.bookings.find((b) => b.id === id || b.referenceNumber === id) || null;
  },

  createBooking(
    payload: Omit<
      BookingRecord,
      "id" | "referenceNumber" | "status" | "paymentStatus" | "statusHistory" | "createdAt" | "updatedAt"
    >
  ): BookingRecord {
    const data = ensureDbFile();
    const id = `book-${Date.now()}`;
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `PLUS-2025-${randCode}`;
    const now = new Date().toISOString();

    const newBooking: BookingRecord = {
      ...payload,
      id,
      referenceNumber,
      status: "PENDING",
      paymentStatus: "UNPAID",
      depositAmount: 0,
      statusHistory: [],
      createdAt: now,
      updatedAt: now,
    };

    data.bookings.unshift(newBooking);
    saveDbFile(data);
    return newBooking;
  },

  updateBookingStatus(
    id: string,
    toStatus: BookingStatus,
    note?: string,
    adminNotes?: string,
    depositAmount?: number,
    paymentStatus?: PaymentStatus
  ): BookingRecord | null {
    const data = ensureDbFile();
    const index = data.bookings.findIndex((b) => b.id === id || b.referenceNumber === id);
    if (index === -1) return null;

    const current = data.bookings[index];
    const prevStatus = current.status;
    const now = new Date().toISOString();

    current.status = toStatus;
    current.updatedAt = now;

    if (adminNotes !== undefined) {
      current.adminNotes = adminNotes;
    }
    if (depositAmount !== undefined) {
      current.depositAmount = depositAmount;
    }
    if (paymentStatus !== undefined) {
      current.paymentStatus = paymentStatus;
    }

    current.statusHistory.push({
      from: prevStatus,
      to: toStatus,
      date: now,
      note: note || `Status updated to ${toStatus}`,
      by: "ADMIN",
    });

    data.bookings[index] = current;
    saveDbFile(data);
    return current;
  },

  // ── Availability Checks ───────────────────────────────
  checkAvailability(dateStr: string): {
    available: boolean;
    reason?: string;
  } {
    const data = ensureDbFile();

    // Check if past date
    const targetDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (targetDate < today) {
      return { available: false, reason: "Date is in the past" };
    }

    // Check blocked dates
    const blocked = data.blockedDates.find((b) => b.date === dateStr);
    if (blocked) {
      return { available: false, reason: `Studio Blocked: ${blocked.reason}` };
    }

    // Check confirmed reservations on that day
    const confirmedCount = data.bookings.filter(
      (b) =>
        b.eventDate === dateStr &&
        (b.status === "CONFIRMED" || b.status === "DEPOSIT_RECEIVED" || b.status === "IN_PROGRESS")
    ).length;

    // In studio policy, max 2 major assignments per day to maintain quality
    if (confirmedCount >= 2) {
      return { available: false, reason: "Studio is at maximum confirmed booking capacity for this date" };
    }

    return { available: true };
  },

  getBlockedDates(): BlockedDateRecord[] {
    const data = ensureDbFile();
    return data.blockedDates;
  },

  addBlockedDate(date: string, reason: string): BlockedDateRecord {
    const data = ensureDbFile();
    const newRecord: BlockedDateRecord = {
      id: `block-${Date.now()}`,
      date,
      reason,
    };
    data.blockedDates.push(newRecord);
    saveDbFile(data);
    return newRecord;
  },

  removeBlockedDate(id: string): boolean {
    const data = ensureDbFile();
    data.blockedDates = data.blockedDates.filter((b) => b.id !== id);
    saveDbFile(data);
    return true;
  },

  // ── Packages ──────────────────────────────────────────
  getPackages(): StudioPackageRecord[] {
    const data = ensureDbFile();
    return data.packages;
  },

  updatePackage(id: string, updates: Partial<StudioPackageRecord>): StudioPackageRecord | null {
    const data = ensureDbFile();
    const index = data.packages.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data.packages[index] = { ...data.packages[index], ...updates };
    saveDbFile(data);
    return data.packages[index];
  },

  // ── Inquiries ─────────────────────────────────────────
  getInquiries(): InquiryRecord[] {
    const data = ensureDbFile();
    return data.inquiries.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createInquiry(
    inquiry: Omit<InquiryRecord, "id" | "isRead" | "createdAt">
  ): InquiryRecord {
    const data = ensureDbFile();
    const newInquiry: InquiryRecord = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    data.inquiries.unshift(newInquiry);
    saveDbFile(data);
    return newInquiry;
  },

  markInquiryRead(id: string): boolean {
    const data = ensureDbFile();
    const inq = data.inquiries.find((i) => i.id === id);
    if (inq) {
      inq.isRead = true;
      saveDbFile(data);
      return true;
    }
    return false;
  },
};
