const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'sections', 'ContactSection.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Replace the phone input block
const oldPhoneBlock = `<div className="grid grid-cols-1 sm:grid-cols-[135px_1fr] gap-2">
                        <select
                          aria-label="Davlat kodi"
                          value={countryCode}
                          onChange={handleCountryCodeChange}
                          className="min-h-[48px] px-3 border rounded-[2px] text-[15px] font-mono text-[var(--text-ink)] bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
                        >
                          {COUNTRY_CODE_PRESETS.map((preset) => (
                            <option key={preset.code} value={preset.code}>
                              {preset.label}
                            </option>
                          ))}
                        </select>
                        <input
                          ref={phoneInputRef}
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          required
                          inputMode="tel"
                          autoComplete="tel"
                          value={displayPhone}
                          onChange={handlePhoneChange}
                          placeholder={countryCode === "+998" ? "(90) 123-45-67" : "123 45 67"}
                          aria-invalid={fieldErrors.phone ? "true" : undefined}
                          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                          className={\`w-full min-h-[48px] px-4 py-2.5 border rounded-[2px] text-[16px] leading-[1.4] tabular-nums font-mono text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)] transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] \${
                            fieldErrors.phone
                              ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                              : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-[var(--bg-surface)]"
                          }\`}
                        />
                      </div>`;

const newPhoneBlock = `<div className="flex items-center gap-2">
                        <select
                          aria-label="Davlat kodi"
                          value={countryCode}
                          onChange={handleCountryCodeChange}
                          className="w-[96px] sm:w-[102px] shrink-0 min-h-[46px] px-2.5 border rounded-[2px] text-[13px] font-mono text-[var(--text-ink)] bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
                        >
                          {COUNTRY_CODE_PRESETS.map((preset) => (
                            <option key={preset.code} value={preset.code}>
                              {preset.label}
                            </option>
                          ))}
                        </select>
                        <input
                          ref={phoneInputRef}
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          required
                          inputMode="tel"
                          autoComplete="tel"
                          value={displayPhone}
                          onChange={handlePhoneChange}
                          placeholder={countryCode === "+998" ? "(90) 123-45-67" : "123 45 67"}
                          aria-invalid={fieldErrors.phone ? "true" : undefined}
                          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                          className={\`flex-1 min-w-0 min-h-[46px] px-3 py-2 border rounded-[2px] text-[14px] sm:text-[14.5px] leading-[1.4] tabular-nums font-mono text-[var(--text-ink)] placeholder:text-[13px] placeholder:font-sans placeholder:text-[var(--text-muted-aa)] transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] \${
                            fieldErrors.phone
                              ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                              : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-[var(--bg-surface)]"
                          }\`}
                        />
                      </div>`;

console.log('Includes old phone block:', code.includes(oldPhoneBlock));
code = code.replace(oldPhoneBlock, newPhoneBlock);

// Also tweak placeholder font on name, business, and message
code = code.replace(
  'text-[16px] leading-[1.4] text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)]',
  'text-[14px] sm:text-[14.5px] leading-[1.4] text-[var(--text-ink)] placeholder:text-[13px] placeholder:text-[var(--text-muted-aa)]'
);

code = code.replace(
  'text-[16px] leading-[1.55] text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)]',
  'text-[14px] sm:text-[14.5px] leading-[1.55] text-[var(--text-ink)] placeholder:text-[13px] placeholder:text-[var(--text-muted-aa)]'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Phone placeholder fix applied successfully!');

