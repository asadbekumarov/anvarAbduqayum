export interface MediaItem {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface VideoItem {
  id: string; // YouTube ID or "REPLACE_ME"
  title: string;
  author?: string;
  role?: string;
  company?: string;
  thumb: string;
  duration?: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
}

export interface CityEvent {
  id: string;
  city: string;
  country: string;
  title: string;
  date: string;
  image: string;
  width: number;
  height: number;
  alt: string;
}

export interface DiplomaItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
}
