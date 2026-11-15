# Xatoliklar hisoboti (Bug Reports): Anvar Abduqayum Platformasi

Build: `0196d16` | Muhit: Local Next.js App Router (Chrome 159, Desktop & Mobile)

---

### BUG-001: `/icon.png` va `/favicon.ico` so'rovlarida Next.js 500 Server xatosi yuz berishi

- **Severity:** S3
- **Flow / case:** F01 / F01-H1, F01-H2
- **Screen:** Barcha sahifalar (Global Layout)
- **Build:** `0196d16` | **Browser / device:** Chrome 159 Desktop & Mobile

#### Qadamlar (Steps)
1. Brauzerda istalgan sahifani oching (masalan, `http://localhost:3000/uz`).
2. Tarmoq (Network tab) yoki brauzer konsolini kuzating.
3. Brauzer `/icon.png` yoki `/favicon.ico` so'rovini yuborganida server holatini tekshiring.

- **Kutilgan natija (Expected):** Server `200 OK` bilan favicon va app icon faylini qaytarishi kerak.
- **Amaldagi natija (Actual):** Server `500 Internal Server Error` qaytardi: `⨯ A conflicting public file and page file was found for path /icon.png`.
- **Dalil (Evidence):** Dev server terminal logi: `GET /icon.png 500 in 329ms`. Test natijasi: `HTTP 5xx Server Error (500) on URL: http://localhost:3000/icon.png`.
- **Sabab (Suspected cause):** Fayllar bir vaqtning o'zida ham `public/icon.png`, ham `src/app/icon.png` da mavjud bo'lgani sababli Next.js marshrutlash ziddiyati (routing collision) yuz bergan.
- **Holat (Status):** **TUZATILDI (Fixed)** — `src/app/` dagi dublikat fayllar o'chirildi va `public/` dagi statik fayllar to'g'ridan-to'g'ri `200 OK` bilan uzatilmoqda.

---

### BUG-002: Sahifada ikkita `<main>` tegi mavjudligi sababli HTML5 semantikasi va a11y buzilishi

- **Severity:** S3
- **Flow / case:** F01 / F01-H1
- **Screen:** Global Homepage
- **Build:** `0196d16` | **Browser / device:** Chrome 159 Desktop & Mobile

#### Qadamlar (Steps)
1. `http://localhost:3000/uz` sahifasini oching.
2. DOM daraxtida `document.querySelectorAll('main')` so'rovini bajaring.

- **Kutilgan natija (Expected):** W3C va HTML5 spetsifikatsiyasiga ko'ra sahifada faqat bitta birlamchi `<main>` landmark elementi bo'lishi kerak.
- **Amaldagi natija (Actual):** Sahifada 2 ta `<main>` tegi topildi: 1) `PageSkeleton` ichida `<main class="flex-1 pt-20">`, 2) sahifaning o'zida `<main class="flex-1">`.
- **Dalil (Evidence):** Playwright strict locator xatosi: `strict mode violation: locator('main') resolved to 2 elements`.
- **Sabab (Suspected cause):** `src/components/ui/skeletons/PageSkeleton.tsx` faylida karkas blok uchun `<main>` ishlatilgan.
- **Holat (Status):** **TUZATILDI (Fixed)** — `PageSkeleton.tsx` dagi teg semantik jihatdan xavfsiz `<div>` ga almashtirildi. Barcha testlar muvaffaqiyatli o'tdi.

---

### BUG-003: `Navbar.tsx` da foydalanilmagan Select komponentlari sababli ESLint ogohlantirishlari
- **Severity:** S4
- **Flow / case:** Build & Code Quality
- **Screen:** Global Layout (`Navbar.tsx`)
- **Holat (Status):** **TUZATILDI (Fixed)** — `src/components/layout/Navbar.tsx` dagi ortiqcha `Select` importlari tozalandi. `pnpm lint` 0 ta xato bilan muvaffaqiyatli o'tmoqda.

---

### BUG-004: `package.json` va dastlabki prototip hujjatlarida eski shablon nomi (`ilhom-begimqulov`) qolib ketganligi
- **Severity:** S3
- **Flow / case:** Rebranding & Packaging
- **Screen:** Global Meta & Config
- **Holat (Status):** **TUZATILDI (Fixed)** — `package.json` nomi `anvar-abduqayum` ga o'zgartirildi, `package-lock.json`, `index.html`, `docs/DESIGN.md` va `README.md` dagi barcha qoldiqlar to'liq yangilandi.
