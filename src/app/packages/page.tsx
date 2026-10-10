"use client";

import { useState } from "react";
import Link from "next/link";
import { PACKAGES, PACKAGE_FILTERS, priceLabel } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import { IconCheck } from "@/components/icons";

export default function PackagesPage() {
  const [filter, setFilter] = useState<(typeof PACKAGE_FILTERS)[number]>("All");
  const items = filter === "All" ? PACKAGES : PACKAGES.filter((p) => p.category === filter);

  return (
    <div className="pt-28 pb-24">
      <section className="shell py-14 border-b border-[rgba(239,230,214,0.08)]">
        <p className="kicker mb-4">Collections</p>
        <h1 className="display text-5xl sm:text-7xl">Published rates in ETB</h1>
        <p className="mt-4 max-w-xl text-[#8a7f70]">
          Transparent Birr. Custom quotations available for destination and hybrid days.
        </p>
      </section>
      <section className="shell py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {PACKAGE_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-2 font-mono text-[0.6rem] tracking-widest uppercase border ${
                filter === f ? "bg-[#c4a35a] text-[#080706] border-[#c4a35a]" : "border-[rgba(239,230,214,0.14)] text-[#c9bba6]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((pkg, i) => (
            <Reveal key={pkg.id} delay={(i % 3) * 0.05}>
              <article className={`frame-card p-6 h-full flex flex-col ${pkg.isPopular ? "border-[#c4a35a]/50" : ""}`}>
                <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#8a7f70]">
                  {pkg.category} · {pkg.duration}
                </p>
                <h2 className="display text-3xl mt-2">{pkg.name}</h2>
                <p className="display text-2xl text-[#c4a35a] mt-2">{priceLabel(pkg.price)}</p>
                <p className="text-sm text-[#8a7f70] mt-2">{pkg.description}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-[#c9bba6]">
                      <IconCheck size={13} className="text-[#c4a35a] shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href={`/book?service=${pkg.serviceSlug}&package=${pkg.id}`} className="btn btn-fill mt-6">
                  Reserve
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
