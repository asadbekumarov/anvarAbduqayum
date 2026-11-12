# Anvar Abduqayum — Personal Brand, Industrial Portfolio & B2B Platform

> **Comprehensive Project Reference (For Developers & AI Agents)**  
> This document describes the full architecture, configuration, security model, routes, APIs, design system, and operational rules of the **Anvar Abduqayum** web platform.

---

## 1. Project Overview

This is a multilingual (**Uzbek**, **Russian**, **English**) Next.js App Router web application built for **Anvar Abduqayum** — industrial entrepreneur, engineer, exporter, and business mentor (founder/partner across manufacturing, HoReCa, and internal IT ventures, and Chairman/participant of UZBIC).

The current active release (**Concept 3 / "Qolip" Industrial Editorial**) is a compact 5-section landing experience paired with a localized meeting booking route (`/[locale]/bron`), a feature-flagged diagnostic quiz route (`/[locale]/test`), and hardened Node.js API routes that dispatch leads and Cal.com booking events to Telegram.

> **Important Note on Legacy Artifacts:**
> - `package.json` still carries `"name": "ilhom-begimqulov"` from an earlier project template.
> - `docs/DESIGN.md` and `docs/CONTENT.md` are earlier planning/specification documents and do **not** reflect the active 5-section Concept 3 layout or `featuresConfig` toggles. **Always treat `src/config/*` as the single source of truth.**

---

## 2. Tech Stack

| Layer | Technology | Version / Details |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `^15.1.7` |
| **UI Library** | React / React DOM | `^19.0.0` |
| **Language** | TypeScript | `^5.7.3` (`strict: true`, `@/*` -> `./src/*`) |
| **Styling** | Tailwind CSS + CSS Variables | `^3.4.17` (`src/app/globals.css`, `src/config/theme.ts`) |
| **i18n** | `next-intl` | `^3.26.3` (`uz` default, `ru`, `en`; `localePrefix: "always"`) |
| **Validation** | Zod | `^3.24.2` |
| **Booking** | `@calcom/embed-react` + Telegram | `^1.5.3` |
| **Animation & UX** | `framer-motion`, `lenis`, `radix-ui`, `react-aria-components` | Smooth scrolling, accessible modals/tabs |
| **Package Manager** | `pnpm` | `10.15.1` |
| **QA / Automation** | Playwright + ESLint | `^1.64.1` / `^9.20.1` |

---

## 3. Directory Structure

