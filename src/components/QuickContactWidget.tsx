"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { STUDIO, telHref, whatsappHref } from "@/lib/studio";
import { IconClose, IconPhone, IconWhatsApp } from "./icons";

export function QuickContactWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <aside className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(18.5rem,calc(100vw-2rem))] border border-[rgba(196,163,90,0.35)] bg-[#12100e]/95 backdrop-blur-md p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[#c4a35a]">
              Desk · Bole
            </p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <IconClose size={16} />
            </button>
          </div>
          <p className="display text-2xl mb-1">Reach the studio</p>
          <p className="text-xs text-[#8a7f70] mb-4">{STUDIO.hours}</p>
          <div className="space-y-2">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-line w-full">
              <IconWhatsApp size={14} /> WhatsApp
            </a>
            <a href={telHref()} className="btn btn-fill w-full">
              <IconPhone size={14} /> {STUDIO.phoneDisplay}
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <a href={whatsappHref()} className="icon-chip !w-12 !h-12 rounded-full" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
          <IconWhatsApp size={20} />
        </a>
        <a href={telHref()} className="icon-chip !w-12 !h-12 rounded-full" aria-label="Call">
          <IconPhone size={20} />
        </a>
        <button type="button" onClick={() => setOpen((v) => !v)} className="btn btn-fill !rounded-full !px-4">
          {open ? "Close" : "Connect"}
        </button>
      </div>
    </aside>
  );
}
