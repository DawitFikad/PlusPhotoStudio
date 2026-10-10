import { formatEtb } from "@/lib/studio";

export const NAV_LINKS = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Collections", href: "/packages" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceSlug =
  | "wedding-photography"
  | "wedding-videography"
  | "event-coverage"
  | "portrait-photography"
  | "commercial-photography"
  | "product-photography"
  | "music-video-production";

export const SERVICES: {
  slug: ServiceSlug;
  number: string;
  title: string;
  short: string;
  tagline: string;
  rate: string;
  startingPrice: number;
  category: "Photography" | "Videography" | "Production";
  image: string;
  desc: string;
  paragraphs: string[];
  deliverables: string[];
  extras: string[];
  faq: { q: string; a: string }[];
  relatedSlug: ServiceSlug;
}[] = [
  {
    slug: "wedding-photography",
    number: "01",
    title: "Wedding Photography",
    short: "Weddings",
    tagline: "Unscripted love, heirloom stills, editorial portraits.",
    rate: "From ETB 25,000",
    startingPrice: 25000,
    category: "Photography",
    image: "/images/hero-wedding.jpg",
    desc: "Poetic documentary coverage of Ethiopian ceremonies — from quiet morning prep to Melse, church, and late reception.",
    paragraphs: [
      "Your wedding is a tapestry of ritual, family, and fleeting light. We work as two calm observers: one on the editorial portrait, one on the unscripted blessing, tear, or laugh that never repeats.",
      "We know Ethiopian ceremonies intimately — Kelekel, church blessing, Melse, and the late ballroom. Direction is gentle. Presence is quiet. Color is graded for skin, gold, and archival print.",
    ],
    deliverables: [
      "Coverage from prep through reception",
      "Private proofing gallery with PIN",
      "Hand-retouched high-resolution files",
      "Optional heirloom linen album",
    ],
    extras: [
      "Additional hours for after-parties",
      "Drone stills where venues permit",
      "Parent gift albums",
      "Next-day announcement set",
    ],
    faq: [
      {
        q: "How many photographers attend?",
        a: "Essential collections include one senior photographer. Signature and Heritage include two, so portraits and documentary never compete for the same moment.",
      },
      {
        q: "When do we receive images?",
        a: "A small preview set within days. The full gallery typically within three to four weeks, depending on the collection.",
      },
    ],
    relatedSlug: "wedding-videography",
  },
  {
    slug: "wedding-videography",
    number: "02",
    title: "Wedding Videography",
    short: "Cinema",
    tagline: "Films that return you to vows, laughter, and song.",
    rate: "From ETB 35,000",
    startingPrice: 35000,
    category: "Videography",
    image: "/images/wedding-ceremony.jpg",
    desc: "Cinema-camera wedding films with documentary audio, warm Ethiopian grade, and a highlight that you will actually rewatch.",
    paragraphs: [
      "We cut for emotion, not spectacle. Vows, speeches, and processional audio are recorded cleanly. Color sits in tungsten warmth without orange skin.",
      "Highlight films run four to ten minutes. Feature edits hold ceremony and speeches in full for the family archive.",
    ],
    deliverables: [
      "4K highlight film",
      "Ceremony and speech documentary edit",
      "Licensed soundtrack or live audio mix",
      "Private streaming delivery",
    ],
    extras: ["Drone operator", "Second cinematographer", "Vertical teasers", "USB keepsake box"],
    faq: [
      {
        q: "Can photography and film share a day?",
        a: "Yes. We schedule the two teams so portraits and cinema never block one another.",
      },
    ],
    relatedSlug: "wedding-photography",
  },
  {
    slug: "event-coverage",
    number: "03",
    title: "Event Coverage",
    short: "Events",
    tagline: "Galas, summits, graduations — documented without theatre.",
    rate: "From ETB 15,000",
    startingPrice: 15000,
    category: "Photography",
    image: "/images/portfolio-event.jpg",
    desc: "Unobtrusive coverage for corporate, diplomatic, and family milestones across Addis Ababa, with rapid preview turnaround.",
    paragraphs: [
      "We move quietly through rooms: speakers, tables, arrivals, and the small exchanges that make a night feel hosted.",
      "Next-day previews are built for press and social. Full archives include commercial usage for the host organisation.",
    ],
    deliverables: [
      "Guest and speaker coverage",
      "Next-day preview batch",
      "High-res archive with licence",
      "Optional recap reel",
    ],
    extras: ["Second photographer", "On-site print station", "Live social desk"],
    faq: [
      {
        q: "How quickly can we publish?",
        a: "Half-day and gala collections include a next-day preview set. Full archives follow within a week.",
      },
    ],
    relatedSlug: "commercial-photography",
  },
  {
    slug: "portrait-photography",
    number: "04",
    title: "Portrait Sessions",
    short: "Portraits",
    tagline: "Sculptural light. Honest expression. Studio or location.",
    rate: "From ETB 6,000",
    startingPrice: 6000,
    category: "Photography",
    image: "/images/portfolio-portrait.jpg",
    desc: "Personal branding, graduation, and editorial portraits in the Bole studio or on location across the capital.",
    paragraphs: [
      "Sessions begin with a short conversation about wardrobe and intent. Lighting is built around bone structure, fabric, and the story you need the photograph to tell.",
      "Traditional dress and contemporary tailoring are equally welcome. Direction is precise, never performative.",
    ],
    deliverables: [
      "Studio or outdoor location",
      "Styling conversation before the day",
      "Master-retouched portraits",
      "Print and social crops",
    ],
    extras: ["Hair and makeup artist", "Additional looks", "Printed folio"],
    faq: [
      {
        q: "Do you help with clothing?",
        a: "Yes. You receive a short brief before the session. We keep a few studio textures and backdrops ready.",
      },
    ],
    relatedSlug: "commercial-photography",
  },
  {
    slug: "commercial-photography",
    number: "05",
    title: "Commercial Photography",
    short: "Commercial",
    tagline: "Campaign stills for hotels, exporters, and enterprises.",
    rate: "From ETB 30,000",
    startingPrice: 30000,
    category: "Photography",
    image: "/images/portfolio-commercial.jpg",
    desc: "Environmental portraits, workplace narrative, and billboard-ready stills with colour-calibrated files.",
    paragraphs: [
      "We treat brand photography as architecture: light, space, people at work. Files are colour-managed for print and web.",
      "Licensing is stated clearly. You own usage as specified in the collection — no surprise restrictions after delivery.",
    ],
    deliverables: [
      "On-site production",
      "Licensed commercial files",
      "Print and web crops",
      "Colour-calibrated masters",
    ],
    extras: ["Art direction", "Crew and grip", "Motion stills"],
    faq: [
      {
        q: "Can you travel outside Addis?",
        a: "Yes. Destination fees are quoted with the collection. We regularly work nationwide.",
      },
    ],
    relatedSlug: "product-photography",
  },
  {
    slug: "product-photography",
    number: "06",
    title: "Product Photography",
    short: "Product",
    tagline: "Hero, lifestyle, and macro — built for catalogues.",
    rate: "From ETB 12,000",
    startingPrice: 12000,
    category: "Photography",
    image: "/images/portrait-studio.jpg",
    desc: "Studio surfaces, lifestyle staging, and focus-stacked detail for exporters and retail brands.",
    paragraphs: [
      "Each SKU is lit for material truth: ceramic, textile, coffee, metal. Cutouts and lifestyle sets share the same colour world.",
      "Delivery includes web, marketplace, and print crops so your team is not resizing in a hurry.",
    ],
    deliverables: [
      "Controlled studio lighting",
      "Hero and detail frames",
      "Lifestyle textures",
      "Transparent cutouts on request",
    ],
    extras: ["Prop styling", "Stop-motion", "Packshot volume days"],
    faq: [
      {
        q: "How many products in a day?",
        a: "Starter collections cover around ten SKUs. Lifestyle collections stretch to twenty-five with styling.",
      },
    ],
    relatedSlug: "commercial-photography",
  },
  {
    slug: "music-video-production",
    number: "07",
    title: "Music Video Production",
    short: "Music",
    tagline: "Performance cinema and concept films in Addis.",
    rate: "From ETB 50,000",
    startingPrice: 50000,
    category: "Production",
    image: "/images/portfolio-musicvideo.jpg",
    desc: "From treatment to 4K master: cinema bodies, lighting crew, grade, and vertical teasers.",
    paragraphs: [
      "We start with a one-page treatment. Locations in Addis are scouted for light, sound, and permits. Performance days are tightly crewed.",
      "Delivery includes a 4K master, a social cutdown, and two vertical teasers.",
    ],
    deliverables: [
      "Treatment and shot list",
      "Cinema lighting crew",
      "4K master edit",
      "Vertical teasers",
    ],
    extras: ["Second unit", "Choreography day", "Lyric overlays"],
    faq: [
      {
        q: "Do you handle permits?",
        a: "We advise and coordinate for common Addis locations. Street and heritage sites may need additional approvals.",
      },
    ],
    relatedSlug: "event-coverage",
  },
];