```text
.
├── public/
│   └── images/                 # Static assets: hero, expert, book, diplomas, events, partners, brand OG
├── scripts/                    # Playwright verification, screenshot capture, and content audit scripts
├── docs/                       # Legacy planning docs (CONTENT.md, DESIGN.md)
├── src/
│   ├── middleware.ts           # next-intl routing, HSTS, X-Robots-Tag, disabled-route gating
│   ├── app/
│   │   ├── globals.css         # Concept 3 CSS design tokens (Alabaster / Obsidian / Gold)
│   │   ├── layout.tsx          # Root layout
│   │   ├── robots.ts           # Dynamic robots.txt (gated by isIndexingEnabled)
│   │   ├── sitemap.ts          # Dynamic sitemap.xml (gated by isIndexingEnabled)
│   │   ├── [locale]/
│   │   │   ├── layout.tsx      # Google Fonts, JSON-LD Schema.org, NextIntlClientProvider, Demo Banner
│   │   │   ├── page.tsx        # Homepage (5 active sections controlled by featuresConfig)
│   │   │   ├── bron/page.tsx   # Booking page (Telegram handoff or Cal.com embed)
│   │   │   └── test/page.tsx   # 10-question Business Diagnostic Quiz (disabled in v1)
│   │   └── api/
│   │       ├── apply/route.ts       # Lead & book-order endpoint -> Telegram Bot
│   │       ├── lead/route.ts        # Alias re-exporting POST from ../apply/route
│   │       ├── quiz/route.ts        # Quiz scoring + Telegram dispatch (404 if quiz=false)
│   │       └── cal-webhook/route.ts # Cal.com HMAC-SHA256 webhook -> Telegram Bot
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, MobileMenu, MobileStickyBar, LanguageSwitcher
│   │   ├── sections/           # Hero, Portfolio, Principles, MediaSection, ContactSection (+ inactive sections)
│   │   ├── providers/          # ApplyModalProvider, SmoothScrollProvider
│   │   └── ui/                 # ConceptDisclosureBanner, BookingActionLink, skeletons, primitives
│   ├── config/                 # SINGLE SOURCE OF TRUTH for content, features, contacts, media, theme
│   │   ├── features.ts         # Feature flags (demoMode, bookingMode, quiz, section toggles)
│   │   ├── siteConfig.ts       # Origins (production vs demo), isIndexingEnabled, navLinks
│   │   ├── contact.ts          # Verified vs unverified contact channels (isVerified gate)
│   │   ├── booking.ts          # Resolves activeBookingMode & getBookingCtaTarget()
│   │   ├── book.ts             # Book order URL & price config (pending confirmation)
│   │   ├── content.ts          # Full localized copy & structured data for uz / ru / en (4,400+ lines)
│   │   ├── demoCopy.ts         # Localized Private Demo Safety Mode disclosures & form copy
│   │   ├── mediaManifest.ts    # Curated YouTube video manifest & topic categories
│   │   ├── siteMedia.ts        # Local image paths & company logo registry
│   │   └── theme.ts            # Design token object mirrored into tailwind.config.ts
│   ├── features/
│   │   ├── apply/              # ApplyForm, ApplyModal, applySchema.ts, telegram.ts
│   │   ├── booking/            # BookingView, CalcomBookingWidget, telegramBooking.ts
│   │   └── quiz/               # QuizView, quizData.ts, quizSchema.ts, telegramQuiz.ts
│   ├── i18n/
│   │   ├── routing.ts          # Locales: ["uz", "ru", "en"], defaultLocale: "uz"
│   │   ├── request.ts          # Loads messages/${locale}.json
│   │   └── messages/           # en.json, ru.json, uz.json
│   └── lib/
│       ├── formatPhone.ts      # Uzbekistan phone formatter/cleaner (+998XXXXXXXXX)
│       ├── rateLimit.ts        # Bounded in-memory fixed-window rate limiter (max 2000 buckets)
│       ├── requestSecurity.ts  # Body size limits (16KB/64KB), trusted IP extraction, SHA-256 hashing
│       ├── seo.ts              # Canonical, hreflang, OpenGraph, Twitter, and robots metadata builder
│       ├── telegramHtml.ts     # Fail-closed Telegram Bot HTML dispatcher & URL/HTML sanitizer
│       └── validation.ts       # Shared Zod validation helpers
├── next.config.ts              # next-intl plugin, CSP & security headers, AVIF/WebP image config
├── tailwind.config.ts          # Extends Tailwind with authority colors, radii, and font families
└── tsconfig.json               # TypeScript strict config
```

---

## 4. Safety Modes, Feature Flags & Single Source of Truth

### 4.1 Private Demo Safety Mode (`featuresConfig.demoMode`)
Defined in `src/config/features.ts`:
- Resolves from `process.env.NEXT_PUBLIC_DEMO_MODE`. **Defaults to `true`** unless explicitly set to `"false"`.
- **When `demoMode === true`:**
  1. Renders `ConceptDisclosureBanner` at the top of every page stating this is an independent design concept not commissioned/endorsed by Anvar Abduqayum.
  2. All write/webhook APIs (`/api/apply`, `/api/lead`, `/api/quiz`, `/api/cal-webhook`) fail closed with HTTP `403`.
  3. `ContactSection` switches to browser-only validation mode (shows a demo success summary without transmitting or storing personal data).
  4. JSON-LD `application/ld+json` structured data is suppressed in `[locale]/layout.tsx`.
  5. Search engine indexing is force-disabled.

### 4.2 Search Engine Indexing Gate (`isIndexingEnabled`)
Defined in `src/config/siteConfig.ts`:
```ts
export const isIndexingEnabled =
  !featuresConfig.demoMode &&
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  SITE_URL === OFFICIAL_PRODUCTION_ORIGIN; // "https://anvarabduqayum.uz"
```
Unless **all three** conditions are met:
- `src/middleware.ts` injects `X-Robots-Tag: noindex, nofollow, noarchive` on every response.
- `src/lib/seo.ts` sets `robots: { index: false, follow: false, noarchive: true }`.
- `src/app/robots.ts` returns `Disallow: /` and `src/app/sitemap.ts` returns `[]`.

