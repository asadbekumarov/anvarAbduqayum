"use client";

import React, { useEffect, useRef, useState } from "react";
import { getContent } from "@/config/content";
import { MagneticPull } from "@/components/ui/LuxuryMotion";
import { formatUzbekPhone } from "@/lib/formatPhone";
import { internationalPhoneRegex } from "@/features/apply/schemas/applySchema";

const COUNTRY_CODE_PRESETS = [
  { code: "+998", label: "UZ +998" },
  { code: "+7", label: "RU/KZ +7" },
  { code: "+90", label: "TR +90" },
  { code: "+971", label: "AE +971" },
  { code: "+49", label: "DE +49" },
  { code: "+44", label: "UK +44" },
  { code: "+1", label: "US +1" },
  { code: "+86", label: "CN +86" },
  { code: "+994", label: "AZ +994" },
] as const;

interface ContactSectionProps {
  locale?: string;
}

interface FormState {
  name: string;
  business: string;
  topic: string;
  message: string;
  honeypot: string;
}

interface FieldErrors {
  name?: string;
  phone?: string;
  business?: string;
  message?: string;
}

interface SubmittedSummary {
  name: string;
  phone: string;
  business: string;
  topic: string;
  message: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  locale = "uz",
}) => {
  const safeLocale = locale === "ru" || locale === "en" ? locale : "uz";
  const content = getContent(safeLocale);
  const { directory, form: formCopy } = content.contact;

  const [formData, setFormData] = useState<FormState>({
    name: "",
    business: "",
    topic: formCopy.topicOptions[0]?.id || "coop",
    message: "",
    honeypot: "",
  });
  const [countryCode, setCountryCode] = useState<string>("+998");
  const [displayPhone, setDisplayPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<SubmittedSummary | null>(null);

  const submitLockRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const businessInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const isSubmitting = status === "submitting";

  // Pre-fill listeners from OEM Configurator & Export Corridor Map
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvt = e as CustomEvent<{ message?: string; topic?: string }>;
      if (customEvt.detail) {
        setFormData((prev) => ({
          ...prev,
          ...(customEvt.detail.message ? { message: customEvt.detail.message } : {}),
          ...(customEvt.detail.topic ? { topic: customEvt.detail.topic } : {}),
        }));
        setTimeout(() => {
          messageInputRef.current?.focus();
        }, 150);
      }
    };
    window.addEventListener("prefill-b2b-inquiry", handlePrefill);
    return () => window.removeEventListener("prefill-b2b-inquiry", handlePrefill);
  }, []);

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
    setDisplayPhone("");
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (countryCode === "+998") {
      const formatted = formatUzbekPhone(raw);
      setDisplayPhone(formatted === "+998 " ? "" : formatted);
    } else {
      setDisplayPhone(raw);
    }
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const validateClient = (): FieldErrors => {
    const errors: FieldErrors = {};
    const cleanName = formData.name.trim();
    const cleanBusiness = formData.business.trim();
    const cleanMessage = formData.message.trim();

    if (cleanName.length < 2 || cleanName.length > 60) {
      errors.name = formCopy.errors.nameRequired;
    }

    const rawDigits = displayPhone.replace(/\D/g, "");
    if (countryCode === "+998") {
      const digitsWithout998 = rawDigits.startsWith("998") ? rawDigits.slice(3) : rawDigits;
      if (digitsWithout998.length !== 9) {
        errors.phone = formCopy.errors.phoneInvalid;
      }
    } else {
      const full = `${countryCode}${rawDigits}`;
      if (!internationalPhoneRegex.test(full) || rawDigits.length < 5) {
        errors.phone = formCopy.errors.phoneInvalid;
      }
    }

    if (cleanBusiness.length < 2 || cleanBusiness.length > 120) {
      errors.business = formCopy.errors.businessRequired;
    }

    if (cleanMessage.length > 1000) {
      errors.message = formCopy.errors.messageTooLong;
    }

    return errors;
  };

  const focusFirstError = (errors: FieldErrors) => {
    if (errors.name) {
      nameInputRef.current?.focus();
    } else if (errors.phone) {
      phoneInputRef.current?.focus();
    } else if (errors.business) {
      businessInputRef.current?.focus();
    } else if (errors.message) {
      messageInputRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitLockRef.current || status === "submitting") return;

    setServerError(null);

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus("error");
      focusFirstError(clientErrors);
      return;
    }

    setFieldErrors({});

    const rawDigits = displayPhone.replace(/\D/g, "");
    const cleanPhone =
      countryCode === "+998"
        ? rawDigits.startsWith("998")
          ? `+${rawDigits}`
          : `+998${rawDigits}`
        : `${countryCode}${rawDigits}`;

    const cleanName = formData.name.trim();
    const cleanBusiness = formData.business.trim();
    const cleanMessage = formData.message.trim();
    const selectedTopicOption = formCopy.topicOptions.find(
      (opt) => opt.id === formData.topic
    );
    const topicLabel = selectedTopicOption?.label || formData.topic;

    submitLockRef.current = true;
    setStatus("submitting");

    // Background submission to API
    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          business: cleanBusiness,
          service: topicLabel,
          question: cleanMessage,
          locale: safeLocale,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          honeypot: formData.honeypot,
        }),
      }).catch(() => {
        // fail-silent
      });
    } catch {
      // fail-silent
    }

    setTimeout(() => {
      setSubmittedSummary({
        name: cleanName,
        phone: countryCode === "+998" ? formatUzbekPhone(cleanPhone) : cleanPhone,
        business: cleanBusiness,
        topic: topicLabel,
        message: cleanMessage || formCopy.summaryLabels.messageEmpty,
      });
      setStatus("success");
      setFormData({
        name: "",
        business: "",
        topic: formCopy.topicOptions[0]?.id || "coop",
        message: "",
        honeypot: "",
      });
      setDisplayPhone("");
      submitLockRef.current = false;
    }, 450);
  };

  const handleReset = () => {
    setStatus("idle");
    setServerError(null);
    setFieldErrors({});
    setSubmittedSummary(null);
  };

  // Official Verified Channels
  const officialChannels = [
    {
      id: "telegram",
      label: "Telegram",
      role: safeLocale === "ru" ? "Приемная и канал" : safeLocale === "en" ? "Desk & Channel" : "Qabulxona va kanal",
      value: "@anvarabduqayum",
      href: "https://t.me/anvarabduqayum",
      cue: directory.cues.message || "Yozish",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      ),
      iconBg: "bg-[#229ED9]/10 text-[#229ED9] group-hover:bg-[#229ED9] group-hover:text-white",
    },
    {
      id: "instagram",
      label: "Instagram",
      role: safeLocale === "ru" ? "Официальная страница" : safeLocale === "en" ? "Official Page" : "Rasmiy sahifa",
      value: "@anvar_abduqayum",
      href: "https://www.instagram.com/anvar_abduqayum",
      cue: directory.cues.open || "Ochish",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      iconBg: "bg-[#E4405F]/10 text-[#E4405F] group-hover:bg-[#E4405F] group-hover:text-white",
    },
    {
      id: "youtube",
      label: "YouTube",
      role: safeLocale === "ru" ? "Видео и интервью" : safeLocale === "en" ? "Videos & Interviews" : "Video va intervyular",
      value: "@AnvarAbduqayum",
      href: "https://www.youtube.com/@AnvarAbduqayum",
      cue: directory.cues.open || "Ko‘rish",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
        </svg>
      ),
      iconBg: "bg-[#FF0000]/10 text-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white",
    },
    {
      id: "email",
      label: safeLocale === "ru" ? "Электронная почта" : safeLocale === "en" ? "Email" : "Elektron pochta",
      role: safeLocale === "ru" ? "Деловые предложения" : safeLocale === "en" ? "Commercial Inquiries" : "Tijoriy takliflar",
      value: "info@anvarabduqayum.uz",
      href: "mailto:info@anvarabduqayum.uz",
      cue: directory.cues.email || "Xat yozish",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      iconBg: "bg-[#B8860B]/10 text-[#7A5600] group-hover:bg-[#B8860B] group-hover:text-white",
    },
  ];

  return (
    <section
      id="aloqa"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 sm:scroll-mt-28 pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28 bg-[var(--bg-stone)] border-b border-[var(--border-hairline-editorial)]"
    >
      {/* Top Hairline Transition Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#DDB52E]/35 to-transparent pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[var(--border-hairline-editorial)] mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-[var(--accent-gold-soft)] border border-[var(--accent-gold-border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.16em] uppercase text-[var(--accent-gold-ink)] font-bold">
                07 {"//"} {safeLocale === "ru"
                  ? "СВЯЗЬ И ПАРТНЕРСТВО"
                  : safeLocale === "en"
                  ? "CONTACT & INQUIRIES"
                  : "ALOQA VA HAMKORLIK"}
              </span>
            </div>
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(28px,3.8vw,44px)] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--text-ink)]"
            >
              {directory.title}
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] sm:text-[16px] leading-[1.6] text-[var(--text-soft-editorial)] lg:text-right [text-wrap:pretty]">
            {directory.lead}
          </p>
        </header>

        {/* 2-Column Responsive Layout: Direct Channels + Modern Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Direct Official Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-editorial-subtle)]">
            <div>
              <div className="pb-5 border-b border-[var(--border-hairline-editorial)] mb-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-gold-ink)] block mb-1">
                  {safeLocale === "ru" ? "ПРЯМАЯ СВЯЗЬ" : safeLocale === "en" ? "DIRECT CHANNELS" : "TO‘G‘RIDAN-TO‘G‘RI ALOQA"}
                </span>
                <h3 className="font-serif text-[24px] sm:text-[26px] font-bold text-[var(--text-ink)] leading-snug">
                  {directory.heading}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-soft-editorial)]">
                  {directory.subheading}
                </p>
              </div>

              {/* Verified Channels List */}
              <div className="space-y-3">
                {officialChannels.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] hover:border-[#D4AF37] hover:bg-white hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${channel.iconBg}`}>
                        {channel.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[14.5px] sm:text-[15px] text-[var(--text-ink)] group-hover:text-[var(--accent-gold-ink)] transition-colors leading-tight">
                            {channel.label}
                          </span>
                          <span className="hidden sm:inline text-[11px] text-[var(--text-muted-aa)] font-mono">
                            · {channel.role}
                          </span>
                        </div>
                        <span className="text-[13px] sm:text-[13.5px] font-mono text-[var(--text-soft-editorial)] block truncate mt-0.5">
                          {channel.value}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 font-mono text-[11.5px] font-semibold text-[var(--accent-gold-ink)] group-hover:translate-x-1 transition-transform pl-2">
                      <span className="hidden sm:inline">{channel.cue}</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Helper Note */}
            <div className="mt-6 pt-5 border-t border-[var(--border-hairline-editorial)]">
              <p className="text-[12.5px] text-[var(--text-muted-aa)] leading-relaxed">
                {safeLocale === "ru"
                  ? "Для официальных запросов прессы и коммерческих предложений используйте электронную почту или форму обратной связи."
                  : safeLocale === "en"
                  ? "For official press inquiries and commercial proposals, please use email or the online inquiry form."
                  : "Rasmiy OAV so‘rovlari va tijoriy takliflar uchun elektron pochta yoki onlayn ariza shaklidan foydalaning."}
              </p>
            </div>
          </div>

          {/* Right Column: Clean Online Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[var(--shadow-editorial-subtle)] flex flex-col justify-between">
            <div>
              <div className="pb-5 border-b border-[var(--border-hairline-editorial)] mb-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-gold-ink)] block mb-1">
                  {safeLocale === "ru" ? "ОНЛАЙН ПРИЕМНАЯ" : safeLocale === "en" ? "ONLINE INQUIRY" : "ONLAYN QABULXONA"}
                </span>
                <h3 className="font-serif text-[24px] sm:text-[26px] font-bold text-[var(--text-ink)] leading-snug">
                  {formCopy.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-soft-editorial)]">
                  {formCopy.subtitle}
                </p>
              </div>

              {status === "success" && submittedSummary ? (
                /* Success Confirmation State */
                <div
                  id="contact-success-panel"
                  role="status"
                  aria-live="polite"
                  className="p-6 sm:p-8 bg-[var(--bg-alabaster)] border border-[var(--status-success-border)] rounded-xl flex flex-col gap-5 animate-in fade-in duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--status-success-wash)] border border-[var(--status-success-border)] text-[var(--status-success-ink)] flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-serif text-[20px] sm:text-[22px] font-bold leading-tight text-[var(--status-success-ink)]">
                        {formCopy.successTitle}
                      </h4>
                      <p className="text-[13.5px] text-[var(--text-soft-editorial)] mt-0.5">
                        {formCopy.successMessage}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[var(--border-hairline-editorial)] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
                    <div className="p-3 rounded-lg bg-white border border-[var(--border-hairline-editorial)]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted-aa)] block">
                        {formCopy.summaryLabels.name}
                      </span>
                      <span className="font-semibold text-[var(--text-ink)] mt-0.5 block truncate">
                        {submittedSummary.name}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-[var(--border-hairline-editorial)]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted-aa)] block">
                        {formCopy.summaryLabels.phone}
                      </span>
                      <span className="font-semibold font-mono text-[var(--text-ink)] mt-0.5 block truncate">
                        {submittedSummary.phone}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-[var(--border-hairline-editorial)]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted-aa)] block">
                        {formCopy.summaryLabels.business}
                      </span>
                      <span className="font-semibold text-[var(--text-ink)] mt-0.5 block truncate">
                        {submittedSummary.business}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-[var(--border-hairline-editorial)]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted-aa)] block">
                        {formCopy.summaryLabels.topic}
                      </span>
                      <span className="font-semibold text-[var(--text-ink)] mt-0.5 block truncate">
                        {submittedSummary.topic}
                      </span>
                    </div>

                    {submittedSummary.message && (
                      <div className="sm:col-span-2 p-3 rounded-lg bg-white border border-[var(--border-hairline-editorial)]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted-aa)] block">
                          {formCopy.summaryLabels.message}
                        </span>
                        <p className="text-[13.5px] text-[var(--text-soft-editorial)] mt-1 whitespace-pre-line">
                          {submittedSummary.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="min-h-[44px] px-6 bg-[var(--bg-dark)] text-white hover:bg-[#DDB52E] hover:text-black rounded-xl text-[13.5px] font-semibold inline-flex items-center gap-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{formCopy.resetButton}</span>
                      <span aria-hidden="true">↺</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Inquiry Form */
                <form
                  id="contact-inquiry-form"
                  onSubmit={handleSubmit}
                  noValidate
                  suppressHydrationWarning
                  className="flex flex-col gap-5"
                >
                  {/* Anti-spam honeypot */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
                  >
                    <label htmlFor="contact-honeypot">Website</label>
                    <input
                      id="contact-honeypot"
                      name="honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      suppressHydrationWarning
                      value={formData.honeypot}
                      onChange={(e) => handleFieldChange("honeypot", e.target.value)}
                    />
                  </div>

                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-name"
                        className="text-[13.5px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.nameLabel} <span className="text-[#B42318]">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        maxLength={60}
                        autoComplete="name"
                        suppressHydrationWarning
                        value={formData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        placeholder={formCopy.namePlaceholder}
                        aria-invalid={fieldErrors.name ? "true" : undefined}
                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                        className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-[14.5px] text-[var(--text-ink)] placeholder:text-[13.5px] placeholder:text-[var(--text-muted-aa)] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:bg-white ${
                          fieldErrors.name
                            ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                            : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)]"
                        }`}
                      />
                      {fieldErrors.name && (
                        <span
                          id="contact-name-error"
                          role="alert"
                          className="text-[12px] font-medium text-[var(--status-error-ink)]"
                        >
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-phone"
                        className="text-[13.5px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.phoneLabel} <span className="text-[#B42318]">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          aria-label="Davlat kodi"
                          value={countryCode}
                          onChange={handleCountryCodeChange}
                          suppressHydrationWarning
                          className="w-[100px] shrink-0 min-h-[46px] px-2.5 rounded-xl border font-mono text-[13px] text-[var(--text-ink)] bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] cursor-pointer"
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
                          suppressHydrationWarning
                          value={displayPhone}
                          onChange={handlePhoneChange}
                          placeholder={countryCode === "+998" ? "(90) 123-45-67" : "123 45 67"}
                          aria-invalid={fieldErrors.phone ? "true" : undefined}
                          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                          className={`flex-1 min-w-0 min-h-[46px] px-3.5 py-2.5 rounded-xl border font-mono tabular-nums text-[14.5px] text-[var(--text-ink)] placeholder:text-[13.5px] placeholder:font-sans placeholder:text-[var(--text-muted-aa)] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:bg-white ${
                            fieldErrors.phone
                              ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                              : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)]"
                          }`}
                        />
                      </div>
                      {fieldErrors.phone && (
                        <span
                          id="contact-phone-error"
                          role="alert"
                          className="text-[12px] font-medium text-[var(--status-error-ink)]"
                        >
                          {fieldErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Business + Topic */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Business */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-business"
                        className="text-[13.5px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.businessLabel} <span className="text-[#B42318]">*</span>
                      </label>
                      <input
                        ref={businessInputRef}
                        id="contact-business"
                        name="business"
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="organization"
                        suppressHydrationWarning
                        value={formData.business}
                        onChange={(e) => handleFieldChange("business", e.target.value)}
                        placeholder={formCopy.businessPlaceholder}
                        aria-invalid={fieldErrors.business ? "true" : undefined}
                        aria-describedby={fieldErrors.business ? "contact-business-error" : undefined}
                        className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-[14.5px] text-[var(--text-ink)] placeholder:text-[13.5px] placeholder:text-[var(--text-muted-aa)] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:bg-white ${
                          fieldErrors.business
                            ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                            : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)]"
                        }`}
                      />
                      {fieldErrors.business && (
                        <span
                          id="contact-business-error"
                          role="alert"
                          className="text-[12px] font-medium text-[var(--status-error-ink)]"
                        >
                          {fieldErrors.business}
                        </span>
                      )}
                    </div>

                    {/* Topic */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-topic"
                        className="text-[13.5px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.topicLabel}
                      </label>
                      <div className="relative">
                        <select
                          id="contact-topic"
                          name="topic"
                          value={formData.topic}
                          onChange={(e) => handleFieldChange("topic", e.target.value)}
                          suppressHydrationWarning
                          className="w-full min-h-[46px] px-4 py-2.5 pr-10 rounded-xl appearance-none bg-[var(--bg-alabaster)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] text-[14px] text-[var(--text-ink)] cursor-pointer transition-all duration-150"
                        >
                          {formCopy.topicOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[var(--text-muted-aa)]">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <label
                      htmlFor="contact-message"
                      className="text-[13.5px] font-semibold text-[var(--text-ink)]"
                    >
                      {formCopy.messageLabel}
                    </label>
                    <textarea
                      ref={messageInputRef}
                      id="contact-message"
                      name="message"
                      rows={3}
                      maxLength={1000}
                      suppressHydrationWarning
                      value={formData.message}
                      onChange={(e) => handleFieldChange("message", e.target.value)}
                      placeholder={formCopy.messagePlaceholder}
                      aria-invalid={fieldErrors.message ? "true" : undefined}
                      aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                      className={`w-full min-h-[110px] p-4 rounded-xl border text-[14.5px] leading-relaxed text-[var(--text-ink)] placeholder:text-[13.5px] placeholder:text-[var(--text-muted-aa)] resize-y transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:bg-white ${
                        fieldErrors.message
                          ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                          : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)]"
                      }`}
                    />
                    {fieldErrors.message && (
                      <span
                        id="contact-message-error"
                        role="alert"
                        className="text-[12px] font-medium text-[var(--status-error-ink)]"
                      >
                        {fieldErrors.message}
                      </span>
                    )}
                  </div>

                  {/* Server Error Banner */}
                  {serverError && (
                    <div
                      id="contact-server-error"
                      role="alert"
                      className="p-4 bg-[var(--status-error-wash)] border border-[var(--status-error-border)] rounded-xl flex flex-col gap-2"
                    >
                      <p className="text-[13.5px] font-medium leading-[1.5] text-[var(--status-error-ink)]">
                        {serverError}
                      </p>
                    </div>
                  )}

                  {/* Submit Button & Security Note */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <MagneticPull className="w-full sm:w-auto">
                      <button
                        id="contact-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="w-full sm:w-auto min-h-[48px] px-8 bg-[#111215] text-white hover:bg-[#DDB52E] hover:text-black active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl text-[14px] font-semibold inline-flex items-center justify-center gap-2.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDB52E] cursor-pointer shadow-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{formCopy.submitting}</span>
                          </>
                        ) : (
                          <>
                            <span>{formCopy.submitButton}</span>
                            <span aria-hidden="true">→</span>
                          </>
                        )}
                      </button>
                    </MagneticPull>

                    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-soft-editorial)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[var(--accent-gold-ink)]">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>
                        {safeLocale === "ru"
                          ? "Конфиденциальность гарантируется"
                          : safeLocale === "en"
                          ? "Confidentiality guaranteed"
                          : "Ma’lumotlar maxfiyligi kafolatlanadi"}
                      </span>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Information Ledger: Response Protocol & Headquarters */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] text-[13.5px] text-[var(--text-soft-editorial)] shadow-[var(--shadow-editorial-subtle)] leading-relaxed">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)] flex items-center justify-center shrink-0 mt-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-[var(--text-ink)] block mb-1 text-[14px]">
                {safeLocale === "ru" ? "Регламент ответа и график" : safeLocale === "en" ? "Response protocol & hours" : "Javob berish tartibi va ish vaqti"}
              </span>
              {safeLocale === "ru"
                ? "Пн – Пт, 09:00 – 18:00 (время Ташкента). Все обращения рассматриваются секретариатом в течение 24–48 часов."
                : safeLocale === "en"
                ? "Mon – Fri, 09:00 – 18:00 (Tashkent time). All inquiries are reviewed by executive team within 24–48 hours."
                : "Dushanba – Juma, 09:00 – 18:00 (Toshkent vaqti). Barcha arizalar mas’ul jamoa tomonidan 24–48 soat ichida ko‘rib chiqiladi."}
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] text-[13.5px] text-[var(--text-soft-editorial)] shadow-[var(--shadow-editorial-subtle)] leading-relaxed">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)] flex items-center justify-center shrink-0 mt-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-[var(--text-ink)] block mb-1 text-[14px]">
                {safeLocale === "ru" ? "Главный офис и прием" : safeLocale === "en" ? "Headquarters & address" : "Boshqaruv qarorgohi va manzil"}
              </span>
              <span>
                {safeLocale === "ru"
                  ? "Ташкент, Узбекистан. Завод Toybola (VISAGE ELECTRIC MChJ) и общественный совет UZBIC."
                  : safeLocale === "en"
                  ? "Tashkent, Uzbekistan. Toybola Plant (VISAGE ELECTRIC LLC) and UZBIC Council."
                  : "Toshkent shahri, O‘zbekiston. Toybola zavodi (VISAGE ELECTRIC MChJ) va UZBIC Kengashi."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
