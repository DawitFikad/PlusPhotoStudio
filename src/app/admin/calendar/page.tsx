"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BookingRecord, BlockedDateRecord } from "@/lib/booking-store";

export default function AdminCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // March 2025
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [blockedDates] = useState<BlockedDateRecord[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/bookings");
        const data = await res.json();
        if (data.bookings) setBookings(data.bookings);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div className="space-y-8">
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9C7B2]/10">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-[#B96F52] block mb-1">
            Studio Schedule & Availability
          </span>
          <h1
            className="text-3xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Calendar View ({monthNames[month]} {year})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="p-2.5 bg-[#191817] border border-[#D9C7B2]/20 rounded-sm hover:border-[#B96F52] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#F6F0E8]" />
          </button>
          <span className="text-xs uppercase font-mono text-[#F6F0E8] px-2">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-2.5 bg-[#191817] border border-[#D9C7B2]/20 rounded-sm hover:border-[#B96F52] transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-[#F6F0E8]" />
          </button>
        </div>
      </div>

      {/* ── Calendar Grid ── */}
      <div className="bg-[#191817] border border-[#D9C7B2]/15 rounded-sm p-6">
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] font-mono uppercase tracking-wider text-[#D9C7B2]/50 pb-3 border-b border-[#D9C7B2]/10">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div className="grid grid-cols-7 gap-2 min-h-[480px]">
          {paddingArray.map((_, i) => (
            <div key={`pad-${i}`} className="p-2 bg-[#141312]/40 rounded-sm min-h-[90px]" />
          ))}

          {daysArray.map((day) => {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayBookings = bookings.filter((b) => b.eventDate === dateStr);
            const isBlocked = blockedDates.some((b) => b.date === dateStr);

            return (
              <div
                key={day}
                className={`p-2 rounded-sm border min-h-[90px] flex flex-col justify-between transition-colors ${
                  isBlocked
                    ? "bg-red-950/20 border-red-900/40"
                    : dayBookings.length > 0
                    ? "bg-[#211F1D] border-[#B96F52]/40"
                    : "bg-[#181716] border-[#D9C7B2]/10 hover:border-[#D9C7B2]/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#F6F0E8]">{day}</span>
                  {dayBookings.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#B96F52]" />
                  )}
                </div>

                <div className="space-y-1 my-1">
                  {dayBookings.map((b) => (
                    <Link
                      key={b.id}
                      href={`/admin/bookings/${b.id}`}
                      className="block p-1 bg-[#282624] text-[10px] text-[#F6F0E8] rounded-xs hover:bg-[#B96F52] hover:text-[#191817] transition-colors truncate"
                      title={`${b.customerName} - ${b.serviceName}`}
                    >
                      {b.customerName}
                    </Link>
                  ))}
                </div>

                <div className="text-[9px] text-[#D9C7B2]/40 font-mono text-right">
                  {dayBookings.length > 0 ? `${dayBookings.length} session(s)` : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
