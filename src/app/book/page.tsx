"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PACKAGES, SERVICES, priceLabel } from "@/data/content";
import { sendWeb3BookingNotification } from "@/lib/web3forms";
import { IconArrow, IconCheck } from "@/components/icons";

function BookingWizard() {
  const params = useSearchParams();
  const initialService = params.get("service") || "wedding-photography";
  const initialPkg = params.get("package") || "";

  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(initialService);
  const [packageId, setPackageId] = useState(initialPkg);
  const [custom, setCustom] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("10:00 AM");
  const [avail, setAvail] = useState<{ ok: boolean; msg: string } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [contactPreference, setContactPreference] = useState<"phone" | "whatsapp" | "email">("whatsapp");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ ref: string; amount: number } | null>(null);

  const service = SERVICES.find((s) => s.slug === serviceId) ?? SERVICES[0];
  const pkgs = PACKAGES.filter((p) => p.serviceSlug === service.slug);
  const pkg = pkgs.find((p) => p.id === packageId) ?? pkgs[0];

  const amount = custom ? 0 : pkg?.price ?? 0;

  async function checkDate(date: string) {
    setEventDate(date);
    if (!date) return;
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      const data = await res.json();
      setAvail({
        ok: Boolean(data.available),
        msg: data.available ? "This date is open." : data.reason || "Date unavailable.",
      });
    } catch {
      setAvail({ ok: true, msg: "Tentatively open — we will confirm." });
    }
  }

  async function submit() {
    if (!consent) {
      setError("Please accept the privacy policy.");
      return;
    }
    setBusy(true);
    setError("");
    const payload = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceId: service.slug,
      serviceName: service.title,
      packageName: custom ? "Custom quotation" : pkg.name,
      eventDate,
      preferredStartTime: startTime,
      estimatedDuration: custom ? "Custom" : pkg.duration,
      location,
      specialNotes: notes,
      contactPreference,
      totalAmount: amount,
      consentPrivacy: true,
    };
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setDone({ ref: data.referenceNumber || data.booking?.referenceNumber, amount });
        return;
      }
      await sendWeb3BookingNotification({
        referenceNumber: `PLUS-${Date.now().toString().slice(-4)}`,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        serviceName: service.title,
        packageName: payload.packageName,
        eventDate,
        preferredStartTime: startTime,
        estimatedDuration: payload.estimatedDuration,
        location,
        totalAmount: amount,
        specialNotes: notes,
      });
      if (!res.ok) {
        setError(data.error || "Could not store locally; email was still sent.");
        setBusy(false);
        return;
      }
    } catch {
      const ref = `PLUS-${Date.now().toString().slice(-4)}`;
      await sendWeb3BookingNotification({
        referenceNumber: ref,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        serviceName: service.title,
        packageName: payload.packageName,
        eventDate,
        preferredStartTime: startTime,
        estimatedDuration: payload.estimatedDuration,
        location,
        totalAmount: amount,
        specialNotes: notes,
      });
      setDone({ ref, amount });
    } finally {
      setBusy(false);
    }
  }

  const steps = useMemo(() => ["Discipline", "Collection", "Date", "Details"], []);

  if (done) {
    return (
      <div className="frame-card p-8 max-w-lg mx-auto text-center">
        <IconCheck className="mx-auto text-[#c4a35a]" size={28} />
        <h2 className="display text-4xl mt-4">Held for review</h2>
        <p className="mt-2 text-sm text-[#8a7f70]">
          Reference <span className="font-mono text-[#c4a35a]">{done.ref}</span>
        </p>
        <p className="mt-2 text-sm">{done.amount ? priceLabel(done.amount) : "Custom quotation"}</p>
        <Link href="/" className="btn btn-fill mt-8">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ol className="flex flex-wrap gap-3 mb-10 font-mono text-[0.62rem] tracking-widest uppercase">
        {steps.map((label, i) => (
          <li key={label} className={step === i + 1 ? "text-[#c4a35a]" : "text-[#8a7f70]"}>
            0{i + 1} {label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => {
                setServiceId(s.slug);
                setPackageId("");
              }}
              className={`frame-card p-5 text-left ${serviceId === s.slug ? "border-[#c4a35a]/60" : ""}`}
            >
              <p className="font-mono text-[0.6rem] text-[#c4a35a]">{s.number}</p>
              <p className="display text-2xl mt-1">{s.title}</p>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          {pkgs.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setCustom(false);
                setPackageId(p.id);
              }}
              className={`frame-card p-5 w-full text-left ${!custom && pkg?.id === p.id ? "border-[#c4a35a]/60" : ""}`}
            >
              <div className="flex justify-between gap-4">
                <span className="display text-2xl">{p.name}</span>
                <span className="text-[#c4a35a]">{priceLabel(p.price)}</span>
              </div>
              <p className="text-xs text-[#8a7f70] mt-1">{p.duration}</p>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCustom(true)}
            className={`frame-card p-5 w-full text-left ${custom ? "border-[#c4a35a]/60" : ""}`}
          >
            <span className="display text-2xl">Custom quotation</span>
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
          <label className="text-xs text-[#8a7f70]">
            Date
            <input type="date" className="field mt-1" value={eventDate} onChange={(e) => checkDate(e.target.value)} />
          </label>
          <label className="text-xs text-[#8a7f70]">
            Start
            <select className="field mt-1" value={startTime} onChange={(e) => setStartTime(e.target.value)}>
              {["08:00 AM", "09:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          {avail && <p className={`sm:col-span-2 text-sm ${avail.ok ? "text-[#c4a35a]" : "text-red-300"}`}>{avail.msg}</p>}
        </div>
      )}

      {step === 4 && (
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <label className="text-xs text-[#8a7f70]">
            Name
            <input className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="text-xs text-[#8a7f70]">
            Email
            <input type="email" className="field mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="text-xs text-[#8a7f70]">
            Phone
            <input className="field mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label className="text-xs text-[#8a7f70]">
            Venue / location
            <input className="field mt-1" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </label>
          <label className="sm:col-span-2 text-xs text-[#8a7f70]">
            Notes
            <textarea className="field mt-1 min-h-24" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <label className="text-xs text-[#8a7f70]">
            Prefer
            <select
              className="field mt-1"
              value={contactPreference}
              onChange={(e) => setContactPreference(e.target.value as typeof contactPreference)}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
            </select>
          </label>
          <label className="sm:col-span-2 flex items-start gap-2 text-xs text-[#8a7f70]">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            I agree to the{" "}
            <Link href="/privacy" className="text-[#c4a35a]">
              privacy policy
            </Link>
            .
          </label>
          {error && <p className="sm:col-span-2 text-xs text-red-300">{error}</p>}
        </div>
      )}

      <div className="mt-8 flex gap-3">
        {step > 1 && (
          <button type="button" className="btn btn-line" onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            className="btn btn-fill"
            onClick={() => {
              if (step === 3 && (!eventDate || avail?.ok === false)) return;
              setStep((s) => s + 1);
            }}
          >
            Continue <IconArrow size={13} />
          </button>
        ) : (
          <button type="button" className="btn btn-fill" disabled={busy} onClick={submit}>
            {busy ? "Sending…" : "Submit reservation"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="shell py-14">
        <p className="kicker mb-4">Reserve</p>
        <h1 className="display text-5xl sm:text-7xl mb-10">Hold a date with the studio</h1>
        <Suspense fallback={<p className="text-sm text-[#8a7f70]">Loading reservation desk…</p>}>
          <BookingWizard />
        </Suspense>
      </section>
    </div>
  );
}
