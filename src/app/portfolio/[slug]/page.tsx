import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PORTFOLIO, projectBySlug } from "@/data/content";
import { IconArrow } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Work" };
  return { title: project.title, description: project.tagline };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const idx = PORTFOLIO.findIndex((p) => p.slug === slug);
  const next = PORTFOLIO[(idx + 1) % PORTFOLIO.length];

  return (
    <div className="pt-28 pb-24">
      <section className="relative min-h-[62vh] overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-transparent" />
        <div className="relative z-10 shell min-h-[62vh] flex flex-col justify-end pb-12">
          <p className="kicker mb-3">
            {project.category} · {project.year}
          </p>
          <h1 className="display text-5xl sm:text-7xl">{project.title}</h1>
          <p className="mt-3 max-w-xl text-[#c9bba6]">{project.tagline}</p>
        </div>
      </section>

      <section className="shell py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-5 text-[#c9bba6] leading-relaxed">
          {project.narrative.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <aside className="lg:col-span-5 space-y-4 font-mono text-xs tracking-wide uppercase text-[#8a7f70]">
          <p>
            Location
            <br />
            <span className="text-[#efe6d6] normal-case tracking-normal font-sans text-sm">{project.location}</span>
          </p>
          <p>
            Client
            <br />
            <span className="text-[#efe6d6] normal-case tracking-normal font-sans text-sm">{project.client}</span>
          </p>
          <p>
            Duration
            <br />
            <span className="text-[#efe6d6] normal-case tracking-normal font-sans text-sm">{project.duration}</span>
          </p>
          <p>
            Delivered
            <br />
            <span className="text-[#efe6d6] normal-case tracking-normal font-sans text-sm">{project.deliverables}</span>
          </p>
        </aside>
      </section>

      <section className="shell grid sm:grid-cols-2 gap-4">
        {project.gallery.map((src) => (
          <div key={src} className="relative aspect-[4/5] overflow-hidden frame-card">
            <Image src={src} alt="" fill className="object-cover" sizes="50vw" />
          </div>
        ))}
      </section>

      <div className="shell mt-16 flex items-center justify-between">
        <Link href="/portfolio" className="btn btn-line">
          All work
        </Link>
        <Link href={`/portfolio/${next.slug}`} className="btn btn-fill">
          Next · {next.title} <IconArrow size={13} />
        </Link>
      </div>
    </div>
  );
}
