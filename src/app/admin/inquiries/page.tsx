"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
} from "lucide-react";
import { InquiryRecord } from "@/lib/booking-store";

const defaultInquiries: InquiryRecord[] = [
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
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(defaultInquiries);

  const toggleRead = (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, isRead: !inq.isRead } : inq
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#D9C7B2]/10">
        <span className="text-xs uppercase font-mono tracking-wider text-[#B96F52] block mb-1">
          Direct Messages
        </span>
        <h1
          className="text-3xl font-light text-[#F6F0E8]"
          style={{ fontFamily: "var(--font-bodoni), serif" }}
        >
          Customer Inquiries ({inquiries.length})
        </h1>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className={`p-6 border rounded-sm transition-all ${
              !inq.isRead
                ? "bg-[#1E1C1A] border-[#B96F52]/50"
                : "bg-[#181716] border-[#D9C7B2]/10"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    !inq.isRead ? "bg-[#B96F52]" : "bg-transparent"
                  }`}
                />
                <h2 className="text-base font-medium text-[#F6F0E8]">{inq.name}</h2>
                {inq.service && (
                  <span className="text-[10px] font-mono uppercase bg-[#2A2725] text-[#D9C7B2]/80 px-2 py-0.5 rounded-sm">
                    {inq.service}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-mono text-[#D9C7B2]/50">
                {new Date(inq.createdAt).toLocaleDateString()} at{" "}
                {new Date(inq.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#D9C7B2]/90 leading-relaxed font-light mb-4 pl-5">
              &ldquo;{inq.message}&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D9C7B2]/10 text-xs pl-5">
              <div className="flex flex-wrap items-center gap-4 text-[#D9C7B2]/70">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B96F52]" />
                  <a href={`mailto:${inq.email}`} className="hover:underline">
                    {inq.email}
                  </a>
                </div>
                {inq.phone && (
                  <div className="flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#B96F52]" />
                    <a href={`tel:${inq.phone}`} className="hover:underline">
                      {inq.phone}
                    </a>
                  </div>
                )}
                <span className="text-[11px] font-mono text-[#B96F52]">
                  Prefers: {inq.contactPreference}
                </span>
              </div>

              <button
                onClick={() => toggleRead(inq.id)}
                className="px-3 py-1 bg-[#242220] hover:bg-[#B96F52] hover:text-[#191817] text-xs text-[#D9C7B2] rounded-sm transition-colors"
              >
                {inq.isRead ? "Mark Unread" : "Mark as Read"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
