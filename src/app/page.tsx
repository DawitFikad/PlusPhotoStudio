"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { featuredPackages, PORTFOLIO, SERVICES, STATS } from "@/data/content";
import { STUDIO } from "@/lib/studio";
import { StudioLocationWidget } from "@/components/StudioLocationWidget";
import { Reveal, RevealText } from "@/components/motion/Reveal";
import { IconArrow, IconArrowUp, IconCheck, IconPin } from "@/components/icons";
import { priceLabel } from "@/data/content";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/hero-wedding.jpg"
          alt="Wedding photography by Plus Photography, Bole, Addis Ababa"
          fill
          priority
          quality={90}
          className="object-cover object-[center_30%] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/45 to-[#080706]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080706]/80 via-transparent to-[#080706]/35" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 shell min-h-[100svh] flex flex-col justify-end pb-16 md:pb-24 pt-28">
        <p className="kicker mb-5">Fine stills · Cinema · Bole</p>
        <h1 className="display text-[clamp(3.1rem,9vw,8.4rem)] text-[#efe6d6] max-w-5xl">
          Your moments.
          <br />
          <em className="not-italic text-[#c4a35a]">Our perspective.</em>
        </h1>
        <p className="mt-6 max-w-xl text-[#c9bba6] text-base sm:text-lg font-light leading-relaxed">
          A working photography and cinema studio in {STUDIO.district}. We keep the room quiet, the light honest, and the archive print-ready.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/portfolio" className="btn btn-line">
            Selected work <IconArrow size={13} />
          </Link>
          <Link href="/book" className="btn btn-fill">
            Reserve a sitting <IconArrowUp size={13} />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-3 max-w-lg gap-6 border-t border-[rgba(239,230,214,0.12)] pt-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="display text-2xl sm:text-3xl">{s.value}</p>
              <p className="font-mono text-[0.58rem] tracking-widest uppercase text-[#8a7f70] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute top-28 right-6 hidden md:flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[#c9bba6]">
        <IconPin size={12} className="text-[#c4a35a]" />
        {STUDIO.coordsLabel}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-24 md:py-32 border-t border-[rgba(239,230,214,0.08)]">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <RevealText>
                <p className="kicker mb-4">Exhibition</p>
              </RevealText>
              <Reveal>
                <h2 className="display text-4xl sm:text-6xl">
                  Frames we were
                  <br />
                  trusted to keep
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link href="/portfolio" className="btn btn-line">
                Full gallery <IconArrow size={13} />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {PORTFOLIO.slice(0, 5).map((item, i) => (
              <Reveal
                key={item.slug}
                delay={i * 0.06}
                className={i === 0 ? "md:col-span-8" : "md:col-span-4"}
              >
                <Link href={`/portfolio/${item.slug}`} className="frame-card group block">
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-[4/3]"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 p-5 sm:p-6">
                      <p className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-[#c4a35a]">
                        {item.category} · {item.year}
                      </p>
                      <h3 className="display text-2xl sm:text-3xl mt-1">{item.title}</h3>
                      <p className="text-xs text-[#c9bba6] mt-1 line-clamp-2">{item.tagline}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#0e0c0a] border-y border-[rgba(239,230,214,0.08)]">
        <div className="shell">
          <Reveal className="mb-14">
            <p className="kicker mb-4">Seven disciplines</p>
            <h2 className="display text-4xl sm:text-6xl max-w-3xl">
              One standard of light, seven kinds of work
            </h2>
          </Reveal>
          <div className="divide-y divide-[rgba(239,230,214,0.1)]">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[4.5rem_1fr_auto_auto] items-center gap-4 md:gap-8 py-5"
                >
                  <span className="font-mono text-[#c4a35a] text-xs">{s.number}</span>
                  <span>
                    <span className="display text-2xl sm:text-3xl group-hover:text-[#e0c27a] transition-colors">
                      {s.title}
                    </span>
                    <span className="block text-xs text-[#8a7f70] mt-1 md:hidden">{s.rate}</span>
                  </span>
                  <span className="hidden md:block font-mono text-[0.65rem] tracking-widest uppercase text-[#8a7f70]">
                    {s.rate}
                  </span>
                  <IconArrow className="text-[#c4a35a] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="shell grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] frame-card overflow-hidden">
              <Image src="/images/about-studio.jpg" alt="Plus Photography studio, Bole" fill className="object-cover" sizes="50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-6">
            <p className="kicker mb-4">Approach</p>
            <h2 className="display text-4xl sm:text-5xl">
              Thoughtfully made.
              <br />
              Kept for the archive.
            </h2>
            <p className="mt-6 text-[#c9bba6] leading-relaxed">
              We listen before we light. On the day we stay out of the ritual. In the suite, every file is graded for skin and longevity — not for a trend filter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-fill">
                The studio <IconArrow size={13} />
              </Link>
              <Link href="/contact" className="btn btn-line">
                Visit Bole
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#0e0c0a] border-y border-[rgba(239,230,214,0.08)]">
        <div className="shell">
          <Reveal className="mb-12">
            <p className="kicker mb-4">Collections in ETB</p>
            <h2 className="display text-4xl sm:text-6xl">Published wedding stills</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredPackages().map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.08}>
                <article className={`frame-card p-7 h-full flex flex-col ${pkg.isPopular ? "border-[#c4a35a]/50" : ""}`}>
                  {pkg.isPopular && (
                    <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#c4a35a] mb-3">Most requested</p>
                  )}
                  <p className="font-mono text-[0.62rem] uppercase tracking-widest text-[#8a7f70]">{pkg.duration}</p>
                  <h3 className="display text-3xl mt-2">{pkg.name}</h3>
                  <p className="display text-3xl text-[#c4a35a] mt-3">{priceLabel(pkg.price)}</p>
                  <ul className="mt-6 space-y-2 flex-1">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-[#c9bba6]">
                        <IconCheck size={14} className="text-[#c4a35a] shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/book?package=${pkg.id}`} className="btn btn-fill mt-8 w-full">
                    Reserve
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/packages" className="btn btn-line">
              All collections <IconArrow size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="shell">
          <Reveal className="mb-10">
            <p className="kicker mb-4">Coordinates</p>
            <h2 className="display text-4xl sm:text-6xl">Come to Bole</h2>
          </Reveal>
          <Reveal>
            <StudioLocationWidget />
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#12100e] text-center">
        <Reveal className="shell max-w-3xl mx-auto">
          <p className="kicker justify-center mb-5">Begin</p>
          <h2 className="display text-4xl sm:text-6xl md:text-7xl">
            Make something
            <br />
            worth keeping
          </h2>
          <p className="mt-6 text-[#8a7f70]">Weddings, portraits, brands, and music — quoted in Ethiopian Birr.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/book" className="btn btn-fill">
              Reserve <IconArrow size={13} />
            </Link>
            <Link href="/contact" className="btn btn-line">
              Write the desk
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
