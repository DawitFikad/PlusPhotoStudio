"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Eye,
} from "lucide-react";
import { BookingRecord, BookingStatus } from "@/lib/booking-store";

const statuses: (BookingStatus | "ALL")[] = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "DEPOSIT_RECEIVED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "DECLINED",
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        let url = "/api/admin/bookings";
        const params = new URLSearchParams();
        if (selectedStatus !== "ALL") params.append("status", selectedStatus);
        if (searchQuery) params.append("search", searchQuery);
        if (params.toString()) url += `?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        if (data.bookings) setBookings(data.bookings);
      } catch (e) {
        console.error(e);
      }
    }
    loadBookings();
  }, [selectedStatus, searchQuery]);

  const handleExportCSV = () => {
    const headers = [
      "Reference",
      "Customer",
      "Email",
      "Phone",
      "Service",
      "Package",
      "Date",
      "Location",
      "Amount_ETB",
      "Deposit_ETB",
      "Status",
    ];
    const rows = bookings.map((b) => [
      b.referenceNumber,
      `"${b.customerName}"`,
      b.customerEmail,
      `"${b.customerPhone}"`,
      `"${b.serviceName}"`,
      `"${b.packageName}"`,
      b.eventDate,
      `"${b.location}"`,
      b.totalAmount,
      b.depositAmount,
      b.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Plus_Photography_Bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9C7B2]/10">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-[#B96F52] block mb-1">
            Studio Reservations
          </span>
          <h1
            className="text-3xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            All Bookings ({bookings.length})
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#211F1D] border border-[#D9C7B2]/20 text-xs text-[#F6F0E8] uppercase tracking-wider rounded-sm hover:border-[#B96F52] transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#B96F52]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* ── Filters & Search ── */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ref, or venue..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#191817] border border-[#D9C7B2]/20 text-xs text-[#F6F0E8] focus:outline-none focus:border-[#B96F52] rounded-sm"
          />
          <Search className="w-4 h-4 text-[#D9C7B2]/40 absolute left-3 top-3" />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-sm transition-all ${
                selectedStatus === st
                  ? "bg-[#B96F52] text-[#191817] font-semibold"
                  : "bg-[#191817] text-[#D9C7B2]/60 hover:text-[#F6F0E8]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bookings Table ── */}
      <div className="bg-[#191817] border border-[#D9C7B2]/10 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D9C7B2]/10 text-[10px] uppercase font-mono tracking-wider text-[#D9C7B2]/60 bg-[#161514]">
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Client Details</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Event Date</th>
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4">ETB Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9C7B2]/5 text-xs">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#D9C7B2]/50 font-light">
                    No bookings found matching current filter.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#201E1C] transition-colors">
                    <td className="py-4 px-4 font-mono font-medium text-[#F6F0E8]">
                      {b.referenceNumber}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-[#F6F0E8]">{b.customerName}</p>
                      <p className="text-[11px] text-[#D9C7B2]/60">{b.customerEmail}</p>
                      <p className="text-[11px] text-[#D9C7B2]/40 font-mono">{b.customerPhone}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[#F6F0E8]">{b.serviceName}</p>
                      <p className="text-[11px] text-[#B96F52]">{b.packageName}</p>
                    </td>
                    <td className="py-4 px-4 font-mono text-[#D9C7B2]/90">
                      {b.eventDate}
                      <span className="block text-[10px] text-[#D9C7B2]/50">
                        {b.preferredStartTime}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#D9C7B2]/80 max-w-xs truncate">
                      {b.location}
                    </td>
                    <td className="py-4 px-4 font-serif text-sm text-[#F6F0E8]">
                      ETB {b.totalAmount.toLocaleString()}
                      {b.depositAmount > 0 && (
                        <span className="block text-[10px] font-mono text-emerald-400">
                          Dep: ETB {b.depositAmount.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm ${
                          b.status === "CONFIRMED"
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                            : b.status === "DEPOSIT_RECEIVED"
                            ? "bg-blue-950/60 text-blue-300 border border-blue-800/50"
                            : b.status === "PENDING"
                            ? "bg-amber-950/60 text-amber-300 border border-amber-800/50"
                            : b.status === "CANCELLED" || b.status === "DECLINED"
                            ? "bg-red-950/60 text-red-400 border border-red-800/50"
                            : "bg-neutral-800 text-neutral-300"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#282624] text-xs text-[#F6F0E8] hover:bg-[#B96F52] hover:text-[#191817] transition-colors rounded-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
