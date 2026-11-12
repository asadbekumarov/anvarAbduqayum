/**
 * Media and Asset Registry for Anvar Abduqayum Website
 * Follows "Qolip" concept: industrial blueprint portraits, partner/factory logos,
 * and technical schematics.
 */

export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumb: string;
  duration?: string;
  client?: string;
  company?: string;
  author?: string;
  role?: string;
  result?: string;
}

export interface DiplomaItem {
  id: string;
  src: string;
  thumb: string;
  title: string;
  issuer: string;
  year: string;
  alt: string;
}

export interface EventItem {
  id: string;
  country: string;
  city: string;
  image: string;
  alt: string;
  title: string;
  date: string;
}

export interface PartnerItem {
  id: string;
  logo: string;
  name: string;
}

export const siteMedia = {
  brand: {
    logoText: "ANVAR ABDUQAYUM",
    blueprintTag: "QOLIP INDUSTRIAL // EST. 2004",
    ogImage: "/images/brand/og-image.png",
  },

  hero: {
    portrait: {
      src: "/images/hero/portrait.webp",
      width: 900,
      height: 1100,
      alt: "Anvar Abduqayum — Sanoatchi, Muhandis-Tadbirkor va Eksportchi",
    },
    blueprintGrid: {
      src: "/images/hero/grid-1.png",
      width: 800,
      height: 800,
      alt: "Texnik qolip chizmasi to'ri",
    },
  },

  expert: {
    portrait: {
      src: "/images/expert/portrait.webp",
      width: 800,
      height: 1000,
      alt: "Anvar Abduqayum amaliyotchi tadbirkor va biznes-mentor portreti",
    },
  },

  book: {
    cover: {
      src: "/images/book/cover.jpg",
      width: 700,
      height: 900,
      alt: "«Tadbirkorlikning yozilmagan qonunlari» kitobi muqovasi",
    },
    previews: [
      {
        id: "difficulties",
        src: "/images/book/page-1.webp",
        width: 800,
        height: 1000,
        alt: "Biznesda duch kelgan qiyinchiliklar va 7 ta xato tahlili",
      },
      {
        id: "cover",
        src: "/images/book/cover.jpg",
        width: 700,
        height: 900,
        alt: "«Tadbirkorlikning yozilmagan qonunlari» kitobi asosiy muqovasi",
      },
    ],
  },

  companies: {
    toybola: {
      logo: "/images/partners/toy_bola.webp",
      alt: "Toybola Toys bolalar o'yinchoqlari zavodi",
    },
    samtech: {
      logo: "/images/partners/tekhno.webp",
      alt: "Samtech Masterbatches polimer xomashyosi korxonasi",
    },
    visage: {
      logo: "/images/partners/atla_plast.webp",
      alt: "VISAGE ELECTRIC MChJ — Toybola bolalar o'yinchoqlari ishlab chiqarish korxonasi",
    },
    puro: {
      logo: "/images/partners/puro.webp",
      alt: "PURO Gelateria & Cafeteria tarmog'i",
    },
    afiyet: {
      logo: "/images/partners/afiyet.webp",
      alt: "AFIYET Doner Kebab restoranlar tarmog'i",
    },
    itsupport: {
      logo: "/images/partners/eputy.webp",
      alt: "IT Support & Service korxonalarni avtomatlashtirish",
    },
    uzbic: {
      logo: "/images/partners/uzbic.webp",
      alt: "UZBIC O'zbekiston Biznes va Sanoat Kengashi",
    },
  },

  pressLogos: {
    gazeta: {
      name: "Gazeta.uz",
      domain: "gazeta.uz",
    },
    kun: {
      name: "Kun.uz",
      domain: "kun.uz",
    },
    spot: {
      name: "Spot.uz",
      domain: "spot.uz",
    },
    daryo: {
      name: "Daryo.uz",
      domain: "daryo.uz",
    },
  },

  diplomas: [] as DiplomaItem[],
  events: [] as EventItem[],
  partners: [] as PartnerItem[],
  testimonials: [] as VideoItem[],
  webinars: [] as VideoItem[],
} as const;
