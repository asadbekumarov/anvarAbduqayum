# DESIGN SPECIFICATION: ILHOM BEGIMQULOV WEBSITE

## 1. Design Direction
- **Style**: Swiss Minimalism, Dark Editorial (Black / Champagne Gold / Architectural White).
- **Feel**: Hand-designed by an elite typography-focused human designer, strictly avoiding generic "AI template" aesthetics.
- **Principles**: Strong typographic scale, asymmetrical balance, purposeful whitespace, sharp architectural borders, editorial column rhythm.

## 2. Design Tokens
- **Background Base**: `#0A0A0A` (Deep matte black)
- **Elevated Background**: `#141414` (Surface panels)
- **Elevated Highlight**: `#1F1F1F`
- **Border**: `#262626` (Subtle line `#1C1C1C`, strong `#383838`)
- **Gold Accent**: `#C5A880` (Champagne muted gold, never neon/yellow)
- **Gold Hover**: `#D4B48A`
- **Gold Dim**: `rgba(197, 168, 128, 0.15)`
- **Muted Text**: `#737373` / `#A1A1AA`
- **Primary Text**: `#FFFFFF`
- **Corner Radius**: `2px` maximum throughout the entire application. Absolutely no pill shapes or bubbly radii.
- **Typography**:
  - Serif (Headings, quotes, key numbers): `Playfair Display` (`--font-playfair`)
  - Sans (Body, navigation, labels, microcopy): `Inter` (`--font-inter`)
- **Gold Gradient Utility**: `linear-gradient(135deg, #DFBA73 0%, #C5A059 50%, #9E7D3B 100%)`.
  *Note*: This gradient is strictly reserved for the primary CTA button and large index numerals. Never use as generic background fills.

## 3. UI Component Directives
- **Buttons**:
  - Rectangular (2px radius).
  - Primary: Gold gradient background, dark text (`#0A0A0A`), semi-bold.
  - Secondary/Outline: Sharp 1px border (`#262626` or `#C5A880`), transparent background.
  - Ghost: Minimal text with underline on hover.
  - No rounded pills, no drop shadows.
- **Inputs**:
  - Underline/editorial minimal style with border-b only or sharp rectangular frame.
  - Focus state: crisp white or gold bottom border.
- **Section Headers**:
  - Small uppercase kicker with mono/sans letter-spacing (`tracking-widest`).
  - Large serif title with editorial hierarchy.
  - Section index counter (e.g., `01`, `02`, `03`).
- **Videos**:
  - YouTube "lite" embed pattern: render thumbnail (`youtube.thumb`) with plain white play triangle.
  - Load iframe inside an accessible modal upon user click.
  - No heavy iframes on initial load.
  - "REPLACE_ME" IDs fallback to neutral placeholder gracefully.

## 4. Section Layouts (12 Sections with Anchors)
1. `hero` (Header + Hero): Asymmetric split, authoritative serif statement, portrait, primary CTA.
2. `xizmatlar` (Xizmatlar): 6 table-like rows with index, title, description, and hover highlight.
3. `tadbirlarimiz` (MDH biznes-tur & Tadbirlar): 6 city posters with Latin city names.
4. `bosqichlar` (Bosqichlar): 2 tabs + 6-step accordion.
5. `hamkorlar` (Hamkorlar): 27 partner logos marquee (grayscale, crisp borders).
6. `cta-band` (CTA Band): High-contrast editorial callout.
7. `ekspert` (Ekspert): Biography, consulting philosophy, key milestones.
8. `fikrlar` (Mijozlar fikrlari): 13 video testimonials in responsive horizontal strip.
9. `kitob` ("Biznes shpargalkasi" kitobi): Book feature presentation.
10. `vebinarlar` (O'tgan vebinarlar): 14 webinar video archive.
11. `sertifikatlar` (Diplom va sertifikatlar): 3 official documents with lightbox zoom.
12. `kontaktlar` (Kontaktlar + Footer): Underline application form, contact details, copyright.

## 5. Forbidden Patterns (Strictly Enforced)
- ❌ NO glow or neon drop shadows.
- ❌ NO heavy drop shadows or blurred box-shadows.
- ❌ NO glassmorphism or `backdrop-blur`.
- ❌ NO pill buttons (`rounded-full` is prohibited).
- ❌ NO rounded cards (> 2px radius).
- ❌ NO icons enclosed in circles.
- ❌ NO emojis in UI or copy.
- ❌ NO centered-everything layouts.
- ❌ NO identical, repetitive generic card grids.
- ❌ NO staggered fade-up on every single element.

## 6. Accessibility (WCAG 2.1 AA)
- Minimum contrast ratio 4.5:1 on `#0A0A0A`.
- Visible focus rings (`focus-visible:ring-1 focus-visible:ring-gold`).
- Full keyboard navigation for all interactive elements (Escape closes modals, Tab cycling).
- Screen-reader labels (`aria-label`, `role="dialog"`).
- `prefers-reduced-motion` honored across all transitions.

## 7. Responsive Breakpoints
- Mobile: `360px` - `767px` (single-column fluid, touch-friendly 44px+ targets).
- Tablet: `768px` - `1279px` (asymmetric 2-column editorial).
- Desktop: `1280px` - `1920px` (full Swiss grid layout).
