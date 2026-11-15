# Component Specifications (Design System)

Platform: **Anvar Abduqayum B2B Industrial Ecosystem (The Authority Experience)**  
Design Language: Swiss Architectural Minimalism / Dark Obsidian Luxury  
Standards: WCAG 2.2 Level AA / Radix UI Accessible Primitives

---

### 1. CommandPalette (Modal Dialog)
* **Description**: Keyboard-first executive command hub for rapid deep-linking, venture navigation, action triggers, and language selection.
* **Trigger**: `Cmd+K` / `Ctrl+K` global keyboard shortcut or `[ ⌘K ]` button in Navbar.
* **Base Primitive**: `@radix-ui/react-dialog`
* **Tokens**:
  * Backdrop: `bg-[#090A0D]/75 backdrop-blur-md`
  * Modal Container: `bg-[#17181D]/95 backdrop-blur-2xl`, border `1px solid rgba(212,175,55,0.25)`, radius `sm (4px)`, shadow `glass`
  * Input: `text-[#F5F4F0]`, placeholder `text-[#8E95A5]`, font `sm (13.5px)`, caret `#D4AF37`
  * Active List Item: `bg-[rgba(212,175,55,0.12)] border-l-2 border-l-[#D4AF37] text-[#F5F4F0]`
  * Inactive List Item: `border-l-2 border-l-transparent text-[#C2C7D1] hover:bg-white/[0.04]`
  * Category Header: `font-mono text-[10px] uppercase font-bold text-[#D4AF37]/80 tracking-[0.12em]`
  * Keycaps (KBD): `bg-[#111215] border border-[rgba(255,255,255,0.12)] text-[10px] font-mono text-[#8E95A5]`