### 4.3 Active Sections & Modules (`src/config/features.ts`)
Currently active on `/[locale]`:
- `hero: true` — `Hero.tsx` (`#hero`)
- `portfolio: true` — `Portfolio.tsx` (filterable ventures: `all`, `mfg`, `horeca`, `service`, `council` + accessible detail modal)
- `principles: true` — `Principles.tsx` (`#tamoyil` — "Qolip" management philosophy + keyboard-navigable tabs)
- `media: true` — `MediaSection.tsx` (curated YouTube manifest with lite-embed modal + press mentions)
- `contact: true` — `ContactSection.tsx` (`#aloqa` — verified channels + booking link + application form)

Disabled / scaffolded for future releases:
- `dossier: false`, `timeline: false`, `initiatives: false`, `numbers: false`, `exportUzbic: false`, `mistakes: false`
- `consulting: false`, `investment: false`, `quiz: false` (when `quiz: false`, `middleware.ts` rewrites `/[locale]/test` to a 404 route and `/api/quiz` returns `404`).

### 4.4 Contact Verification Gate (`src/config/contact.ts`)
Every contact channel has an `isVerified` boolean:
- **Currently verified (`isVerified: true`):** Instagram (`@anvar_abduqayum`), YouTube (`@AnvarAbduqayum`).
- **Currently unverified (`isVerified: false`):** `phone`, `telegramChannel`, `telegramDirect`, `linkedin`, `email`.
UI components, `Footer`, `ContactSection`, and JSON-LD `Person` schema **only** render channels where `isVerified === true`.

### 4.5 Booking Flow (`src/config/booking.ts`)
- `activeBookingMode` is `"calcom"` **only if** `featuresConfig.bookingMode === "calcom"` AND `NEXT_PUBLIC_CAL_LINK` is non-empty and not in `UNVERIFIED_CAL_PLACEHOLDERS` (`["asadbek-umarov"]`). Otherwise it falls back to `"telegram"`.
- `getBookingCtaTarget(locale)` routes to `contactConfig.telegramDirect.url` if verified, or falls back to `/${locale}/bron`.

---

## 5. Routing & API Endpoints

### 5.1 Pages
- `/` -> Redirected by `next-intl` middleware to `/uz` (default locale) or matching `ru` / `en`.
- `/[locale]` -> Main 5-section editorial homepage (`generateStaticParams` for `uz`, `ru`, `en`).
- `/[locale]/bron` -> Meeting coordination page (`BookingView`: Cal.com widget or Telegram administrator handoff / demo notice).
- `/[locale]/test` -> Business Diagnostic Quiz (`dynamic = "force-dynamic"`, returns `404` when `featuresConfig.quiz === false`).

### 5.2 API Routes (All `runtime = "nodejs"`)

| Endpoint | Method | Purpose | Security & Guards |
| :--- | :--- | :--- | :--- |
| `/api/apply` | `POST` | Consultation & book order leads -> Telegram Bot | Blocked (`403`) in `demoMode`; global rate limit (60/min); per-IP limit (3/min); per-phone limit (3/5min); `16 KB` max JSON body; honeypot field; Zod validation (`applySchema`); HTML-escaped Telegram message. |
| `/api/lead` | `POST` | Alias for `/api/apply` | Re-exports `POST` from `../apply/route`. |
| `/api/quiz` | `POST` | Scores 10-question quiz & sends lead to Telegram | Returns `404` when `featuresConfig.quiz === false`; `403` in `demoMode`; global (60/min), per-IP (3/min), per-phone (3/5min) limits; `16 KB` max body; honeypot; Zod validation. |
| `/api/cal-webhook` | `POST` | Receives Cal.com `BOOKING_CREATED`, `BOOKING_RESCHEDULED`, `BOOKING_CANCELLED` -> Telegram | Blocked (`403`) in `demoMode`; fails closed (`503`) if `CAL_WEBHOOK_SECRET` is unset; `64 KB` max raw body; constant-time HMAC-SHA256 verification on `x-cal-signature-256`; formats times in `Asia/Tashkent`. |

