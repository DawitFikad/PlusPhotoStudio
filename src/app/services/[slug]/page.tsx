import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { packagesForService, SERVICES, serviceBySlug } from "@/data/content";
import { IconArrow, IconCheck } from "@/components/icons";
import { priceLabel } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return { title: "Service" };
  return { title: s.title, description: s.desc };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const pkgs = packagesForService(s.slug);
  const related = serviceBySlug(s.relatedSlug);

  return (
    <div className="pt-28 pb-24">
      <section className="relative min-h-[50vh]">
        <Image src={s.image} alt={s.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/50 to-transparent" />
        <div className="relative z-10 shell min-h-[50vh] flex flex-col justify-end pb-12">
          <p className="kicker mb-3">
            {s.number} · {s.category}
          </p>
          <h1 className="display text-5xl sm:text-7xl">{s.title}</h1>
          <p className="mt-3 max-w-xl text-[#c9bba6]">{s.tagline}</p>
        </div>
      </section>

      <section className="shell py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-5 text-[#c9bba6] leading-relaxed">
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="lg:col-span-5 space-y-3">
          {s.deliverables.map((d) => (
            <li key={d} className="flex gap-2 text-sm">
              <IconCheck size={14} className="text-[#c4a35a] mt-0.5 shrink-0" />
              {d}
            </li>
          ))}
        </ul>
      </section>

      {pkgs.length > 0 && (
        <section className="shell pb-16">
          <h2 className="display text-4xl mb-8">Collections</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {pkgs.map((pkg) => (
              <article key={pkg.id} className="frame-card p-6 flex flex-col">
                <h3 className="display text-2xl">{pkg.name}</h3>
                <p className="display text-2xl text-[#c4a35a] mt-2">{priceLabel(pkg.price)}</p>
                <p className="text-xs text-[#8a7f70] mt-1">{pkg.duration}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="text-sm text-[#c9bba6] flex gap-2">
                      <IconCheck size={13} className="text-[#c4a35a] shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href={`/book?service=${s.slug}&package=${pkg.id}`} className="btn btn-fill mt-6">
                  Reserve
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {s.faq.length > 0 && (
        <section className="shell pb-16 max-w-3xl">
          <h2 className="display text-4xl mb-6">Questions</h2>
          <div className="divide-y divide-[rgba(239,230,214,0.1)]">
            {s.faq.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="display text-2xl">{f.q}</h3>
                <p className="mt-2 text-sm text-[#8a7f70]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="shell flex flex-wrap gap-3">
        <Link href="/services" className="btn btn-line">
          All services
        </Link>
        {related && (
          <Link href={`/services/${related.slug}`} className="btn btn-fill">
            Next · {related.title} <IconArrow size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}