* **States**:
  * Default (Clean filtered list, top item selected)
  * Hover / Pointer (Auto updates active index)
  * Arrow navigation (`ArrowDown` / `ArrowUp` cyclically updates active element and scrolls into viewport)
  * Enter (Executes item's `onSelect`)
  * Escape (Closes modal and restores focus to previous active element)
  * Empty Result (`noResults` text in JetBrains Mono font)
* **Accessibility (a11y)**:
  * Full Radix focus trap inside dialog portal
  * `aria-describedby` explaining instant search and keyboard navigation
  * `sr-only` Dialog.Title for screen readers
* **Used On**: Global (accessible on every route via Navbar).

---

### 2. AudioThesisPlayer
* **Description**: Compact, architectural sound monograph player designed for executive quotes and philosophical thesis playback.
* **Trigger**: Inline click / keyboard focus inside tab content.
* **Tokens**:
  * Container: `bg-[#17181D] border border-[rgba(212,175,55,0.22)] radius xs (2px) shadow subtle`
  * Play Button: `bg-[#111215] text-[#F5F4F0] border border-[rgba(255,255,255,0.12)] font-mono text-[11px] font-semibold tracking-[0.06em]`
  * Active/Hover Button: `border-[#D4AF37] text-[#D4AF37]`
  * Active Waveform Bar: `w-[1.5px] bg-[#D4AF37] pulse-animation`
  * Inactive Waveform Bar: `w-[1.5px] bg-[rgba(255,255,255,0.2)]`
  * Demo Badge: `bg-[#D4AF37]/10 text-[#D4AF37]/90 border border-[#D4AF37]/25 font-mono text-[9px] uppercase`
* **States**:
  * Default (Paused, displays total duration `0:30`, play glyph `▶`)
  * Playing (Active playback, displays live elapsed timer `m:ss`, pause glyph `❚❚`, pulsing bars)
  * Graceful Simulated Demo Mode (Active when no physical `.mp3` is loaded; prevents 404 console errors with live simulated timer)
* **Accessibility (a11y)**:
  * `role="region"` with descriptive `aria-label`
  * Button `aria-label` dynamically toggles between `"Tezis audiosini tinglash"` and `"Audioni to‘xtatish"`
  * Waveform container marked `aria-hidden="true"`
* **Used On**: `Principles.tsx` (Management Philosophy "Qolip" tabs).

---

### 3. Primary & Secondary Buttons
* **Variants**:
  * `primary` (Gold Authority): `bg-[#D4AF37] text-[#090A0D] font-semibold hover:bg-[#E5BE42] active:scale-[0.98]`
  * `secondary` (Obsidian Hairline): `bg-[#111215] text-[#F5F4F0] border border-[rgba(255,255,255,0.14)] hover:border-[#D4AF37] hover:text-[#D4AF37]`
  * `ghost`: `bg-transparent text-[#8E95A5] hover:text-[#F5F4F0] hover:bg-white/[0.04]`
  * `danger`: `bg-[#E05252] text-white hover:bg-[#C62F2F]`
* **Sizes**:
  * `sm`: 32px height, 12px font, 10px px
  * `md`: 40px height, 13.5px font, 16px px
  * `lg`: 48px height, 15px font, 24px px
* **States**:
  * `default`, `hover`, `active`, `focus-visible` (2px solid `#D4AF37` offset 2px), `disabled` (`opacity-40 cursor-not-allowed`), `loading` (spinner + retained label).
* **Used On**: `Hero.tsx`, `Navbar.tsx`, `ContactSection.tsx`, `hamkorlik/page.tsx`.

---

### 4. Segmented Tabs (`TabsPrimitive`)
* **Description**: Industrial tab switcher with desktop vertical stack and mobile horizontal snap scrolling.
* **Base Primitive**: `radix-ui` Tabs.
* **Tokens**:
  * Active Tab: `bg-[#111215] border-[rgba(212,175,55,0.35)] border-l-2 border-l-[#D4AF37] text-[#F5F4F0]`
  * Inactive Tab: `bg-transparent border-[rgba(255,255,255,0.08)] text-[#8E95A5] hover:text-[#F5F4F0]`
  * Index Badge: `font-mono text-[11.5px] font-bold text-[#D4AF37]`
* **States**:
  * `selected`, `unselected`, `hover`, `focus-visible` (ring-2 ring-[#D4AF37]).
* **Animation**:
  * Tab content enters with deliberate 0.6s architectural reveal ease: `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Accessibility**:
  * Full keyboard arrow navigation between tab triggers, ARIA `role="tablist"` and `role="tabpanel"`.
* **Used On**: `Principles.tsx`, `hamkorlik/page.tsx`.

---

### 5. International B2B Form Inputs & Selects
* **Description**: High-conversion institutional lead capture fields accepting E.164 phone formats and structured partner track metadata.
* **Tokens**:
  * Input Container: `bg-[#0D0E12] border border-[#586173] text-[#F5F4F0] radius xs (2px)`
  * Focus State: `border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.2)]`
  * Error State: `border-[#E05252] text-[#F5F4F0]`
  * Country Code Select: `bg-[#111215] text-[#D4AF37] border-r border-[#586173] font-mono text-[12px]`
* **Accessibility**:
  * Every field has an associated `<label>` or `aria-label`
  * Validation errors announced via `aria-live="polite"`
* **Used On**: `ContactSection.tsx`, `src/app/[locale]/hamkorlik/page.tsx`.

---

### 6. Venture Card (Portfolio Matrix)
* **Description**: Industrial enterprise showcase card displaying investment holdings, production capacity, and company metrics.
* **Tokens**:
  * Surface: `bg-[#12141A] border border-[rgba(255,255,255,0.08)] radius sm (4px) hover:border-[rgba(212,175,55,0.35)]`
  * Sector Tag: `font-mono text-[10px] font-bold tracking-[0.12em] text-[#D4AF37]`
  * Metrics Well: `bg-[#090A0D] p-3 border border-[rgba(255,255,255,0.06)]`
* **Used On**: `Portfolio.tsx`, `ExecutiveDossier.tsx`.

