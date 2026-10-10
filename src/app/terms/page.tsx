import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Booking and engagement terms for Plus Photography, Bole, Addis Ababa.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24">
      <article className="shell py-14 max-w-3xl">
        <p className="kicker mb-4">Legal</p>
        <h1 className="display text-5xl sm:text-6xl">Terms of engagement</h1>
        <p className="mt-3 font-mono text-[0.65rem] tracking-widest uppercase text-[#8a7f70]">
          Effective 1 January 2025 · Ethiopia
        </p>
        <div className="mt-12 space-y-8 text-sm leading-relaxed text-[#c9bba6]">
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">Reservation</h2>
            <p>
              A website request holds nothing until we confirm in writing and a 30% retainer in ETB is received.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">Balance</h2>
            <p>The remaining 70% is due on the shoot day or as stated in the agreement. Rates are Ethiopian Birr.</p>
          </section>
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">Changes</h2>
            <p>
              Weddings: 14 days’ notice to reschedule. Studio portraits: 48 hours, subject to the calendar.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">Delivery</h2>
            <p>Portraits 5–7 days. Wedding stills 3–4 weeks. Films 4–6 weeks. Colour and edit remain studio discretion.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
