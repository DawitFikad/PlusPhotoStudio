import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Plus Photography handles client information in Bole, Addis Ababa.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24">
      <article className="shell py-14 max-w-3xl">
        <p className="kicker mb-4">Legal</p>
        <h1 className="display text-5xl sm:text-6xl">Privacy</h1>
        <p className="mt-3 font-mono text-[0.65rem] tracking-widest uppercase text-[#8a7f70]">
          Effective 1 January 2025 · Bole, Addis Ababa
        </p>
        <div className="mt-12 space-y-8 text-sm leading-relaxed text-[#c9bba6]">
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">What we collect</h2>
            <p>
              Name, phone or WhatsApp, email, event date and venue, package selection, and notes you send through Web3Forms. We do not store card numbers.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">Location</h2>
            <p>
              Distance to the studio is calculated in your browser only when you grant GPS access. Coordinates are not stored on our servers.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">Portfolio</h2>
            <p>
              We may show selected frames from commissions unless you request a private sitting in writing before the day.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-[#efe6d6] mb-3">Contact</h2>
            <p className="font-mono text-[#efe6d6]">privacy@plusphotography.et</p>
          </section>
        </div>
      </article>
    </div>
  );
}