export type PackageCategory =
  | "Weddings"
  | "Videography"
  | "Events"
  | "Portraits"
  | "Commercial"
  | "Products"
  | "Music Videos";

export const PACKAGES: {
  id: string;
  serviceSlug: ServiceSlug;
  category: PackageCategory;
  name: string;
  price: number;
  duration: string;
  isPopular?: boolean;
  description: string;
  highlights: string[];
}[] = [
  {
    id: "wedding-essential",
    serviceSlug: "wedding-photography",
    category: "Weddings",
    name: "Essential Wedding",
    price: 25000,
    duration: "6 Hours Coverage",
    description: "Intimate ceremonies and couple portraits.",
    highlights: [
      "1 Senior photographer",
      "400+ curated edited photos",
      "Private online gallery",
      "Digital download rights",
    ],
  },
  {
    id: "wedding-signature",
    serviceSlug: "wedding-photography",
    category: "Weddings",
    name: "Signature Wedding",
    price: 45000,
    duration: "10 Hours Coverage",
    isPopular: true,
    description: "Full-day narrative — our most requested collection.",
    highlights: [
      "2 Photographers",
      "700+ colour-graded images",
      "Engagement session",
      "30×30cm linen album",
    ],
  },
  {
    id: "wedding-royal",
    serviceSlug: "wedding-photography",
    category: "Weddings",
    name: "Heritage Royal",
    price: 75000,
    duration: "Wedding + Melse",
    description: "Heirloom coverage for multi-day cultural celebrations.",
    highlights: [
      "2 Seniors + assistant",
      "Wedding day and Melse",
      "1,000+ master files",
      "Leather album + 2 parent albums",
    ],
  },
  {
    id: "video-highlight",
    serviceSlug: "wedding-videography",
    category: "Videography",
    name: "Highlight Film",
    price: 35000,
    duration: "8 Hours Coverage",
    description: "A 4–5 minute cinematic film with live audio.",
    highlights: [
      "1 Filmmaker, cinema rig",
      "4K delivery",
      "Vows and speeches audio",
      "Warm Ethiopian grade",
    ],
  },
  {
    id: "video-signature",
    serviceSlug: "wedding-videography",
    category: "Videography",
    name: "Signature Wedding Cinema",
    price: 60000,
    duration: "12 Hours Coverage",
    isPopular: true,
    description: "Highlight plus documentary ceremony and speeches.",
    highlights: [
      "2 Cinematographers",
      "7–10 minute film",
      "Full ceremony edit",
      "Archival USB gift box",
    ],
  },
  {
    id: "event-half",
    serviceSlug: "event-coverage",
    category: "Events",
    name: "Half-Day Event",
    price: 28000,
    duration: "Up to 6 Hours",
    isPopular: true,
    description: "Symposiums, galas, and family milestones.",
    highlights: [
      "2 Photographers",
      "350+ edited photos",
      "Next-day preview",
      "Commercial licence",
    ],
  },
  {
    id: "event-short",
    serviceSlug: "event-coverage",
    category: "Events",
    name: "Short Coverage",
    price: 15000,
    duration: "3 Hours",
    description: "Focused coverage for compact gatherings.",
    highlights: ["1 Photographer", "150+ photos", "48-hour delivery"],
  },
  {
    id: "portrait-editorial",
    serviceSlug: "portrait-photography",
    category: "Portraits",
    name: "Editorial Portrait",
    price: 12000,
    duration: "2 Hours",
    isPopular: true,
    description: "Studio or location, three wardrobe changes.",
    highlights: [
      "3 Looks, 2 backdrops",
      "15 master-retouched photos",
      "Full proofs",
      "4-day priority delivery",
    ],
  },
  {
    id: "portrait-essential",
    serviceSlug: "portrait-photography",
    category: "Portraits",
    name: "Essential Portrait",
    price: 6000,
    duration: "45 Minutes",
    description: "A concise studio sitting.",
    highlights: ["1 Look", "5 master files", "Studio session"],
  },
  {
    id: "commercial-brand",
    serviceSlug: "commercial-photography",
    category: "Commercial",
    name: "Brand Profile Session",
    price: 30000,
    duration: "Half-Day On-Site",
    isPopular: true,
    description: "Workplace narrative and executive portraits.",
    highlights: [
      "25 licensed images",
      "Colour-calibrated files",
      "Print and web crops",
    ],
  },
  {
    id: "product-standard",
    serviceSlug: "product-photography",
    category: "Products",
    name: "Standard Product Collection",
    price: 25000,
    duration: "Up to 25 Products",
    isPopular: true,
    description: "Lifestyle, studio, and macro for a collection.",
    highlights: ["Lifestyle props", "Hero social sets", "Macro stacking"],
  },
  {
    id: "product-starter",
    serviceSlug: "product-photography",
    category: "Products",
    name: "Starter Catalog",
    price: 12000,
    duration: "10 Products",
    description: "Clean packshots for marketplace launch.",
    highlights: ["Neutral backdrops", "3 angles per SKU", "Clean retouch"],
  },
  {
    id: "music-visualizer",
    serviceSlug: "music-video-production",
    category: "Music Videos",
    name: "Performance Visualizer",
    price: 50000,
    duration: "Single Day / 2 Looks",
    isPopular: true,
    description: "Cinema-camera performance film in Addis Ababa.",
    highlights: [
      "1 Location in Addis",
      "Lighting crew",
      "4K master",
      "2 vertical teasers",
    ],
  },
];

