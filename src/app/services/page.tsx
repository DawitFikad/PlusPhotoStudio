import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/content";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description: "Wedding photography, cinema, portraits, events, commercial, product, and music video production in Bole, Addis Ababa.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="shell py-14 border-b border-[rgba(239,230,214,0.08)]">
        <p className="kicker mb-4">Services</p>
        <h1 className="display text-5xl sm:text-7xl max-w-3xl">Seven ways we work with light</h1>
      </section>
      <section className="shell py-12 space-y-6">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="frame-card group grid md:grid-cols-12 overflow-hidden">
            <div className="relative md:col-span-5 aspect-[16/10] md:aspect-auto min-h-[220px]">
              <Image src={s.image} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="40vw" />
            </div>
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
              <p className="font-mono text-[0.65rem] text-[#c4a35a]">{s.number} · {s.rate}</p>
              <h2 className="display text-3xl sm:text-4xl mt-2">{s.title}</h2>
              <p className="mt-3 text-sm text-[#8a7f70] max-w-lg">{s.desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[#c4a35a] font-mono text-[0.65rem] tracking-widest uppercase">
                View collection <IconArrow size={13} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
