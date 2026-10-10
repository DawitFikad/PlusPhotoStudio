"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SERVICES } from "@/data/content";
import { STUDIO, telHref, whatsappHref } from "@/lib/studio";
import { sendWeb3NewsletterSubscription } from "@/lib/web3forms";
import {
  IconArrow,
  IconCheck,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
  IconYoutube,
} from "./icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("err");
      setMsg("Enter a valid email.");
      return;
    }
    setStatus("loading");
    const res = await sendWeb3NewsletterSubscription(email);
    if (res.success) {
      setStatus("ok");
      setMsg("You are on the studio journal list.");
      setEmail("");
    } else {
      setStatus("err");
      setMsg(res.message || "Could not subscribe.");
    }
  }

  return (
    <footer className="border-t border-[rgba(239,230,214,0.1)] bg-[#0e0c0a] relative z-10">
      <div className="shell py-14 border-b border-[rgba(239,230,214,0.08)]">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <p className="kicker mb-3">Journal · Web3Forms</p>
            <h2 className="display text-3xl sm:text-4xl text-[#efe6d6]">
              Private notes from the Bole studio
            </h2>
            <p className="mt-3 max-w-md text-sm text-[#8a7f70]">
              Availability, wedding previews, and seasonal sitting dates. No lists sold.
            </p>
          </div>
          <div className="lg:col-span-6">
            {status === "ok" ? (
              <p className="flex items-center gap-2 text-sm text-[#c4a35a]">
                <IconCheck /> {msg}
              </p>
            ) : (
              <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="field"
                  aria-label="Email for journal"
                />
                <button type="submit" className="btn btn-fill shrink-0" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Subscribe"}
                  <IconArrow size={13} />
                </button>
              </form>
            )}
            {status === "err" && <p className="mt-2 text-xs text-red-300">{msg}</p>}
          </div>
        </div>
      </div>

      <div className="shell py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <p className="display text-2xl tracking-[0.16em] uppercase">Plus</p>
          <p className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-[#c4a35a] mt-1">
            {STUDIO.district} · {STUDIO.country}
          </p>
          <p className="mt-5 text-sm text-[#8a7f70] max-w-xs leading-relaxed">
            Photography and cinema from a working studio in Bole. Weddings, portraits, commercial stills, music.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { href: STUDIO.instagram, Icon: IconInstagram, label: "Instagram" },
              { href: STUDIO.facebook, Icon: IconFacebook, label: "Facebook" },
              { href: STUDIO.youtube, Icon: IconYoutube, label: "YouTube" },
              { href: whatsappHref(), Icon: IconWhatsApp, label: "WhatsApp" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="icon-chip" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-[#c4a35a] mb-5">Studio</p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-[#8a7f70] hover:text-[#efe6d6] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="text-sm text-[#8a7f70] hover:text-[#efe6d6]">
                Reserve
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-[#c4a35a] mb-5">Disciplines</p>
          <ul className="space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-[#8a7f70] hover:text-[#efe6d6]">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-[#c4a35a] mb-5">Desk</p>
          <ul className="space-y-4 text-sm text-[#8a7f70]">
            <li className="flex gap-3">
              <IconPin className="text-[#c4a35a] shrink-0 mt-0.5" />
              {STUDIO.district}
              <br />
              {STUDIO.landmark}
            </li>
            <li className="flex gap-3">
              <IconPhone className="text-[#c4a35a] shrink-0" />
              <a href={telHref()} className="hover:text-[#efe6d6] font-mono text-[0.8rem]">
                {STUDIO.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <IconMail className="text-[#c4a35a] shrink-0" />
              <a href={`mailto:${STUDIO.email}`} className="hover:text-[#efe6d6]">
                {STUDIO.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs text-[#8a7f70]">{STUDIO.hours}</p>
        </div>
      </div>

      <div className="shell pb-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-[#8a7f70]">
        <p>© {new Date().getFullYear()} {STUDIO.legalName}</p>
        <div className="flex gap-5">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>

      <div className="overflow-hidden border-t border-[rgba(239,230,214,0.06)] py-5">
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="display mx-10 text-6xl md:text-7xl text-[rgba(239,230,214,0.05)]">
              Plus Photography · Bole ·
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
