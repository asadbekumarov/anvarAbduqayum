const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'sections', 'ContactSection.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Specs dl
const oldDl = `<dl className="mt-10 border-t border-[var(--border-on-dark)] grid grid-cols-1 sm:grid-cols-3">
                {booking.specs.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className={\`py-4 border-b border-[var(--border-on-dark-subtle)] sm:border-b-0 \${
                      idx > 0
                        ? "sm:pl-4 sm:border-l sm:border-[var(--border-on-dark-subtle)]"
                        : ""
                    } \${idx < booking.specs.length - 1 ? "sm:pr-4" : ""}\`}
                  >
                    <dt className="text-[13.5px] font-semibold text-[var(--accent-gold-light)]">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-[15.5px] font-medium text-[var(--text-on-dark)] leading-[1.45]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>`;

const newDl = `<dl className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4">
                {booking.specs.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className={\`py-3 \${
                      idx > 0
                        ? "sm:pl-5 sm:border-l sm:border-white/[0.08]"
                        : ""
                    }\`}
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#DDB52E]">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-[14.5px] font-medium text-white leading-[1.45]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>`;

// 2. Aside card & Primary CTA
const oldAside = `<aside
              aria-labelledby="booking-card-title"
              className="bg-[var(--bg-dark-elevated)] text-[var(--text-on-dark)] border border-[var(--border-on-dark)] border-t-2 border-t-[var(--accent-gold-light)] rounded-[2px] p-6 sm:p-8 flex flex-col gap-4"
            >
              <h3
                id="booking-card-title"
                className="font-serif text-[24px] font-medium leading-[1.25] text-[var(--text-on-dark)] [text-wrap:balance]"
              >
                {booking.cardTitle}
              </h3>

              <p className="text-[15.5px] leading-[1.62] text-[var(--text-muted-on-dark)]">
                {booking.cardDescription}
              </p>

              <div
                className="flex items-center justify-between gap-3 px-4 py-3 bg-[var(--bg-dark)] border border-[var(--border-on-dark)] text-[13.5px] [overflow-wrap:anywhere]"
              >
                <span className="font-sans font-medium text-[var(--text-muted-on-dark)]">
                  {booking.routeLabel}
                </span>
                <span className="font-mono text-[var(--accent-gold-light)]">
                  {displayedBookingRoute}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <MagneticPull>
                  <BookingActionLink
                    locale={safeLocale}
                    className="min-h-[48px] px-6 bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--bg-surface)] hover:bg-[var(--accent-gold-light)] hover:border-[var(--accent-gold-light)] active:opacity-90 rounded-[2px] text-[15px] font-semibold inline-flex items-center justify-center whitespace-nowrap transition-[background-color,border-color,color,opacity] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                  >
                    {booking.primaryCta}
                  </BookingActionLink>
                </MagneticPull>`;

const newAside = `<aside
              aria-labelledby="booking-card-title"
              className="bg-[#111215] text-[var(--text-on-dark)] border border-white/[0.08] border-t-2 border-t-[#DDB52E] rounded-[2px] p-6 sm:p-8 flex flex-col gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#DDB52E] font-semibold">
                  STRATEGIK SHERIKLIK PROTOKOLI
                </span>
                <h3
                  id="booking-card-title"
                  className="font-serif text-[22px] sm:text-[24px] font-bold leading-[1.25] text-white mt-1 [text-wrap:balance]"
                >
                  {booking.cardTitle}
                </h3>
              </div>

              <p className="text-[14.5px] leading-[1.62] text-[#9EA6B5]">
                {booking.cardDescription}
              </p>

              <div
                className="flex items-center justify-between gap-3 px-4 py-3 bg-[#090A0D] border border-white/[0.08] text-[13px] rounded-[2px] [overflow-wrap:anywhere]"
              >
                <span className="font-mono text-[11.5px] uppercase tracking-wider text-[#8E95A5]">
                  {booking.routeLabel}
                </span>
                <span className="font-mono text-[12.5px] text-[#DDB52E] font-semibold">
                  {displayedBookingRoute}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <MagneticPull>
                  <BookingActionLink
                    locale={safeLocale}
                    className="min-h-[46px] px-6 bg-[#DDB52E] text-black border border-[#DDB52E] hover:bg-white hover:border-white hover:text-black active:opacity-90 rounded-[2px] text-[14px] font-bold inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDB52E]"
                  >
                    {booking.primaryCta}
                  </BookingActionLink>
                </MagneticPull>`;

// 3. Band 2 Header
const oldBand2Header = `<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end pb-6 border-b border-[var(--border-hairline-editorial)] mb-12 lg:mb-16">
            <h2
              id="contact-heading"
              className="lg:col-span-7 font-serif text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
            >
              {directory.title}
            </h2>
            <p className="lg:col-span-5 text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[54ch] [text-wrap:pretty]">
              {directory.lead}
            </p>
          </div>`;

const newBand2Header = `<header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 sm:pb-8 border-b border-[var(--border-hairline-editorial)] mb-10 lg:mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold-ink)]" />
                <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.18em] text-[var(--accent-gold-ink)] uppercase font-semibold">
                  07.B // RASMIY ALOQA VA KANALLAR DIREKTORIYASI
                </span>
              </div>
              <h2
                id="contact-heading"
                className="font-serif text-[clamp(30px,4vw,48px)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
              >
                {directory.title}
              </h2>
            </div>
            <p className="max-w-[520px] text-[15px] sm:text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] font-sans sm:text-right [text-wrap:pretty]">
              {directory.lead}
            </p>
          </header>`;

// 4. Band 2 py-20 lg:py-28 -> py-14 lg:py-20
code = code.replace(
  'className="bg-[var(--bg-stone)] text-[var(--text-ink)] border-b border-[var(--border-hairline-editorial)] py-20 lg:py-28 scroll-mt-20"',
  'className="bg-[var(--bg-stone)] text-[var(--text-ink)] border-b border-[var(--border-hairline-editorial)] py-14 lg:py-20 scroll-mt-20"'
);

// 5. Submit button
const oldSubmitBtn = `<button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[48px] px-8 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] disabled:opacity-50 disabled:cursor-not-allowed rounded-[2px] text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-[background-color,border-color,opacity] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >`;

const newSubmitBtn = `<button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[48px] px-8 bg-[#0E1013] text-white border border-[#0E1013] hover:bg-[#DDB52E] hover:border-[#DDB52E] hover:text-black active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed rounded-[2px] text-[14px] font-bold tracking-[0.04em] inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDB52E]"
                >`;

// Execute replacements
console.log('Replacing dl:', code.includes(oldDl));
code = code.replace(oldDl, newDl);

console.log('Replacing aside:', code.includes(oldAside));
code = code.replace(oldAside, newAside);

console.log('Replacing band 2 header:', code.includes(oldBand2Header));
code = code.replace(oldBand2Header, newBand2Header);

console.log('Replacing submit btn:', code.includes(oldSubmitBtn));
code = code.replace(oldSubmitBtn, newSubmitBtn);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Patch complete!');

