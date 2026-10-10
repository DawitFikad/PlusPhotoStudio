"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
} from "lucide-react";
import { BookingRecord } from "@/lib/booking-store";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const resB = await fetch("/api/admin/bookings");
        const dataB = await resB.json();
        if (dataB.bookings) setBookings(dataB.bookings);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedCount = bookings.filter(
    (b) => b.status === "CONFIRMED" || b.status === "DEPOSIT_RECEIVED"
  ).length;
  const projectedRevenue = bookings
    .filter((b) => b.status !== "CANCELLED" && b.status !== "DECLINED")
    .reduce((acc, b) => acc + b.totalAmount, 0);

  return (
    <div className="space-y-8">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9C7B2]/10">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-[#B96F52] block mb-1">
            Studio Management • Bole
          </span>
          <h1
            className="text-3xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Dashboard Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/calendar"
            className="px-4 py-2 bg-[#211F1D] border border-[#D9C7B2]/20 text-xs text-[#F6F0E8] uppercase tracking-wider rounded-sm hover:border-[#B96F52] transition-colors"
          >
            View Calendar
          </Link>
          <Link
            href="/admin/packages"
            className="px-4 py-2 bg-[#B96F52] text-[#191817] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#D4957C] transition-colors"
          >
            Manage ETB Rates
          </Link>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm">
          <span className="text-[11px] uppercase tracking-wider text-[#D9C7B2]/60 block mb-2">
            Total Reservations
          </span>
          <div className="text-3xl font-serif text-[#F6F0E8] mb-1">
            {totalBookings}
          </div>
          <span className="text-xs text-[#D9C7B2]/50 font-light">
            All registered bookings
          </span>
        </div>

        <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm">
          <span className="text-[11px] uppercase tracking-wider text-amber-400/80 block mb-2">
            Pending Approval
          </span>
          <div className="text-3xl font-serif text-amber-300 mb-1">
            {pendingCount}
          </div>
          <span className="text-xs text-[#D9C7B2]/50 font-light">
            Awaiting studio response
          </span>
        </div>

        <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm">
          <span className="text-[11px] uppercase tracking-wider text-emerald-400/80 block mb-2">
            Confirmed / Deposit Paid
          </span>
          <div className="text-3xl font-serif text-emerald-300 mb-1">
            {confirmedCount}
          </div>
          <span className="text-xs text-[#D9C7B2]/50 font-light">
            Secured calendar dates
          </span>
        </div>

        <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm">
          <span className="text-[11px] uppercase tracking-wider text-[#B96F52] block mb-2">
            Projected Pipeline
          </span>
          <div className="text-2xl sm:text-3xl font-serif text-[#F6F0E8] mb-1">
            ETB {projectedRevenue.toLocaleString()}
          </div>
          <span className="text-xs text-[#D9C7B2]/50 font-light">
            Active booking values
          </span>
        </div>
      </div>

      {/* ── Recent Bookings Table ── */}
      <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Recent Booking Inquiries
          </h2>
          <Link
            href="/admin/bookings"
            className="text-xs text-[#B96F52] hover:underline flex items-center gap-1"
          >
            <span>View All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D9C7B2]/10 text-[10px] uppercase font-mono tracking-wider text-[#D9C7B2]/60">
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Service & Package</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9C7B2]/5 text-xs">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-[#201E1C] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-[#F6F0E8]">
                    {b.referenceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#F6F0E8]">{b.customerName}</p>
                    <p className="text-[11px] text-[#D9C7B2]/50">{b.customerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[#F6F0E8]">{b.serviceName}</p>
                    <p className="text-[11px] text-[#D9C7B2]/60">{b.packageName}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#D9C7B2]/80">
                    {b.eventDate}
                  </td>
                  <td className="py-3.5 px-4 font-serif text-sm text-[#F6F0E8]">
                    ETB {b.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                          : b.status === "DEPOSIT_RECEIVED"
                          ? "bg-blue-950/60 text-blue-300 border border-blue-800/50"
                          : b.status === "PENDING"
                          ? "bg-amber-950/60 text-amber-300 border border-amber-800/50"
                          : "bg-neutral-800 text-neutral-300"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#282624] text-xs text-[#F6F0E8] hover:bg-[#B96F52] hover:text-[#191817] transition-colors rounded-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
