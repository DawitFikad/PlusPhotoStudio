"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";

const filters = ["All", "Weddings", "Portraits", "Commercial", "Events", "Music Videos"] as const;

export default function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <div className="pt-28 pb-24">
      <section className="shell py-14 border-b border-[rgba(239,230,214,0.08)]">
        <p className="kicker mb-4">Work</p>
        <h1 className="display text-5xl sm:text-7xl max-w-3xl">Selected stories from the studio</h1>
        <p className="mt-5 max-w-xl text-[#8a7f70]">
          A short exhibition. Each set is a real commission — wedding, portrait, brand, or film.
        </p>
      </section>

      <section className="shell py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-mono text-[0.62rem] tracking-[0.18em] uppercase border ${
                filter === f
                  ? "bg-[#c4a35a] text-[#080706] border-[#c4a35a]"
                  : "border-[rgba(239,230,214,0.14)] text-[#c9bba6]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.06}>
              <Link href={`/portfolio/${item.slug}`} className="frame-card group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent opacity-80" />
                  <div className="absolute bottom-0 p-5">
                    <p className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-[#c4a35a]">
                      {item.category} · {item.year}
                    </p>
                    <h2 className="display text-2xl mt-1">{item.title}</h2>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