> **Scaling Note (`src/lib/rateLimit.ts`):** Rate limiting uses a process-local `Map` capped at `2000` entries. For multi-instance horizontal scaling, replace with an external atomic store (e.g., Redis / Upstash).

---

## 6. Design System & Security Headers

### 6.1 Visual Tokens (`src/app/globals.css` & `src/config/theme.ts`)
- **Primary Aesthetic:** Swiss-inspired luxury industrial editorial ("Qolip" / Monograph).
- **Light Surface (Main Canvas):** `--bg-alabaster: #FBF9F5`, `--bg-stone: #F4EFE6`, `--text-ink: #111215`, `--text-soft: #4B515D`.
- **Dark Surface (Philosophy / Footer / Modals):** `--bg-dark: #111215`, `--bg-dark-card: #17181D`, `--text-on-dark: #FBF9F5`.
- **Gold Accent:** `--accent-gold: #B8860B`, `--accent-gold-ink: #7A5600`, `--accent-gold-light: #D4AF37`.
- **Typography:** `Playfair Display` (`--font-display`), `Plus Jakarta Sans` (`--font-sans`), `JetBrains Mono` (`--font-mono`).
- **Geometry:** Sharp architectural corners (`2px`–`4px` radii, hairline `1px` borders).

### 6.2 HTTP Security Headers (`next.config.ts` & `src/middleware.ts`)
- `Content-Security-Policy`: `default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com`, `frame-src https://www.youtube-nocookie.com https://www.youtube.com`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`.
- `Strict-Transport-Security`: Emitted dynamically in `middleware.ts` **only** when the request protocol is HTTPS (`x-forwarded-proto` or `nextUrl.protocol`).
- `poweredByHeader: false`.

---

## 7. Environment Variables

Create `.env.local` for local development or configure in your hosting provider (e.g., Vercel):

```env
# --- Safety & Deployment Mode ---
# Defaults to "true" (Private Demo Safety Mode). Set to "false" ONLY for authorized production launch.
NEXT_PUBLIC_DEMO_MODE=true

# Production / Demo URLs
NEXT_PUBLIC_SITE_URL=https://anvarabduqayum.uz
NEXT_PUBLIC_DEMO_URL=https://anvar-abduqayum-flax.vercel.app

# Search engine indexing (requires demoMode=false AND SITE_URL=https://anvarabduqayum.uz)
NEXT_PUBLIC_ALLOW_INDEXING=false

# --- Booking (Cal.com) ---
# Optional Cal.com event slug (e.g., "anvar-abduqayum/30min"). Used only if featuresConfig.bookingMode="calcom".
NEXT_PUBLIC_CAL_LINK=
# Server-side HMAC-SHA256 secret for /api/cal-webhook
CAL_WEBHOOK_SECRET=

# --- Telegram Lead Notifications (Server-side only) ---
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

---

## 8. Local Development & Commands

```bash
# 1. Install dependencies (pnpm is the configured package manager)
pnpm install

# 2. Run development server (http://localhost:3000 -> redirects to /uz)
pnpm dev

# 3. Lint codebase
pnpm lint

# 4. Production build & start
pnpm build
pnpm start
```

### Going Live (Production Launch Checklist)
1. Update verified contacts in `src/config/contact.ts` (`isVerified: true` for confirmed phone, email, Telegram handles) and `src/config/book.ts` if book ordering is enabled.
2. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in production environment variables.
3. If using Cal.com: set `featuresConfig.bookingMode = "calcom"` in `src/config/features.ts`, set `NEXT_PUBLIC_CAL_LINK`, and configure `CAL_WEBHOOK_SECRET`.
4. Set `NEXT_PUBLIC_DEMO_MODE=false`, `NEXT_PUBLIC_SITE_URL=https://anvarabduqayum.uz`, and `NEXT_PUBLIC_ALLOW_INDEXING=true`.
5. Rebuild and verify `/robots.txt`, `/sitemap.xml`, and `POST /api/apply`.

