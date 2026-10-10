export const STUDIO = {
  name: "Plus Photography",
  legalName: "Plus Photography Studio PLC",
  tagline: "Your moments. Our perspective.",
  district: "Bole, Addis Ababa",
  country: "Ethiopia",
  landmark: "Near Bole Medhanialem & Edna Mall",
  coords: { lat: 8.9897, lng: 38.7885 },
  coordsLabel: "8.9897° N, 38.7885° E",
  hours: "Mon – Sat · 09:00 – 18:30 EAT",
  hoursSunday: "Sunday by private appointment",
  email: "hello@plusphotography.et",
  phoneDisplay: "+251 91 100 0000",
  phoneTel: "+251911000000",
  phoneSecondary: "+251 92 200 0000",
  whatsapp: "251911000000",
  whatsappMessage:
    "Hello Plus Photography Bole Studio — I would like to inquire about a photography or videography session.",
  mapsQuery: "8.9897,38.7885",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
} as const;

export function whatsappHref(message = STUDIO.whatsappMessage) {
  return `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telHref() {
  return `tel:${STUDIO.phoneTel}`;
}

export function mapsHref(origin?: { lat: number; lng: number }) {
  if (origin) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${STUDIO.coords.lat},${STUDIO.coords.lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${STUDIO.coords.lat},${STUDIO.coords.lng}`;
}

export function formatEtb(amount: number) {
  return `ETB ${amount.toLocaleString("en-ET")}`;
}
