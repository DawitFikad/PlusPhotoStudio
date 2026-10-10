# Plus Photography — Complete Studio Website & Booking Management System

> **"Your moments. Our perspective."**  
> Professional photography, cinematography, and creative media studio located in **Bole, Addis Ababa, Ethiopia**.

---

## 📸 Overview

**Plus Photography** is a complete, production-grade Next.js web application and studio booking management system designed for an editorial creative photography and videography studio in Addis Ababa. 

The application delivers an editorial visual identity (inspired by warm ivory `#F6F0E8`, ink black `#191817`, terracotta `#B96F52`, and sand `#D9C7B2`), smooth Framer Motion interactions, responsive masonry portfolios with an accessible lightbox, transparent pricing in **Ethiopian Birr (ETB)**, a multi-step booking engine with double-booking prevention, and an administrative dashboard for client reservation workflows.

---

## 🏛️ System Architecture

### 1. Technology Stack
- **Framework**: Next.js 16 (App Router with Turbopack)
- **Frontend Library**: React 19 & TypeScript (Strict Type Checking)
- **Styling**: Tailwind CSS v4 with bespoke editorial design system
- **Motion**: Framer Motion for smooth animations and transitions
- **Icons**: Lucide React
- **Validation**: Zod schema validation
- **Database & ORM**: PostgreSQL schema managed via Prisma ORM (`@prisma/client` & `prisma`)
- **Data Engine**: Persistent studio data repository (`src/lib/booking-store.ts`) with disk persistence for local zero-dependency testing, plus official Prisma schema for managed cloud databases.

---

## 🌐 Public Site Navigation & Routes

| Route | Description |
|---|---|
| `/` | **Editorial Homepage**: Wordmark, full-bleed hero, selected works grid, seven core services overview, creative approach, process stages, video showcase, draft packages preview, and footer. |
| `/portfolio` | **Portfolio Showcase**: Animated category filters (Weddings, Portraits, Commercial, Events, Music Videos), asymmetric grid, keyboard-accessible lightbox with prev/next navigation, and project links. |
| `/portfolio/[slug]` | **Project Case Study**: Dynamic project detail pages with full-bleed heroes, client narrative, high-res gallery grid, project metadata sidebar, and sequential project navigation. |
| `/services` | **Services Overview**: Comprehensive presentation of all 7 studio disciplines, deliverables, and starting draft rates. |
| `/services/[slug]` | **Service Detail Pages**: Dedicated pages for each of the 7 services (`wedding-photography`, `wedding-videography`, `event-coverage`, `portrait-photography`, `commercial-photography`, `product-photography`, `music-video-production`). |
| `/packages` | **Published Collections**: Categorized collections, Ethiopian Birr (ETB) rates, collection inclusions, optional add-ons, and direct booking links. |
| `/about` | **About the Studio**: Origin narrative, Bole studio coordinates, 4 foundational principles, technical philosophy, and appointment booking. |
| `/book` | **Interactive 6-Step Booking System**: Service selection, collection selection, real-time date availability check in `Africa/Addis_Ababa` timezone, event coordinates, request review, and reference generation (`PLUS-2025-XXXX`). |
| `/contact` | **Contact & Inquiries**: Bole location details, opening hours (EAT), phone/WhatsApp links, and direct inquiry form. |
| `/privacy` | **Privacy Policy**: Client confidentiality, commercial release policies, and data retention guidelines. |
| `/terms` | **Terms of Engagement**: 30% retainer deposit policy, ETB payments, delivery timelines, and rescheduling guidelines. |
| `/not-found` | **Custom 404 Page**: Editorial error page guiding visitors back to homepage and portfolio. |

---

## 🔒 Administrative Management Suite

Accessible via `/admin` (login at `/admin/login`):

- **`/admin` (Dashboard Overview)**: High-level KPI cards (total reservations, pending requests, confirmed dates, projected ETB pipeline revenue) and recent bookings table.
- **`/admin/bookings` (Booking Management)**: Filter by 8 status states (`PENDING`, `CONFIRMED`, `AWAITING_DEPOSIT`, `DEPOSIT_RECEIVED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `DECLINED`), live search by client name or reference code, and **CSV Data Export**.
- **`/admin/bookings/[id]` (Booking Detail & Status Workflow)**: Client contact coordinates, venue location, package breakdown, status transition controls with timestamped audit trail, deposit recording in ETB, and private studio team notes.
- **`/admin/calendar` (Studio Schedule)**: Visual calendar view with confirmed bookings and blocked studio dates.
- **`/admin/packages` (Rate Governance)**: Inline editing of ETB package prices, package names, inclusions, and draft/approved status toggle.
- **`/admin/inquiries` (Customer Inquiries)**: Inbound contact form submissions with read/unread statuses and client contact links.
- **`/admin/settings` (Studio Configuration)**: Studio timezone (`Africa/Addis_Ababa`), working hours, and blocked dates management (public holidays: Genna, Timket, Enkutatash, Meskel).

---

## ⚙️ API Endpoints

- `GET /api/availability?date=YYYY-MM-DD`: Checks date availability and return status without leaking private customer data.
- `POST /api/bookings`: Validates booking submissions with Zod, validates server-side availability to prevent double-booking, records reservation, and issues unique reference code.
- `GET /api/bookings?ref=PLUS-2025-XXXX`: Public sanitized booking status query.
- `POST /api/contact`: Validates and records studio inquiries.
- `GET /api/admin/bookings`: Admin query endpoint with status and text filtering.
- `PATCH /api/admin/bookings/[id]`: Admin status transitions and deposit updates.
- `PATCH /api/admin/packages`: Admin ETB price adjustments and rate publishing.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Automated Verification Tests
```bash
node scripts/verify-studio.mjs
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Access
Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login):
- **Email**: `admin@plusphotography.et`
- **Password**: `studio2025`

---

## 🗄️ Database Provisioning & Production Deployment

### Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Prisma Commands
```bash
# Push schema to PostgreSQL database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed initial services, packages, and calendar blocks
npx tsx prisma/seed.ts
```

### Vercel Deployment
1. Connect GitHub repository to Vercel.
2. In Vercel Project Settings, add environment variables from `.env.example`.
3. Set Build Command: `next build`.
4. Deploy.
