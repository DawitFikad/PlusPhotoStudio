"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  Phone,
  Save,
  AlertCircle,
  History,
} from "lucide-react";
import { BookingRecord, BookingStatus, PaymentStatus } from "@/lib/booking-store";

export default function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [status, setStatus] = useState<BookingStatus>("PENDING");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("UNPAID");
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [adminNotes, setAdminNotes] = useState("");
  const [statusChangeNote, setStatusChangeNote] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch(`/api/admin/bookings/${resolvedParams.id}`);
        const data = await res.json();
        if (data.booking) {
          setBooking(data.booking);
          setStatus(data.booking.status);
          setPaymentStatus(data.booking.paymentStatus);
          setDepositAmount(data.booking.depositAmount || 0);
          setAdminNotes(data.booking.adminNotes || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadBooking();
  }, [resolvedParams.id]);

  const handleSaveChanges = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/admin/bookings/${resolvedParams.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          paymentStatus,
          depositAmount: Number(depositAmount),
          adminNotes,
          note: statusChangeNote || `Admin updated status to ${status}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBooking(data.booking);
        setSaveSuccess(true);
        setStatusChangeNote("");
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setErrorMessage(data.error || "Failed to update booking status.");
      }
    } catch {
      setErrorMessage("Network error updating booking.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-[#D9C7B2]/60">
        Loading booking details...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-light text-[#F6F0E8]">Booking Not Found</h2>
        <Link
          href="/admin/bookings"
          className="text-xs text-[#B96F52] hover:underline"
        >
          &larr; Return to All Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9C7B2]/10">
        <div className="space-y-1">
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 text-xs text-[#B96F52] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Bookings</span>
          </Link>
          <h1
            className="text-3xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
          >
            Booking {booking.referenceNumber}
          </h1>
          <p className="text-xs text-[#D9C7B2]/60 font-mono">
            Created on {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={handleSaveChanges}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#B96F52] text-[#191817] text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#D4957C] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Status & Notes"}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-sm flex items-center gap-3 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Booking records successfully updated in studio database.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-sm flex items-center gap-3 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Card */}
          <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-4">
            <h2
              className="text-xl font-light text-[#F6F0E8]"
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
            >
              Client Identification
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Name</span>
                <p className="text-sm font-medium text-[#F6F0E8] mt-0.5">{booking.customerName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Contact Method</span>
                <p className="text-sm uppercase font-mono text-[#F6F0E8] mt-0.5">{booking.contactPreference}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B96F52]" />
                <a href={`mailto:${booking.customerEmail}`} className="text-[#D9C7B2] hover:underline">
                  {booking.customerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B96F52]" />
                <a href={`tel:${booking.customerPhone}`} className="text-[#D9C7B2] hover:underline font-mono">
                  {booking.customerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Event & Scope Card */}
          <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-4">
            <h2
              className="text-xl font-light text-[#F6F0E8]"
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
            >
              Session & Venue Coordinates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Service</span>
                <p className="text-sm text-[#F6F0E8] mt-0.5">{booking.serviceName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Collection / Package</span>
                <p className="text-sm text-[#B96F52] mt-0.5 font-medium">{booking.packageName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Event Date</span>
                <p className="text-sm text-[#F6F0E8] font-mono mt-0.5">{booking.eventDate}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Start Time</span>
                <p className="text-sm text-[#F6F0E8] mt-0.5">{booking.preferredStartTime} (EAT)</p>
              </div>
            </div>

            <div className="pt-2 text-xs">
              <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Venue / Location</span>
              <p className="text-sm text-[#F6F0E8] mt-0.5">{booking.location}</p>
            </div>

            {booking.coverageDetails && (
              <div className="pt-2 text-xs">
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Coverage Scope</span>
                <p className="text-xs text-[#D9C7B2]/80 mt-0.5 leading-relaxed font-light">{booking.coverageDetails}</p>
              </div>
            )}

            {booking.specialNotes && (
              <div className="pt-2 text-xs">
                <span className="text-[10px] uppercase font-mono text-[#D9C7B2]/50 block">Client Notes</span>
                <p className="text-xs text-[#D9C7B2]/80 mt-0.5 leading-relaxed font-light">{booking.specialNotes}</p>
              </div>
            )}
          </div>

          {/* Audit / Transition History */}
          <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#B96F52]" />
              <h2
                className="text-xl font-light text-[#F6F0E8]"
                style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              >
                Status Audit Trail
              </h2>
            </div>

            <div className="space-y-3">
              {booking.statusHistory && booking.statusHistory.length > 0 ? (
                booking.statusHistory.map((h, i) => (
                  <div key={i} className="p-3 bg-[#211F1D] border border-[#D9C7B2]/10 rounded-sm text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#D9C7B2]/60 mb-1">
                      <span>{new Date(h.date).toLocaleString()}</span>
                      <span className="text-[#B96F52]">{h.from} &rarr; {h.to}</span>
                    </div>
                    <p className="text-xs text-[#F6F0E8] font-light">{h.note}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#D9C7B2]/50 italic">No previous status transitions recorded.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Financials */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Control */}
          <div className="p-6 bg-[#1D1B19] border border-[#B96F52]/30 rounded-sm space-y-4">
            <h2
              className="text-xl font-light text-[#F6F0E8]"
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
            >
              Booking State Transition
            </h2>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/70 mb-2">
                Booking Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BookingStatus)}
                className="w-full px-4 py-2.5 bg-[#252220] border border-[#D9C7B2]/20 text-[#F6F0E8] text-xs focus:outline-none focus:border-[#B96F52] rounded-sm font-mono"
              >
                <option value="PENDING">PENDING (Awaiting Review)</option>
                <option value="AWAITING_DEPOSIT">AWAITING_DEPOSIT</option>
                <option value="DEPOSIT_RECEIVED">DEPOSIT_RECEIVED</option>
                <option value="CONFIRMED">CONFIRMED (Date Locked)</option>
                <option value="IN_PROGRESS">IN_PROGRESS (Shooting / Editing)</option>
                <option value="COMPLETED">COMPLETED (Gallery Delivered)</option>
                <option value="DECLINED">DECLINED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/70 mb-2">
                Transition Note
              </label>
              <input
                type="text"
                value={statusChangeNote}
                onChange={(e) => setStatusChangeNote(e.target.value)}
                placeholder="e.g. Deposit verified via bank statement..."
                className="w-full px-4 py-2 bg-[#252220] border border-[#D9C7B2]/20 text-[#F6F0E8] text-xs focus:outline-none focus:border-[#B96F52] rounded-sm"
              />
            </div>
          </div>

          {/* Financial & Deposit Recording */}
          <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-4">
            <h2
              className="text-xl font-light text-[#F6F0E8]"
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
            >
              Deposit & Payment Status
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#D9C7B2]/60">Total Agreed Fee:</span>
                <span className="text-lg font-serif text-[#F6F0E8]">
                  ETB {booking.totalAmount.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/70 mb-1">
                  Recorded Deposit Amount (ETB)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#211F1D] border border-[#D9C7B2]/20 text-[#F6F0E8] text-xs font-mono rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#D9C7B2]/70 mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full px-3 py-2 bg-[#211F1D] border border-[#D9C7B2]/20 text-[#F6F0E8] text-xs font-mono rounded-sm"
                >
                  <option value="UNPAID">UNPAID</option>
                  <option value="DEPOSIT_PENDING">DEPOSIT_PENDING</option>
                  <option value="DEPOSIT_PAID">DEPOSIT_PAID</option>
                  <option value="FULLY_PAID">FULLY_PAID</option>
                  <option value="REFUNDED">REFUNDED</option>
                </select>
              </div>
            </div>
          </div>

          {/* Internal Administrative Notes */}
          <div className="p-6 bg-[#191817] border border-[#D9C7B2]/10 rounded-sm space-y-4">
            <h2
              className="text-xl font-light text-[#F6F0E8]"
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
            >
              Studio Internal Notes
            </h2>
            <textarea
              rows={4}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Private team notes (gear requirements, lead photographer assigned, client preferences)..."
              className="w-full px-4 py-3 bg-[#211F1D] border border-[#D9C7B2]/20 text-[#F6F0E8] text-xs focus:outline-none focus:border-[#B96F52] rounded-sm resize-y font-light"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
