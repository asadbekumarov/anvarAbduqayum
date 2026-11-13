"use client";

import React, { useRef, useState } from "react";
import { activeBookingMode, hasVerifiedBookingChannel } from "@/config/booking";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";
import { featuresConfig } from "@/config/features";
import { getDemoCopy } from "@/config/demoCopy";
import { BookingActionLink } from "@/components/ui/BookingActionLink";
import {
  MagneticPull,
  ScrollReveal,
  StaggeredTextReveal,
} from "@/components/ui/LuxuryMotion";
import {
  formatUzbekPhone,
} from "@/lib/formatPhone";
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

interface ApiResponsePayload {
  ok?: boolean;
  error?: string;
  errors?: Record<string, string[] | undefined>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  locale = "uz",
}) => {
  const safeLocale = locale === "ru" || locale === "en" ? locale : "uz";
  const isDemoMode = featuresConfig.demoMode;
  const content = getContent(safeLocale);
  const demoCopy = getDemoCopy(safeLocale);
  const { booking, directory, form: formCopy } = content.contact;
  const displayedBookingRoute =
    activeBookingMode === "telegram" &&
    contactConfig.telegramDirect.isVerified &&
    contactConfig.telegramDirect.display
      ? contactConfig.telegramDirect.display
      : `/${safeLocale}/bron`;

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

  // Prevent concurrent submissions within the same frame before state re-renders
  const submitLockRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const businessInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const isSubmitting = status === "submitting";

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCode = e.target.value;
    setCountryCode(nextCode);
    setDisplayPhone((prev) => {
      const current = prev.trim();
      const withoutCode = current.startsWith(countryCode)
        ? current.slice(countryCode.length).trimStart()
        : current.replace(/^\+\d{1,4}\s*/, "");
      return withoutCode ? `${nextCode} ${withoutCode}` : `${nextCode} `;
    });
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayPhone(raw);
    const cleaned = raw.replace(/[\s\-()]/g, "");
    const fullPhone = cleaned.startsWith("+")
      ? cleaned
      : `${countryCode}${cleaned.replace(/^\+/, "")}`;
    if (fieldErrors.phone && internationalPhoneRegex.test(fullPhone)) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleFieldChange = (
    field: keyof FormState,
    value: string
  ) => {
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

    const cleanedPhone = displayPhone.trim().replace(/[\s\-()]/g, "");
    const fullPhone = cleanedPhone.startsWith("+")
      ? cleanedPhone
      : `${countryCode}${cleanedPhone.replace(/^\+/, "")}`;
    const isPhoneValid = internationalPhoneRegex.test(fullPhone);

    if (!isPhoneValid || cleanedPhone.length < 5) {
      errors.phone = formCopy.errors.phoneInvalid;
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

    if (isDemoMode) {
      // Demo Safety Mode: validate client-side only; never retain, log, or transmit entered PII
      setSubmittedSummary(null);
      setFormData({
        name: "",
        business: "",
        topic: formCopy.topicOptions[0]?.id || "coop",
        message: "",
        honeypot: "",
      });
      setDisplayPhone("");
      setStatus("success");
      return;
    }

    submitLockRef.current = true;
    setStatus("submitting");

    const cleanedPhone = displayPhone.trim().replace(/[\s\-()]/g, "");
    const normalizedPhone = cleanedPhone.startsWith("+")
      ? cleanedPhone
      : `${countryCode}${cleanedPhone.replace(/^\+/, "")}`;
    const cleanName = formData.name.trim();
    const cleanBusiness = formData.business.trim();
    const cleanMessage = formData.message.trim();
    const selectedTopicOption = formCopy.topicOptions.find(
      (opt) => opt.id === formData.topic
    );
    const topicLabel = selectedTopicOption?.label || formData.topic;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          phone: normalizedPhone,
          business: cleanBusiness,
          service: topicLabel,
          question: cleanMessage,
          locale: safeLocale,
          pageUrl:
            typeof window !== "undefined" ? window.location.href : undefined,
          honeypot: formData.honeypot,
        }),
      });

      let payload: ApiResponsePayload | null = null;
      try {
        payload = (await response.json()) as ApiResponsePayload;
      } catch {
        payload = null;
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const rateMsg = retryAfter
          ? `${formCopy.errors.rateLimited} (${formCopy.errors.retrySuffix} ${retryAfter})`
          : payload?.error || formCopy.errors.rateLimited;
        setStatus("error");
        setServerError(rateMsg);
        return;
      }

      if (response.status === 400) {
        const serverFieldErrors: FieldErrors = {};
        if (payload?.errors?.name?.[0]) {
          serverFieldErrors.name = payload.errors.name[0];
        }
        if (payload?.errors?.phone?.[0]) {
          serverFieldErrors.phone = payload.errors.phone[0];
        }
        if (payload?.errors?.business?.[0]) {
          serverFieldErrors.business = payload.errors.business[0];
        }
        if (payload?.errors?.question?.[0]) {
          serverFieldErrors.message = payload.errors.question[0];
        }
        setFieldErrors(serverFieldErrors);
        setStatus("error");
        setServerError(payload?.error || formCopy.errors.validationSummary);
        focusFirstError(serverFieldErrors);
        return;
      }

      if (!response.ok || payload?.ok !== true) {
        setStatus("error");
        setServerError(payload?.error || formCopy.errors.serverError);
        return;
      }

      setSubmittedSummary({
        name: cleanName,
        phone: formatUzbekPhone(normalizedPhone),
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
    } catch {
      setStatus("error");
      setServerError(formCopy.errors.networkError);
    } finally {
      submitLockRef.current = false;
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setServerError(null);
    setFieldErrors({});
    setSubmittedSummary(null);
  };

  const officialChannels = [
    contactConfig.phone.isVerified && contactConfig.phone.href
      ? {
          id: "phone",
          label: directory.phoneLabel,
          value: contactConfig.phone.display,
          href: contactConfig.phone.href,
          cue: directory.cues.call,
          external: false,
        }
      : null,
    contactConfig.telegramDirect.isVerified && contactConfig.telegramDirect.url
      ? {
          id: "tg-admin",
          label: directory.tgAdminLabel,
          value: contactConfig.telegramDirect.display,
          href: contactConfig.telegramDirect.url,
          cue: directory.cues.message,
          external: true,
        }
      : null,
    contactConfig.telegramChannel.isVerified && contactConfig.telegramChannel.url
      ? {
          id: "tg-channel",
          label: directory.tgChannelLabel,
          value: contactConfig.telegramChannel.display,
          href: contactConfig.telegramChannel.url,
          cue: directory.cues.open,
          external: true,
        }
      : null,
    contactConfig.email.isVerified && contactConfig.email.href
      ? {
          id: "email",
          label: directory.emailLabel,
          value: contactConfig.email.address,
          href: contactConfig.email.href,
          cue: directory.cues.email,
          external: false,
        }
      : null,
    contactConfig.instagram.isVerified && contactConfig.instagram.url
      ? {
          id: "instagram",
          label: directory.instagramLabel,
          value: contactConfig.instagram.display,
          href: contactConfig.instagram.url,
          cue: directory.cues.open,
          external: true,
        }
      : null,
    contactConfig.youtube.isVerified && contactConfig.youtube.url
      ? {
          id: "youtube",
          label: directory.youtubeLabel,
          value: contactConfig.youtube.display,
          href: contactConfig.youtube.url,
          cue: directory.cues.open,
          external: true,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  const hasAnyDirectVerifiedChannel =
    (contactConfig.phone.isVerified && Boolean(contactConfig.phone.href)) ||
    (contactConfig.telegramDirect.isVerified && Boolean(contactConfig.telegramDirect.url)) ||
    (contactConfig.telegramChannel.isVerified && Boolean(contactConfig.telegramChannel.url)) ||
    (contactConfig.email.isVerified && Boolean(contactConfig.email.href));

  return (
    <section
      id="aloqa"
      aria-labelledby="contact-heading"
      className="relative"
    >
      {/* BAND 1: CONSULTATION BOOKING COMMITMENT (OBSIDIAN EDITORIAL) */}
      <div
        id="konsultatsiya-band"
        className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] border-b border-[var(--border-on-dark)] py-8 lg:py-11"
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 min-w-0">
              <h2
                id="booking-heading"
                className="font-serif text-[clamp(30px,4vw,48px)] font-semibold leading-[1.09] tracking-[-0.02em] text-[var(--text-on-dark)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
              >
                <StaggeredTextReveal text={booking.title} />
              </h2>

              <p className="mt-4 text-[17px] leading-[1.65] text-[var(--text-muted-on-dark)] max-w-[56ch] [text-wrap:pretty]">
                {booking.lead}
              </p>

              <dl className="mt-10 border-t border-[var(--border-on-dark)] grid grid-cols-1 sm:grid-cols-3">
                {booking.specs.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className={`py-4 border-b border-[var(--border-on-dark-subtle)] sm:border-b-0 ${
                      idx > 0
                        ? "sm:pl-4 sm:border-l sm:border-[var(--border-on-dark-subtle)]"
                        : ""
                    } ${idx < booking.specs.length - 1 ? "sm:pr-4" : ""}`}
                  >
                    <dt className="text-[13.5px] font-semibold text-[var(--accent-gold-light)]">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-[15.5px] font-medium text-[var(--text-on-dark)] leading-[1.45]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <ScrollReveal delay={0.12} y={32} className="lg:col-span-5">
            <aside
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
                </MagneticPull>

                {activeBookingMode === "calcom" &&
                contactConfig.telegramDirect.isVerified &&
                contactConfig.telegramDirect.url ? (
                  <a
                    href={contactConfig.telegramDirect.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-3 text-[14.5px] font-semibold text-[var(--text-on-dark)] hover:text-[var(--accent-gold-light)] active:text-[var(--accent-gold-light)] border-b border-[var(--border-on-dark)] hover:border-[var(--accent-gold-light)] inline-flex items-center transition-[color,border-color] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                  >
                    {booking.telegramCta}
                  </a>
                ) : hasVerifiedBookingChannel &&
                  contactConfig.phone.isVerified &&
                  contactConfig.phone.href ? (
                  <a
                    href={contactConfig.phone.href}
                    className="min-h-[48px] px-3 text-[14.5px] font-semibold tabular-nums text-[var(--text-on-dark)] hover:text-[var(--accent-gold-light)] active:text-[var(--accent-gold-light)] border-b border-[var(--border-on-dark)] hover:border-[var(--accent-gold-light)] inline-flex items-center transition-[color,border-color] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                  >
                    {contactConfig.phone.display}
                  </a>
                ) : null}
              </div>

              {isDemoMode && (
                <p className="text-[12.5px] leading-[1.55] text-[var(--text-muted-on-dark)] border-t border-[var(--border-on-dark-subtle)] pt-3">
                  {demoCopy.externalChannels.outboundNotice}
                </p>
              )}
            </aside>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* BAND 2: CONTACT DIRECTORY & ACCESSIBLE INQUIRY FORM (WARM STONE) */}
      <div
        id="aloqa-kanallar"
        className="bg-[var(--bg-stone)] text-[var(--text-ink)] border-b border-[var(--border-hairline-editorial)] py-20 lg:py-28 scroll-mt-20"
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end pb-6 border-b border-[var(--border-hairline-editorial)] mb-12 lg:mb-16">
            <h2
              id="contact-heading"
              className="lg:col-span-7 font-serif text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
            >
              {directory.title}
            </h2>
            <p className="lg:col-span-5 text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[54ch] [text-wrap:pretty]">
              {directory.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Ruled Official Contact Ledger */}
            <div className="lg:col-span-5 min-w-0">
              <h3 className="font-serif text-[24px] font-semibold leading-[1.25] text-[var(--text-ink)] mb-1 [text-wrap:balance]">
                {directory.heading}
              </h3>
              <p className="text-[15.5px] leading-[1.6] text-[var(--text-soft-editorial)] mb-5">
                {directory.subheading}
              </p>

              {isDemoMode && (
                <div
                  id="contact-external-channels-notice"
                  className="mb-5 p-3.5 bg-[var(--bg-alabaster)] border border-[var(--border-gold)] rounded-[2px]"
                >
                  <p className="text-[13px] font-semibold text-[var(--accent-gold-ink)] mb-1">
                    {demoCopy.externalChannels.channelsBadge}
                  </p>
                  <p className="text-[13.5px] leading-[1.55] text-[var(--text-soft-editorial)]">
                    {demoCopy.externalChannels.channelsNote}
                  </p>
                </div>
              )}

              <ul className="border-t border-[var(--border-hairline-editorial-strong)]">
                {officialChannels.map((channel) => (
                  <li
                    key={channel.id}
                    className="border-b border-[var(--border-hairline-editorial)]"
                  >
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group grid grid-cols-[minmax(0,1fr)_auto] gap-2 items-center py-4 px-2 min-h-[60px] hover:bg-[var(--accent-gold-soft)] active:bg-[var(--accent-gold-soft)] transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium text-[var(--text-muted-aa)]">
                          {channel.label}
                        </span>
                        <span className="block text-[clamp(14.5px,4.2vw,17px)] font-semibold text-[var(--text-ink)] mt-0.5 tabular-nums [overflow-wrap:break-word] transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none">
                          {channel.value}
                        </span>
                      </span>
                      <span className="text-[13.5px] font-semibold text-[var(--accent-gold-ink)] transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none">
                        {channel.cue}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-[var(--bg-alabaster)] border border-[var(--border-hairline-editorial-strong)] rounded-[2px]">
                <p className="text-[14.5px] font-semibold text-[var(--text-ink)]">
                  {directory.officeTitle}
                </p>
                <p className="mt-1 text-[14.5px] leading-[1.55] text-[var(--text-soft-editorial)]">
                  {directory.officeCopy}
                </p>
                {!hasAnyDirectVerifiedChannel && (
                  <p className="mt-2 pt-2 border-t border-[var(--border-hairline-subtle)] text-[13px] leading-[1.5] text-[var(--text-muted-aa)]">
                    {demoCopy.externalChannels.pendingContactsNote}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Accessible Inquiry Form */}
            <div className="lg:col-span-7 bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] rounded-[2px] p-6 sm:p-10 shadow-[var(--shadow-editorial-subtle)] min-w-0">
              <div className="pb-4 border-b border-[var(--border-hairline-editorial)] mb-6">
                <h3 className="font-serif text-[26px] font-semibold leading-[1.22] text-[var(--text-ink)] [text-wrap:balance]">
                  {formCopy.title}
                </h3>
                {isDemoMode && (
                  <p
                    id="contact-demo-badge"
                    className="mt-2 text-[13px] font-semibold text-[var(--accent-gold-ink)]"
                  >
                    {demoCopy.contactForm.badge}
                  </p>
                )}
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[var(--text-soft-editorial)]">
                  {isDemoMode
                    ? demoCopy.contactForm.subtitle
                    : formCopy.subtitle}
                </p>
              </div>

              {status === "success" && isDemoMode ? (
                <div
                  id="contact-success-panel"
                  role="status"
                  aria-live="polite"
                  className="p-6 bg-[var(--bg-alabaster)] border border-[var(--border-gold)] rounded-[2px] flex flex-col gap-3"
                >
                  <h4 className="font-serif text-[22px] font-semibold leading-[1.3] text-[var(--text-ink)]">
                    {demoCopy.contactForm.successTitle}
                  </h4>
                  <p className="text-[13px] font-semibold text-[var(--accent-gold-ink)]">
                    {demoCopy.contactForm.badge}
                  </p>
                  <p className="text-[15px] leading-[1.6] text-[var(--text-soft-editorial)]">
                    {demoCopy.contactForm.successMessage}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="min-h-[46px] px-5 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] rounded-[2px] text-[14.5px] font-semibold inline-flex items-center transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      {demoCopy.contactForm.resetButton}
                    </button>
                  </div>
                </div>
              ) : status === "success" && submittedSummary ? (
                <div
                  id="contact-success-panel"
                  role="status"
                  aria-live="polite"
                  className="p-6 bg-[var(--bg-alabaster)] border border-[var(--status-success-border)] rounded-[2px] flex flex-col gap-4"
                >
                  <h4 className="font-serif text-[22px] font-semibold leading-[1.3] text-[var(--status-success-ink)]">
                    {formCopy.successTitle}
                  </h4>
                  <p className="text-[15px] leading-[1.6] text-[var(--text-soft-editorial)]">
                    {formCopy.successMessage}
                  </p>

                  <ul className="border-t border-[var(--border-hairline-editorial)] pt-3 grid gap-1.5 text-[14.5px] text-[var(--text-ink)]">
                    <li>
                      <strong>{formCopy.summaryLabels.name}: </strong>
                      {submittedSummary.name}
                    </li>
                    <li>
                      <strong>{formCopy.summaryLabels.phone}: </strong>
                      {submittedSummary.phone}
                    </li>
                    <li>
                      <strong>{formCopy.summaryLabels.business}: </strong>
                      {submittedSummary.business}
                    </li>
                    <li>
                      <strong>{formCopy.summaryLabels.topic}: </strong>
                      {submittedSummary.topic}
                    </li>
                    <li>
                      <strong>{formCopy.summaryLabels.message}: </strong>
                      {submittedSummary.message}
                    </li>
                  </ul>

                  <div className="pt-1 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="min-h-[46px] px-5 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] rounded-[2px] text-[14.5px] font-semibold inline-flex items-center transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      {formCopy.resetButton}
                    </button>
                    <BookingActionLink
                      locale={safeLocale}
                      className="min-h-[46px] px-4 bg-transparent text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--accent-gold-ink)] hover:bg-[var(--accent-gold-soft)] rounded-[2px] text-[14.5px] font-semibold inline-flex items-center transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      {formCopy.bookingFallbackButton}
                    </BookingActionLink>
                  </div>
                </div>
              ) : (
                <form
                  id="contact-inquiry-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Anti-spam honeypot matching /api/apply contract (offscreen) */}
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
                      value={formData.honeypot}
                      onChange={(e) =>
                        handleFieldChange("honeypot", e.target.value)
                      }
                    />
                  </div>

                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-name"
                        className="text-[15px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.nameLabel} *
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        maxLength={60}
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        placeholder={formCopy.namePlaceholder}
                        aria-invalid={fieldErrors.name ? "true" : undefined}
                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                        className={`w-full min-h-[48px] px-4 py-2.5 border rounded-[2px] text-[16px] leading-[1.4] text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)] transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] ${
                          fieldErrors.name
                            ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                            : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-[var(--bg-surface)]"
                        }`}
                      />
                      {fieldErrors.name && (
                        <span
                          id="contact-name-error"
                          role="alert"
                          className="text-[13.5px] font-medium text-[var(--status-error-ink)]"
                        >
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-phone"
                        className="text-[15px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.phoneLabel} *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-[135px_1fr] gap-2">
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
                          className={`w-full min-h-[48px] px-4 py-2.5 border rounded-[2px] text-[16px] leading-[1.4] tabular-nums font-mono text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)] transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] ${
                            fieldErrors.phone
                              ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                              : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-[var(--bg-surface)]"
                          }`}
                        />
                      </div>
                      {fieldErrors.phone && (
                        <span
                          id="contact-phone-error"
                          role="alert"
                          className="text-[13.5px] font-medium text-[var(--status-error-ink)]"
                        >
                          {fieldErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Business + Topic */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-business"
                        className="text-[15px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.businessLabel} *
                      </label>
                      <input
                        ref={businessInputRef}
                        id="contact-business"
                        name="business"
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="organization"
                        value={formData.business}
                        onChange={(e) =>
                          handleFieldChange("business", e.target.value)
                        }
                        placeholder={formCopy.businessPlaceholder}
                        aria-invalid={fieldErrors.business ? "true" : undefined}
                        aria-describedby={
                          fieldErrors.business ? "contact-business-error" : undefined
                        }
                        className={`w-full min-h-[48px] px-4 py-2.5 border rounded-[2px] text-[16px] leading-[1.4] text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)] transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] ${
                          fieldErrors.business
                            ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                            : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-[var(--bg-surface)]"
                        }`}
                      />
                      {fieldErrors.business && (
                        <span
                          id="contact-business-error"
                          role="alert"
                          className="text-[13.5px] font-medium text-[var(--status-error-ink)]"
                        >
                          {fieldErrors.business}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                      <label
                        htmlFor="contact-topic"
                        className="text-[15px] font-semibold text-[var(--text-ink)]"
                      >
                        {formCopy.topicLabel}
                      </label>
                      <select
                        id="contact-topic"
                        name="topic"
                        value={formData.topic}
                        onChange={(e) => handleFieldChange("topic", e.target.value)}
                        className="w-full min-h-[48px] px-4 py-2.5 bg-[var(--bg-alabaster)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-[var(--bg-surface)] rounded-[2px] text-[16px] leading-[1.4] text-[var(--text-ink)] cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
                      >
                        {formCopy.topicOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Brief Message */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <label
                      htmlFor="contact-message"
                      className="text-[15px] font-semibold text-[var(--text-ink)]"
                    >
                      {formCopy.messageLabel}
                    </label>
                    <textarea
                      ref={messageInputRef}
                      id="contact-message"
                      name="message"
                      rows={3}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) =>
                        handleFieldChange("message", e.target.value)
                      }
                      placeholder={formCopy.messagePlaceholder}
                      aria-invalid={fieldErrors.message ? "true" : undefined}
                      aria-describedby={
                        fieldErrors.message ? "contact-message-error" : undefined
                      }
                      className={`w-full min-h-[112px] px-4 py-3 border rounded-[2px] text-[16px] leading-[1.55] text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)] resize-y transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] ${
                        fieldErrors.message
                          ? "bg-[var(--status-error-wash)] border-[var(--status-error-border)]"
                          : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] focus:bg-[var(--bg-surface)]"
                      }`}
                    />
                    {fieldErrors.message && (
                      <span
                        id="contact-message-error"
                        role="alert"
                        className="text-[13.5px] font-medium text-[var(--status-error-ink)]"
                      >
                        {fieldErrors.message}
                      </span>
                    )}
                  </div>

                  {/* Server / Rate-Limit / Network Error Banner */}
                  {serverError && (
                    <div
                      id="contact-server-error"
                      role="alert"
                      className="p-4 bg-[var(--status-error-wash)] border border-[var(--status-error-border)] rounded-[2px] flex flex-col gap-3"
                    >
                      <p className="text-[14.5px] font-medium leading-[1.5] text-[var(--status-error-ink)]">
                        {serverError}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {contactConfig.telegramDirect.isVerified &&
                          contactConfig.telegramDirect.url && (
                            <a
                              href={contactConfig.telegramDirect.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="min-h-[44px] px-4 bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--accent-gold-ink)] rounded-[2px] text-[13.5px] font-semibold inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                            >
                              {formCopy.telegramFallbackButton}
                            </a>
                          )}
                        {contactConfig.phone.isVerified &&
                          contactConfig.phone.href && (
                            <a
                              href={contactConfig.phone.href}
                              className="min-h-[44px] px-4 bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--accent-gold-ink)] rounded-[2px] text-[13.5px] font-semibold inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                            >
                              {formCopy.callFallbackButton}: {contactConfig.phone.display}
                            </a>
                          )}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="min-h-[48px] px-8 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] active:bg-[var(--bg-dark)] disabled:opacity-60 disabled:cursor-not-allowed rounded-[2px] text-[15px] font-semibold inline-flex items-center justify-center whitespace-nowrap transition-[background-color,border-color] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      {isSubmitting
                        ? formCopy.submitting
                        : isDemoMode
                        ? demoCopy.contactForm.submitButton
                        : formCopy.submitButton}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
