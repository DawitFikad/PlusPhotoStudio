import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Plus Photography database seed...");

  // 1. Seed Services
  const services = [
    {
      slug: "wedding-photography",
      title: "Wedding Photography",
      subtitle: "Poetic documentary storytelling for authentic Ethiopian weddings.",
      category: "Photography",
      heroImage: "/images/hero-wedding.jpg",
      description: "Natural emotions, portraits, ceremony details, and celebrations.",
      startingPrice: 25000,
    },
    {
      slug: "wedding-videography",
      title: "Wedding Videography",
      subtitle: "Cinematic films that preserve every vow, heartbeat, and celebration.",
      category: "Videography",
      heroImage: "/images/portfolio-musicvideo.jpg",
      description: "Cinematic wedding films and documentary edits.",
      startingPrice: 35000,
    },
    {
      slug: "event-coverage",
      title: "Event Photography & Videography",
      subtitle: "Documenting milestone celebrations and diplomatic summits.",
      category: "Full Production",
      heroImage: "/images/portfolio-event.jpg",
      description: "Coverage for birthdays, graduations, and corporate summits.",
      startingPrice: 15000,
    },
    {
      slug: "portrait-photography",
      title: "Portrait Photography",
      subtitle: "Sculpted lighting and comfortable direction for distinctive character.",
      category: "Photography",
      heroImage: "/images/portfolio-portrait.jpg",
      description: "Graduation portraits, executive headshots, and creative branding.",
      startingPrice: 6000,
    },
    {
      slug: "commercial-photography",
      title: "Commercial Photography",
      subtitle: "High-impact visual campaigns for enterprises and hospitality.",
      category: "Photography",
      heroImage: "/images/portfolio-commercial.jpg",
      description: "Brand campaigns, editorial content, and advertising imagery.",
      startingPrice: 30000,
    },
    {
      slug: "product-photography",
      title: "Product Photography",
      subtitle: "Crisp details, tactile textures, and luxury catalog compositions.",
      category: "Photography",
      heroImage: "/images/about-studio.jpg",
      description: "Clean product imagery and lifestyle sets.",
      startingPrice: 12000,
    },
    {
      slug: "music-video-production",
      title: "Music Video Production",
      subtitle: "Evocative cinematography, rhythm, and bold artistic vision.",
      category: "Full Production",
      heroImage: "/images/portfolio-musicvideo.jpg",
      description: "Script, storyboard, filming, and cinematic color grading.",
      startingPrice: 50000,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        category: s.category,
        heroImage: s.heroImage,
        description: s.description,
        startingPrice: s.startingPrice,
        currency: "ETB",
      },
    });
  }

  console.log(`✅ Seeded ${services.length} services.`);

  // 2. Blocked Dates (Addis Ababa public celebrations)
  const blockedDates = [
    { date: new Date("2025-01-07T00:00:00Z"), reason: "Ethiopian Christmas (Genna)" },
    { date: new Date("2025-01-19T00:00:00Z"), reason: "Ethiopian Epiphany (Timket)" },
    { date: new Date("2025-09-11T00:00:00Z"), reason: "Ethiopian New Year (Enkutatash)" },
    { date: new Date("2025-09-27T00:00:00Z"), reason: "Meskel Celebration" },
  ];

  for (const b of blockedDates) {
    await prisma.blockedDate.upsert({
      where: { date: b.date },
      update: {},
      create: {
        date: b.date,
        reason: b.reason,
      },
    });
  }

  console.log("✅ Seeded studio holiday blocked dates.");
  console.log("🌟 Plus Photography database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