export const PORTFOLIO = [
  {
    slug: "tirunesh-haile-wedding",
    title: "Tirunesh & Haile",
    category: "Weddings",
    year: "2024",
    location: "Addis Ababa",
    client: "Tirunesh Desta & Haile Bekele",
    services: "Wedding photography & engagement",
    duration: "12 hours",
    deliverables: "800+ files, linen album",
    image: "/images/hero-wedding.jpg",
    gallery: [
      "/images/hero-wedding.jpg",
      "/images/wedding-couple.jpg",
      "/images/wedding-ceremony.jpg",
      "/images/wedding-detail.jpg",
    ],
    tagline: "Two golden hours, two families, one quiet narrative.",
    narrative: [
      "Morning prep in Bole, church blessing, garden stills, and a reception that ran late into tungsten light.",
      "Two photographers worked opposite rhythms so portraits never stole the documentary, and family never waited on a pose.",
    ],
  },
  {
    slug: "hanna-dawit-wedding",
    title: "Hanna & Dawit",
    category: "Weddings",
    year: "2024",
    location: "Lalibela",
    client: "Hanna & Dawit",
    services: "Destination wedding photography",
    duration: "Two days",
    deliverables: "Gallery + parent albums",
    image: "/images/wedding-couple.jpg",
    gallery: [
      "/images/wedding-couple.jpg",
      "/images/wedding-detail.jpg",
      "/images/hero-wedding.jpg",
    ],
    tagline: "A highland celebration against rock-hewn sanctuaries.",
    narrative: [
      "We travelled with a lean kit and let the stone, sky, and procession write the frames.",
    ],
  },
  {
    slug: "meron-portraits",
    title: "Meron",
    category: "Portraits",
    year: "2024",
    location: "Bole Studio",
    client: "Meron Haileselassie",
    services: "Editorial portrait session",
    duration: "2 hours",
    deliverables: "20 master portraits",
    image: "/images/portfolio-portrait.jpg",
    gallery: [
      "/images/portfolio-portrait.jpg",
      "/images/portrait-studio.jpg",
      "/images/about-studio.jpg",
    ],
    tagline: "Butterfly light. Tailoring. Habesha kemis.",
    narrative: [
      "Three looks: blazer, evening, traditional. The brief was authority without stiffness.",
    ],
  },
  {
    slug: "selam-coffee-brand",
    title: "Selam Coffee",
    category: "Commercial",
    year: "2024",
    location: "Addis Ababa",
    client: "Selam Specialty Coffee",
    services: "Brand and workplace photography",
    duration: "Full day",
    deliverables: "60 licensed images",
    image: "/images/portfolio-commercial.jpg",
    gallery: [
      "/images/portfolio-commercial.jpg",
      "/images/about-studio.jpg",
      "/images/portrait-studio.jpg",
    ],
    tagline: "Cupping, cherry, and the hands that sort it.",
    narrative: [
      "A day in the lab and roastery for an export brochure that had to feel Ethiopian, not generic hospitality.",
    ],
  },
  {
    slug: "ethiopian-business-gala",
    title: "Business Gala",
    category: "Events",
    year: "2024",
    location: "Sheraton Addis",
    client: "Private host committee",
    services: "Event photography",
    duration: "Evening",
    deliverables: "Press set + archive",
    image: "/images/portfolio-event.jpg",
    gallery: ["/images/portfolio-event.jpg", "/images/about-studio.jpg"],
    tagline: "Black-tie recognition, held without flash theatre.",
    narrative: [
      "Available light, long lenses, and a next-morning press gallery.",
    ],
  },
  {
    slug: "yeshi-music-video",
    title: "Yeshi — Visualizer",
    category: "Music Videos",
    year: "2024",
    location: "Addis Ababa",
    client: "Yeshi",
    services: "Performance visualizer",
    duration: "One day",
    deliverables: "4K master + teasers",
    image: "/images/portfolio-musicvideo.jpg",
    gallery: ["/images/portfolio-musicvideo.jpg", "/images/portrait-studio.jpg"],
    tagline: "Night performance against the city grid.",
    narrative: [
      "A single location, two looks, cinema lighting — cut to the record, not against it.",
    ],
  },
] as const;

