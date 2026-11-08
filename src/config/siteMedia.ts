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

export type { VideoItem, PartnerLogo, CityEvent, DiplomaItem } from "@/types/media";

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
      alt: "Visage Electric elektrotexnika majmuasi",
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

  diplomas: [
    {
      id: "diplom-1",
      title: "Xalqaro Sanoat va Boshqaruv Diplomi",
      issuer: "Xalqaro Standartlar Instituti",
      year: "2018",
      src: "/images/diplomas/diplom-1.webp",
      thumb: "/images/diplomas/diplom-1.webp",
      width: 800,
      height: 1100,
      alt: "Sanoat va xalqaro boshqaruv diplomi",
    },
    {
      id: "diplom-2",
      title: "Eksport va Standartlashtirish Sertifikati",
      issuer: "Tashqi Iqtisodiy Hamkorlik Palatasi",
      year: "2021",
      src: "/images/diplomas/diplom-2.webp",
      thumb: "/images/diplomas/diplom-2.webp",
      width: 800,
      height: 1100,
      alt: "Xalqaro standartlashtirish sertifikati",
    },
  ],

  events: [
    {
      id: "tashkent",
      city: "Toshkent",
      country: "O'zbekiston",
      title: "Ishlab chiqarish va Eksport Forumi",
      date: "Yillik Bosh Forum",
      image: "/images/events/tashkent.webp",
      width: 600,
      height: 800,
      alt: "Toshkentdagi Ishlab chiqarish va Eksport Forumi",
    },
  ],

  testimonials: [] as Array<{
    id: string;
    youtubeId: string;
    title: string;
    author: string;
    role: string;
    company: string;
    client?: string;
    result?: string;
    quote: string;
    duration: string;
    verified: boolean;
    thumb: string;
  }>,

  webinars: [] as Array<{
    id: string;
    youtubeId: string;
    title: string;
    description: string;
    duration: string;
    date: string;
    tag: string;
    thumb: string;
  }>,

  partners: [] as Array<{
    id: string;
    name: string;
    logo: string;
    width: number;
    height: number;
  }>,

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
} as const;
