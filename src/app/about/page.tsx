import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VALUES } from "@/data/content";
import { STUDIO } from "@/lib/studio";
import { StudioLocationWidget } from "@/components/StudioLocationWidget";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "The studio",
  description: "Plus Photography — an independent visual studio in Bole, Addis Ababa.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="shell py-16 border-b border-[rgba(239,230,214,0.08)]">
        <p className="kicker mb-4">{STUDIO.district}</p>
        <h1 className="display text-5xl sm:text-7xl max-w-4xl">
          Your moments.
          <br />
          Our perspective.
        </h1>
        <p className="mt-6 max-w-2xl text-[#c9bba6] leading-relaxed">
          Plus is a small studio that photographs and films with the patience of a print shop. We work from Bole for families, brands, and musicians who want files that last.
        </p>
      </section>

      <section className="shell py-16 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative aspect-[4/5] frame-card overflow-hidden">
          <Image src="/images/about-studio.jpg" alt="Studio interior" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="lg:col-span-6">
          <p className="kicker mb-4">Practice</p>
          <h2 className="display text-4xl sm:text-5xl">A quiet room, a serious archive</h2>
          <p className="mt-5 text-[#c9bba6] leading-relaxed">
            The Bole space holds a sitting suite, a dressing alcove, and a colour-managed desk. We travel with a lean kit for churches, hotels, and locations across Ethiopia.
          </p>
          <Link href="/book" className="btn btn-fill mt-8">
            Book the studio <IconArrow size={13} />
          </Link>
        </div>
      </section>

      <section className="shell pb-16 grid sm:grid-cols-2 gap-5">
        {VALUES.map((v) => (
          <article key={v.title} className="frame-card p-8">
            <h3 className="display text-3xl">{v.title}</h3>
            <p className="mt-3 text-sm text-[#8a7f70] leading-relaxed">{v.body}</p>
          </article>
        ))}
      </section>

      <section className="shell">
        <StudioLocationWidget />
      </section>
    </div>
  );
}
