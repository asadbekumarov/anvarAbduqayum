# Test plan: Anvar Abduqayum Personal Brand & B2B Platform

Build: `0196d16` | Sana: 2026-11-16 | Muhit: Mahalliy Next.js App Router (localhost:3000)

| Holat ID | Oqim (Flow) | Tur | Qadamlar | Kutilgan natija | Avtomatlashgan | Natija |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **F01-H1** | Asosiy sahifa navigatsiyasi & Til almashtirish | Happy | `/uz` sahifasini ochish, menyu havolalarini bosish (`#portfel`, `#timeline`, `#contact`) | Silliq skroll amalga oshadi, tegishli bo'lim ko'rinadi | e2e | PASS |
| **F01-H2** | Til almashtirgich (i18n) | Happy | Navbarda `RU` va `EN` tugmalarini bosish | URL mos ravishda `/ru` va `/en` ga o'zgaradi, sarlavha va matnlar tarjima qilinadi | e2e | PASS |
| **F01-E1** | Mobil o'lchamda menyu (Mobile drawer) | Edge: mobile width | 375x667 o'lchamda sahifani ochish, gamburger menyuni ochish va yopish | Mobil menyu silliq ochiladi, havolalar ishlaydi, horizontal scroll (overflow-x) bo'lmaydi | e2e | PASS |
| **F01-E2** | Qayta yuklash va to'g'ridan-to'g'ri hash URL | Edge: refresh mid-flow | `/uz#contact` ga to'g'ridan-to'g'ri kirish | Sahifa 500 xatosiz yuklanadi, to'g'ri bo'limga fokuslanadi | e2e | PASS |
| **F01-N1** | Mavjud bo'lmagan til kodi | Negative | `/fr` yoki `/de` manziliga kirish | Middleware orqali avtomatik `404` yoki default til `/uz` ga yo'naltiriladi | e2e | PASS |
| **F02-H1** | Ekotizim / Portfel kartalari | Happy | `#portfel` bo'limiga o'tish, korxona kartalarini (Toybola, Samtech) ko'rish | Korxonalar kartalari, yillik quvvat va tavsiflar to'liq chiqadi | e2e | PASS |
| **F02-H2** | Portfel Ko'rinish Tablari | Happy | Portfel ichida "Portfel korxonalari" va boshqa faol tablarni bosish | Tegishli ko'rinish faollashadi, layout buzilmaydi | e2e | PASS |
| **F02-E1** | Juda tez tab almashtirish | Edge: rapid switching | Tablar orasida ketma-ket tez bosish | Kontent sinxronlashadi, xatolik (unhandled exception) yuz bermaydi | e2e | PASS |
| **F03-H1** | B2B Hamkorlik / Aloqa arizasi | Happy | Aloqa formasiga F.I.Sh, Telegram/Telefon va xabar kiritib, "Yuborish"ni bosish | Muvaffaqiyat xabari (Success feedback) ko'rsatiladi, forma tozalanadi | e2e | PASS |
| **F03-E1** | Bo'sh yoki noto'g'ri ma'lumot | Edge: empty input | Barcha maydonlar bo'sh holda submit qilish | Zod/HTML5 validatsiya ogohlantirishi chiqadi, ariza ketmaydi | e2e | PASS |
| **F03-E2** | O'zbekcha maxsus belgilar & emojilar | Edge: accents & emoji | Ism maydoniga `O‘ktam G‘aniyev 🏭 🚀` va uzun xabar kiritish | Matn buzilmasdan qabul qilinadi va to'g'ri sanitizatsiya qilinadi | e2e | PASS |
| **F03-E3** | Ikki marta ketma-ket submit bosish | Edge: double click | Yuborish tugmasini tezkor 2 marta bosish | Tugma `disabled` holatga o'tadi, faqat 1 ta so'rov jo'natiladi | e2e | PASS |
| **F03-N1** | Bot / Honeypot himoyasi | Negative: honeypot | Yashirin `hp` maydonini to'ldirib so'rov yuborish | Tizim bot deb hisoblaydi va so'rovni rad etadi (400) | e2e | PASS |
| **F04-H1** | Uchrashuv belgilash (`/bron`) | Happy | `/[locale]/bron` sahifasiga kirish | Uchrashuv belgilash interfeysi yoki tasdiqlangan Telegram yordamchi ochiladi | e2e | PASS |
| **F04-E1** | Mobil o'lchamda bron sahifasi | Edge: mobile width | Mobil brauzerda bron sahifasini tekshirish | Elementlar to'g'ri sig'adi, tugmalar bosilishga qulay | e2e | PASS |
| **F05-H1** | Media & Chiqishlar moduli | Happy | `#media` bo'limida video va intervyularni ko'rish | Video kartalari, sarlavha va manbalar to'g'ri render bo'ladi | e2e | PASS |
| **F06-N1** | O'chirilgan modul xavfsizligi (`/test`) | Negative: disabled module | `featuresConfig.quiz === false` holatida `/[locale]/test` ga kirish | `404 Not Found` yoki yo'naltirish qaytadi, o'chirilgan modul ochilmaydi | e2e | PASS |
| **F06-H1** | SEO va Meta ma'lumotlar | Happy | `/robots.txt` va `/sitemap.xml` so'rovlari | 200 OK va to'g'ri formatdagi XML/matn qaytadi | e2e | PASS |
