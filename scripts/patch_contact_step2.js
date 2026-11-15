const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'sections', 'ContactSection.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Channel link
const oldChannelInner = `<span className="min-w-0">
                        <span className="block text-[14px] font-medium text-[var(--text-muted-aa)]">
                          {channel.label}
                        </span>
                        <span className="block text-[clamp(14.5px,4.2vw,17px)] font-semibold text-[var(--text-ink)] mt-0.5 tabular-nums [overflow-wrap:break-word] transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none">
                          {channel.value}
                        </span>
                      </span>
                      <span className="text-[13.5px] font-semibold text-[var(--accent-gold-ink)] transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none">
                        {channel.cue}
                      </span>`;

const newChannelInner = `<span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-wider font-semibold text-[var(--text-muted-aa)]">
                          {channel.label}
                        </span>
                        <span className="block text-[clamp(14.5px,4.2vw,16.5px)] font-semibold text-[var(--text-ink)] mt-0.5 tabular-nums [overflow-wrap:break-word] transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none">
                          {channel.value}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11.5px] uppercase tracking-wider font-semibold text-[var(--accent-gold-ink)] transition-transform duration-150 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none">
                        <span>{channel.cue}</span>
                        <span aria-hidden="true">→</span>
                      </span>`;

console.log('Replacing channel inner:', code.includes(oldChannelInner));
code = code.replace(oldChannelInner, newChannelInner);

// 2. Submit button
const oldSubmitBtn = `                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="min-h-[48px] px-8 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] active:bg-[var(--bg-dark)] disabled:opacity-60 disabled:cursor-not-allowed rounded-[2px] text-[15px] font-semibold inline-flex items-center justify-center whitespace-nowrap transition-[background-color,border-color] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >`;

const newSubmitBtn = `                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="min-h-[48px] px-8 bg-[#0E1013] text-white border border-[#0E1013] hover:bg-[#DDB52E] hover:border-[#DDB52E] hover:text-black active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed rounded-[2px] text-[14px] font-bold tracking-[0.04em] inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDB52E]"
                    >`;

console.log('Replacing submit btn:', code.includes(oldSubmitBtn));
code = code.replace(oldSubmitBtn, newSubmitBtn);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Patch step 2 complete!');

