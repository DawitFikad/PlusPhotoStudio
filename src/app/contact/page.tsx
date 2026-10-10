"use client";

import { useState } from "react";
import { SERVICES } from "@/data/content";
import { STUDIO, telHref, whatsappHref } from "@/lib/studio";
import { sendWeb3ContactInquiry } from "@/lib/web3forms";
import { StudioLocationWidget } from "@/components/StudioLocationWidget";
import { IconCheck, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/icons";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "wedding-photography",
    contactPreference: "whatsapp",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("busy");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("ok");
        return;
      }
      const web3 = await sendWeb3ContactInquiry(form);
      if (web3.success) setStatus("ok");
      else {
        setStatus("err");
        setError(web3.message);
      }
    } catch {
      const web3 = await sendWeb3ContactInquiry(form);
      setStatus(web3.success ? "ok" : "err");
    }
  }

  return (
    <div className="pt-28 pb-24">
      <section className="shell py-14 border-b border-[rgba(239,230,214,0.08)]">
        <p className="kicker mb-4">Contact</p>
        <h1 className="display text-5xl sm:text-7xl">Write, call, or walk in</h1>
      </section>

      <section className="shell py-14 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <a href={whatsappHref()} className="frame-card p-5 flex items-center gap-4 hover:border-[#c4a35a]/50">
            <span className="icon-chip">
              <IconWhatsApp />
            </span>
            <div>
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#c4a35a]">WhatsApp</p>
              <p className="text-sm">{STUDIO.phoneDisplay}</p>
            </div>
          </a>
          <a href={telHref()} className="frame-card p-5 flex items-center gap-4">
            <span className="icon-chip">
              <IconPhone />
            </span>
            <div>
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#c4a35a]">Phone</p>
              <p className="text-sm">{STUDIO.phoneDisplay}</p>
            </div>
          </a>
          <a href={`mailto:${STUDIO.email}`} className="frame-card p-5 flex items-center gap-4">
            <span className="icon-chip">
              <IconMail />
            </span>
            <div>
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#c4a35a]">Email</p>
              <p className="text-sm">{STUDIO.email}</p>
            </div>
          </a>
          <div className="frame-card p-5 flex items-center gap-4">
            <span className="icon-chip">
              <IconPin />
            </span>
            <div>
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#c4a35a]">Studio</p>
              <p className="text-sm">
                {STUDIO.district}
                <br />
                {STUDIO.landmark}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {status === "ok" ? (
            <div className="frame-card p-8">
              <IconCheck className="text-[#c4a35a]" />
              <h2 className="display text-3xl mt-4">Received</h2>
              <p className="mt-2 text-sm text-[#8a7f70]">The desk will reply by your preferred channel.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-xs text-[#8a7f70]">
                  Name
                  <input className="field mt-1" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </label>
                <label className="block text-xs text-[#8a7f70]">
                  Email
                  <input type="email" className="field mt-1" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>
              </div>
              <label className="block text-xs text-[#8a7f70]">
                Phone
                <input className="field mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-xs text-[#8a7f70]">
                  Service
                  <select className="field mt-1" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs text-[#8a7f70]">
                  Prefer
                  <select
                    className="field mt-1"
                    value={form.contactPreference}
                    onChange={(e) => setForm({ ...form, contactPreference: e.target.value })}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                </label>
              </div>
              <label className="block text-xs text-[#8a7f70]">
                Message
                <textarea
                  className="field mt-1 min-h-32"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              {status === "err" && <p className="text-xs text-red-300">{error}</p>}
              <button type="submit" className="btn btn-fill" disabled={status === "busy"}>
                {status === "busy" ? "Sending…" : "Send inquiry"}
              </button>
              <p className="text-[0.65rem] text-[#8a7f70]">Delivered by Web3Forms to the studio inbox.</p>
            </form>
          )}
        </div>
      </section>

      <section className="shell">
        <StudioLocationWidget />
      </section>
    </div>
  );
}
