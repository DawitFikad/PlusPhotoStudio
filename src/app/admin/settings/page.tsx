"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { BlockedDateRecord } from "@/lib/booking-store";

export default function AdminSettingsPage() {
  const [blockedDates, setBlockedDates] = useState<BlockedDateRecord[]>([
    { id: "b1", date: "2025-01-07", reason: "Ethiopian Christmas (Genna)" },
    { id: "b2", date: "2025-01-19", reason: "Ethiopian Epiphany (Timket)" },
    { id: "b3", date: "2025-09-11", reason: "Ethiopian New Year (Enkutatash)" },
    { id: "b4", date: "2025-09-27", reason: "Meskel Festival" },
  ]);

  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAddBlockedDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newReason) return;

    const newRecord: BlockedDateRecord = {
      id: `block-${Date.now()}`,
      date: newDate,
      reason: newReason,
    };

    setBlockedDates([...blockedDates, newRecord]);
    setNewDate("");
    setNewReason("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteBlockedDate = (id: string) => {
    setBlockedDates(blockedDates.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* ── Top Bar ── */}
      <div className="pb-6 border-b border-[#D9C7B2]/10">
        <span className="text-xs uppercase font-mono tracking-wider text-[#B96F52] block mb-1">
          Configuration & Policies
        </span>
        <h1
          className="text-3xl font-light text-[#F6F0E8]"
          style={{ fontFamily: "var(--font-bodoni), serif" }}
        >
          Studio Settings
        </h1>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-sm flex items-center gap-3 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Calendar configuration saved successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Studio Identity Coordinates */}
        <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-6">
          <h2
            className="text-xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Studio Profile & Timezone
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/60 mb-1">
                Studio Brand
              </label>
              <input
                type="text"
                disabled
                value="PLUS PHOTOGRAPHY"
                className="w-full px-3 py-2 bg-[#211F1D] border border-[#D9C7B2]/10 text-[#F6F0E8] rounded-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/60 mb-1">
                Location District
              </label>
              <input
                type="text"
                disabled
                value="Bole, Addis Ababa, Ethiopia"
                className="w-full px-3 py-2 bg-[#211F1D] border border-[#D9C7B2]/10 text-[#F6F0E8] rounded-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/60 mb-1">
                System Timezone
              </label>
              <input
                type="text"
                disabled
                value="Africa/Addis_Ababa (UTC+3 / East Africa Time)"
                className="w-full px-3 py-2 bg-[#211F1D] border border-[#D9C7B2]/10 text-[#F6F0E8] rounded-sm cursor-not-allowed font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/60 mb-1">
                Operating Days
              </label>
              <p className="text-[#D9C7B2]/80 leading-relaxed font-light">
                Monday through Saturday: 9:00 AM – 6:30 PM EAT. Sundays strictly reserved for
                confirmed on-location weddings and multi-day celebrations.
              </p>
            </div>
          </div>
        </div>

        {/* Blocked Calendar Dates */}
        <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl font-light text-[#F6F0E8]"
              style={{ fontFamily: "var(--font-bodoni), serif" }}
            >
              Blocked Dates & Public Holidays
            </h2>
            <span className="text-xs text-[#D9C7B2]/50 font-mono">
              {blockedDates.length} blocked
            </span>
          </div>

          <form onSubmit={handleAddBlockedDate} className="space-y-3 p-4 bg-[#211F1D] rounded-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B96F52] block">
              Block New Studio Date
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="px-3 py-2 bg-[#191817] border border-[#D9C7B2]/20 text-xs text-[#F6F0E8] rounded-sm font-mono"
              />
              <input
                type="text"
                required
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="Reason (e.g. Studio Maintenance)"
                className="px-3 py-2 bg-[#191817] border border-[#D9C7B2]/20 text-xs text-[#F6F0E8] rounded-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#B96F52] text-[#191817] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#D4957C] transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Blocked Date</span>
            </button>
          </form>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {blockedDates.map((b) => (
              <div
                key={b.id}
                className="p-3 bg-[#211F1D] border border-[#D9C7B2]/10 rounded-sm flex items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-mono text-[#F6F0E8] font-medium mr-2">{b.date}</span>
                  <span className="text-[#D9C7B2]/70 font-light">{b.reason}</span>
                </div>
                <button
                  onClick={() => handleDeleteBlockedDate(b.id)}
                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  title="Remove block"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