export const VALUES = [
  {
    title: "Reverence",
    body: "Ritual, fabric, and family are treated as architecture — never as costume.",
  },
  {
    title: "Precision",
    body: "Light is built, not hoped for. Skin, gold, and shadow are graded for print.",
  },
  {
    title: "Quiet presence",
    body: "We do not perform behind the camera. The room stays yours.",
  },
  {
    title: "Archive",
    body: "Triple backup. Colour-managed files. Albums meant to outlast a hard drive.",
  },
] as const;

export const STATS = [
  { value: "10+", label: "Years in practice" },
  { value: "1,200+", label: "Stories kept" },
  { value: "ETB", label: "Transparent Birr" },
] as const;

export const PACKAGE_FILTERS = [
  "All",
  "Weddings",
  "Videography",
  "Events",
  "Portraits",
  "Commercial",
  "Products",
  "Music Videos",
] as const;

export function packagesForService(slug: ServiceSlug) {
  return PACKAGES.filter((p) => p.serviceSlug === slug);
}

export function serviceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function projectBySlug(slug: string) {
  return PORTFOLIO.find((p) => p.slug === slug);
}

export function featuredPackages() {
  return PACKAGES.filter((p) =>
    ["wedding-essential", "wedding-signature", "wedding-royal"].includes(p.id)
  );
}

export function priceLabel(n: number) {
  return formatEtb(n);
}
