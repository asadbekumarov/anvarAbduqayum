"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { featuresConfig } from "@/config/features";
import {
  getPartnershipContent,
  type PartnershipLocale,
  type PartnershipTrack,
  PARTNERSHIP_TRACKS,
} from "../config/partnershipContent";
import {
  b2bPartnershipSchema,
  normalizeInternationalPhone,
  type B2BPartnershipFormValues,
} from "../schemas/partnershipSchema";

interface PartnershipIntakeViewProps {
  locale: string;
}

type FieldName = keyof B2BPartnershipFormValues;
type FieldErrors = Partial<Record<FieldName, string>>;

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

const INITIAL_VALUES: B2BPartnershipFormValues = {
  track: "export",
  contactName: "",
  company: "",
  phone: "+998 ",
  email: "",
  notes: "",
  honeypot: "",

  // Export
  targetCountry: "",
  hsCategory: "",
  volume: "",

  // Distribution
  region: "",
  retailCoverage: "",
  outlets: "",

  // Manufacturing
  specs: "",
  capacity: "",
  toolingModel: "",

  // General
  inquiryTopic: "",
  proposalDetails: "",
};

export function PartnershipIntakeView({ locale }: PartnershipIntakeViewProps) {
  const safeLocale: PartnershipLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  const content = useMemo(() => getPartnershipContent(safeLocale), [safeLocale]);

  const [activeTrack, setActiveTrack] = useState<PartnershipTrack>("export");
  const [values, setValues] = useState<B2BPartnershipFormValues>(INITIAL_VALUES);
  const [countryCode, setCountryCode] = useState<string>("+998");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Success states
  const [demoSuccessData, setDemoSuccessData] =
    useState<B2BPartnershipFormValues | null>(null);
  const [liveSuccessData, setLiveSuccessData] =
    useState<B2BPartnershipFormValues | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const resolveErrorMessage = (code: string | undefined): string => {
    if (!code) return content.errors.required;
    if (code === "min2") return content.errors.min2;
    if (code === "min10") return content.errors.min10;
    if (code === "invalidPhone") return content.errors.invalidPhone;
    if (code === "invalidEmail") return content.errors.invalidEmail;
    return content.errors.required;
  };

  const updateField = <K extends FieldName>(
    field: K,
    value: B2BPartnershipFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setServerError(null);
  };

  const handleTrackSelect = (track: PartnershipTrack) => {
    setActiveTrack(track);
    setValues((prev) => ({ ...prev, track }));
    setErrors({});
    setServerError(null);
  };

  const handleCountryCodeChange = (nextCode: string) => {
    setCountryCode(nextCode);
    setValues((prev) => {
      const current = prev.phone.trim();
      const withoutCode = current.startsWith(countryCode)
        ? current.slice(countryCode.length).trimStart()
        : current.replace(/^\+\d{1,4}\s*/, "");
      return {
        ...prev,
        phone: withoutCode ? `${nextCode} ${withoutCode}` : `${nextCode} `,
      };
    });
    setErrors((prev) => {
      if (!prev.phone) return prev;
      const next = { ...prev };
      delete next.phone;
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    // Honeypot anti-spam guard
    if (values.honeypot && values.honeypot.trim().length > 0) {
      return;
    }

    const payload: B2BPartnershipFormValues = {
      ...values,
      track: activeTrack,
      phone: normalizeInternationalPhone(values.phone),
    };

    const parsed = b2bPartnershipSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      let firstField: FieldName | null = null;
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && !nextErrors[key]) {
          nextErrors[key] = resolveErrorMessage(issue.message);
          if (!firstField) firstField = key;
        }
      }
      setErrors(nextErrors);
      if (firstField) {
        const el = formRef.current?.querySelector<HTMLElement>(
          `[name="${firstField}"]`
        );
        el?.focus();
      }
      return;
    }

    const validatedData = parsed.data;

    // 4. DEMO MODE GUARD: Strictly respect featuresConfig.demoMode
    // If demoMode === true, the form must NOT hit the API. It validates on client and renders success state.
    if (featuresConfig.demoMode) {
      setDemoSuccessData(validatedData);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Live mode: POST payload to /api/apply
    try {
      setIsSubmitting(true);
      const apiPayload = {
        name: validatedData.contactName,
        phone: validatedData.phone,
        company: validatedData.company,
        business: validatedData.company,
        track: validatedData.track,
        country: validatedData.targetCountry || validatedData.region || "",
        targetCountry: validatedData.targetCountry || "",
        volume: validatedData.volume || validatedData.capacity || "",
        category:
          validatedData.hsCategory ||
          validatedData.retailCoverage ||
          validatedData.inquiryTopic ||
          "",
        productInterest: validatedData.hsCategory || validatedData.specs || "",
        region: validatedData.region || "",
        retailCoverage: validatedData.retailCoverage || "",
        specs: validatedData.specs || "",
        capacity: validatedData.capacity || "",
        email: validatedData.email || "",
        notes: validatedData.notes || validatedData.proposalDetails || "",
        question:
          validatedData.proposalDetails ||
          validatedData.notes ||
          `B2B Track: ${validatedData.track}`,
        service: `B2B Partnership (${validatedData.track.toUpperCase()})`,
        locale: safeLocale,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        setServerError(result.error || content.errors.serverError);
        return;
      }

      setLiveSuccessData(validatedData);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(content.errors.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setDemoSuccessData(null);
    setLiveSuccessData(null);
    setValues(INITIAL_VALUES);
    setCountryCode("+998");
    setErrors({});
    setServerError(null);
  };

  const activeTrackMeta = content.tracks[activeTrack];

  // Dark "Swiss Luxury" styling tokens
  const inputBaseClasses =
    "w-full min-h-[46px] rounded-[2px] border border-white/10 bg-[#0B0C0E] px-4 py-2.5 text-[15px] text-[#F5F5F7] placeholder:text-zinc-500 transition-colors focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]";

  const inputErrorClasses =
    "border-red-500/80 bg-red-950/20 text-red-200 placeholder:text-red-400/50 focus:border-red-400 focus:ring-red-500/50";

  return (
    <div className="mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Header */}
      <header className="mb-8 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/${safeLocale}`}
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#C5A059] transition-colors hover:text-[#E5C378]"
          >
            <span aria-hidden="true">←</span>
            <span>{content.hero.backHome}</span>
          </Link>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-zinc-400">
            {content.hero.industrialKicker}
          </span>
        </div>

        <div className="mt-6">
          <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
            {content.hero.badge}
          </span>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#FBF9F5] sm:text-4xl lg:text-5xl">
            {content.hero.title}{" "}
            <span className="text-[#C5A059]">{content.hero.titleAccent}</span>
          </h1>
          <p className="mt-3.5 max-w-3xl text-[15px] leading-relaxed text-zinc-300">
            {content.hero.subtitle}
          </p>
        </div>

        {/* Demo Mode Notice Badge */}
        {featuresConfig.demoMode && (
          <div
            role="note"
            className="mt-6 rounded-[2px] border border-[#C5A059]/30 bg-[#16181F] p-4 text-xs leading-relaxed text-zinc-300"
          >
            <div className="flex items-center gap-2 text-[#C5A059] font-mono font-semibold tracking-wider">
              <span className="inline-block h-2 w-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span>{content.demoNotice.badge}</span>
            </div>
            <p className="mt-1.5">{content.demoNotice.text}</p>
          </div>
        )}
      </header>

      {/* Success View: Demo Mode */}
      {demoSuccessData && (
        <section
          role="status"
          aria-live="polite"
          className="rounded-[2px] border border-[#C5A059]/50 bg-[#121419] p-6 shadow-2xl sm:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-[2px] border border-[#C5A059]/40 bg-[#C5A059]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#E5C378]">
            <span className="h-2 w-2 rounded-full bg-[#E5C378]" />
            <span>{content.demoSuccess.badge}</span>
          </div>

          <h2 className="mt-5 font-serif text-2xl font-medium text-[#FBF9F5] sm:text-3xl">
            {content.demoSuccess.title}
          </h2>
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">
            {content.demoSuccess.subtitle}
          </p>
          <p className="mt-1.5 text-xs text-zinc-400">
            {content.demoSuccess.explanation}
          </p>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#C5A059]">
              {content.demoSuccess.summaryTitle}
            </h3>

            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-[2px] border border-white/5 bg-[#0B0C0E] p-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {content.demoSuccess.trackLabel}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#F5F5F7]">
                  {content.tracks[demoSuccessData.track].title}
                </dd>
              </div>

              <div className="rounded-[2px] border border-white/5 bg-[#0B0C0E] p-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {content.demoSuccess.companyLabel}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#F5F5F7] truncate">
                  {demoSuccessData.company}
                </dd>
              </div>

              <div className="rounded-[2px] border border-white/5 bg-[#0B0C0E] p-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {content.demoSuccess.contactLabel}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#F5F5F7]">
                  {demoSuccessData.contactName}
                </dd>
              </div>

              <div className="rounded-[2px] border border-white/5 bg-[#0B0C0E] p-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {content.demoSuccess.phoneLabel}
                </dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-[#C5A059]">
                  {demoSuccessData.phone}
                </dd>
              </div>

              <div className="rounded-[2px] border border-white/5 bg-[#0B0C0E] p-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {content.demoSuccess.param1Label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#F5F5F7] truncate">
                  {demoSuccessData.targetCountry ||
                    demoSuccessData.region ||
                    demoSuccessData.specs ||
                    demoSuccessData.inquiryTopic}
                </dd>
              </div>

              <div className="rounded-[2px] border border-white/5 bg-[#0B0C0E] p-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {content.demoSuccess.param2Label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#F5F5F7] truncate">
                  {demoSuccessData.volume ||
                    demoSuccessData.retailCoverage ||
                    demoSuccessData.capacity ||
                    "Standart B2B"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[46px] items-center justify-center rounded-[2px] border border-[#C5A059] bg-[#C5A059] px-7 py-2.5 text-sm font-semibold text-[#0B0C0E] transition-colors hover:bg-[#E5C378]"
            >
              {content.buttons.reset}
            </button>
          </div>
        </section>
      )}

      {/* Success View: Live Dispatched Lead */}
      {liveSuccessData && (
        <section
          role="status"
          aria-live="polite"
          className="rounded-[2px] border border-emerald-500/40 bg-[#121419] p-6 shadow-2xl sm:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-[2px] border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{content.liveSuccess.badge}</span>
          </div>

          <h2 className="mt-5 font-serif text-2xl font-medium text-[#FBF9F5] sm:text-3xl">
            {content.liveSuccess.title}
          </h2>
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">
            {content.liveSuccess.subtitle}
          </p>
          <div className="mt-4 rounded-[2px] border border-white/10 bg-[#0B0C0E] p-4 text-sm text-zinc-300">
            <p className="font-medium text-[#C5A059]">
              ⚡ {content.liveSuccess.eta}
            </p>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[46px] items-center justify-center rounded-[2px] border border-white/20 bg-[#1A1C22] px-7 py-2.5 text-sm font-semibold text-[#F5F5F7] transition-colors hover:border-[#C5A059] hover:text-[#C5A059]"
            >
              {content.buttons.reset}
            </button>
          </div>
        </section>
      )}

      {/* Main Form View */}
      {!demoSuccessData && !liveSuccessData && (
        <div className="rounded-[2px] border border-white/10 bg-[#13151A] p-5 shadow-2xl sm:p-8 lg:p-10">
          {serverError && (
            <div
              role="alert"
              className="mb-7 rounded-[2px] border border-red-500/60 bg-red-950/30 p-4 text-sm text-red-200"
            >
              {serverError}
            </div>
          )}

          {/* Radix UI Tabs for 4 B2B Tracks */}
          <Tabs
            value={activeTrack}
            onValueChange={(val) => handleTrackSelect(val as PartnershipTrack)}
            className="w-full"
          >
            <div className="mb-6">
              <span className="block font-mono text-xs uppercase tracking-[0.16em] text-[#C5A059]">
                01 // {content.tabs.ariaLabel}
              </span>

              <TabsList className="mt-3 grid grid-cols-1 gap-2.5 border-b-0 sm:grid-cols-2 lg:grid-cols-4">
                {PARTNERSHIP_TRACKS.map((trackKey) => {
                  const trackMeta = content.tracks[trackKey];
                  const isSelected = activeTrack === trackKey;
                  return (
                    <TabsTrigger
                      key={trackKey}
                      value={trackKey}
                      className={`flex flex-col items-start justify-between rounded-[2px] border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-[#C5A059] bg-[#1A1C24] text-[#FBF9F5] shadow-[0_0_15px_rgba(197,160,89,0.12)]"
                          : "border-white/10 bg-[#0B0C0E] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-[#C5A059]">
                          {trackMeta.code}
                        </span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full border ${
                            isSelected
                              ? "border-[#C5A059] bg-[#C5A059]"
                              : "border-zinc-600 bg-transparent"
                          }`}
                        />
                      </div>
                      <div className="mt-2">
                        <div className="text-[14px] font-semibold text-[#F5F5F7]">
                          {trackMeta.title}
                        </div>
                        <div className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-zinc-400">
                          {trackMeta.summary}
                        </div>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Track Highlights Card */}
            <div className="mb-8 rounded-[2px] border border-[#C5A059]/20 bg-[#0E1015] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#C5A059]">
                  {activeTrackMeta.badge}
                </span>
                <span className="text-xs text-zinc-400">
                  {activeTrackMeta.title}
                </span>
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-300 sm:grid-cols-3">
                {activeTrackMeta.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intake Form */}
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Anti-spam honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  name="honeypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.honeypot || ""}
                  onChange={(e) => updateField("honeypot", e.target.value)}
                />
              </div>

              {/* Segmented Track Requirements */}
              <div className="border-t border-white/10 pt-6">
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-[#C5A059]">
                  02 // {activeTrackMeta.title}
                </span>

                {/* Track a: Export (Target country & HS-category/volume) */}
                <TabsContent value="export" className="mt-4 space-y-5 outline-none">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="targetCountry"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        {content.fields.targetCountry.label}
                      </label>
                      <input
                        id="targetCountry"
                        name="targetCountry"
                        type="text"
                        required
                        value={values.targetCountry || ""}
                        onChange={(e) =>
                          updateField("targetCountry", e.target.value)
                        }
                        placeholder={content.fields.targetCountry.placeholder}
                        aria-invalid={Boolean(errors.targetCountry)}
                        className={`${inputBaseClasses} ${
                          errors.targetCountry ? inputErrorClasses : ""
                        }`}
                      />
                      <p className="mt-1 text-[11px] text-zinc-400">
                        {content.fields.targetCountry.hint}
                      </p>
                      {errors.targetCountry && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.targetCountry}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="hsCategory"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        {content.fields.hsCategory.label}
                      </label>
                      <select
                        id="hsCategory"
                        name="hsCategory"
                        required
                        value={values.hsCategory || ""}
                        onChange={(e) => updateField("hsCategory", e.target.value)}
                        aria-invalid={Boolean(errors.hsCategory)}
                        className={`${inputBaseClasses} ${
                          errors.hsCategory ? inputErrorClasses : ""
                        }`}
                      >
                        <option value="" className="bg-[#0B0C0E] text-zinc-400">
                          {content.fields.hsCategory.placeholder}
                        </option>
                        {content.fields.hsCategory.options.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-[#0B0C0E] text-[#F5F5F7]"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-[11px] text-zinc-400">
                        {content.fields.hsCategory.hint}
                      </p>
                      {errors.hsCategory && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.hsCategory}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="volume"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.volume.label}
                    </label>
                    <input
                      id="volume"
                      name="volume"
                      type="text"
                      required
                      value={values.volume || ""}
                      onChange={(e) => updateField("volume", e.target.value)}
                      placeholder={content.fields.volume.placeholder}
                      aria-invalid={Boolean(errors.volume)}
                      className={`${inputBaseClasses} ${
                        errors.volume ? inputErrorClasses : ""
                      }`}
                    />
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {content.fields.volume.hint}
                    </p>
                    {errors.volume && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.volume}
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* Track b: Distribution (Region & retail coverage) */}
                <TabsContent
                  value="distribution"
                  className="mt-4 space-y-5 outline-none"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="region"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        {content.fields.region.label}
                      </label>
                      <input
                        id="region"
                        name="region"
                        type="text"
                        required
                        value={values.region || ""}
                        onChange={(e) => updateField("region", e.target.value)}
                        placeholder={content.fields.region.placeholder}
                        aria-invalid={Boolean(errors.region)}
                        className={`${inputBaseClasses} ${
                          errors.region ? inputErrorClasses : ""
                        }`}
                      />
                      <p className="mt-1 text-[11px] text-zinc-400">
                        {content.fields.region.hint}
                      </p>
                      {errors.region && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.region}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="retailCoverage"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        {content.fields.retailCoverage.label}
                      </label>
                      <select
                        id="retailCoverage"
                        name="retailCoverage"
                        required
                        value={values.retailCoverage || ""}
                        onChange={(e) =>
                          updateField("retailCoverage", e.target.value)
                        }
                        aria-invalid={Boolean(errors.retailCoverage)}
                        className={`${inputBaseClasses} ${
                          errors.retailCoverage ? inputErrorClasses : ""
                        }`}
                      >
                        <option value="" className="bg-[#0B0C0E] text-zinc-400">
                          {content.fields.retailCoverage.placeholder}
                        </option>
                        {content.fields.retailCoverage.options.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-[#0B0C0E] text-[#F5F5F7]"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-[11px] text-zinc-400">
                        {content.fields.retailCoverage.hint}
                      </p>
                      {errors.retailCoverage && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.retailCoverage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="outlets"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.outlets.label}
                    </label>
                    <input
                      id="outlets"
                      name="outlets"
                      type="text"
                      value={values.outlets || ""}
                      onChange={(e) => updateField("outlets", e.target.value)}
                      placeholder={content.fields.outlets.placeholder}
                      className={inputBaseClasses}
                    />
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {content.fields.outlets.hint}
                    </p>
                  </div>
                </TabsContent>

                {/* Track c: Manufacturing / OEM (Specs & capacity) */}
                <TabsContent
                  value="manufacturing"
                  className="mt-4 space-y-5 outline-none"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="toolingModel"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        {content.fields.toolingModel.label}
                      </label>
                      <select
                        id="toolingModel"
                        name="toolingModel"
                        value={values.toolingModel || ""}
                        onChange={(e) =>
                          updateField("toolingModel", e.target.value)
                        }
                        className={inputBaseClasses}
                      >
                        <option value="" className="bg-[#0B0C0E] text-zinc-400">
                          {content.fields.toolingModel.placeholder}
                        </option>
                        {content.fields.toolingModel.options.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-[#0B0C0E] text-[#F5F5F7]"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-[11px] text-zinc-400">
                        {content.fields.toolingModel.hint}
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="capacity"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        {content.fields.capacity.label}
                      </label>
                      <input
                        id="capacity"
                        name="capacity"
                        type="text"
                        required
                        value={values.capacity || ""}
                        onChange={(e) => updateField("capacity", e.target.value)}
                        placeholder={content.fields.capacity.placeholder}
                        aria-invalid={Boolean(errors.capacity)}
                        className={`${inputBaseClasses} ${
                          errors.capacity ? inputErrorClasses : ""
                        }`}
                      />
                      <p className="mt-1 text-[11px] text-zinc-400">
                        {content.fields.capacity.hint}
                      </p>
                      {errors.capacity && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.capacity}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="specs"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.specs.label}
                    </label>
                    <textarea
                      id="specs"
                      name="specs"
                      rows={3}
                      required
                      value={values.specs || ""}
                      onChange={(e) => updateField("specs", e.target.value)}
                      placeholder={content.fields.specs.placeholder}
                      aria-invalid={Boolean(errors.specs)}
                      className={`${inputBaseClasses} min-h-[90px] ${
                        errors.specs ? inputErrorClasses : ""
                      }`}
                    />
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {content.fields.specs.hint}
                    </p>
                    {errors.specs && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.specs}
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* Track d: General Inquiry */}
                <TabsContent value="general" className="mt-4 space-y-5 outline-none">
                  <div>
                    <label
                      htmlFor="inquiryTopic"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.inquiryTopic.label}
                    </label>
                    <select
                      id="inquiryTopic"
                      name="inquiryTopic"
                      required
                      value={values.inquiryTopic || ""}
                      onChange={(e) => updateField("inquiryTopic", e.target.value)}
                      aria-invalid={Boolean(errors.inquiryTopic)}
                      className={`${inputBaseClasses} ${
                        errors.inquiryTopic ? inputErrorClasses : ""
                      }`}
                    >
                      <option value="" className="bg-[#0B0C0E] text-zinc-400">
                        {content.fields.inquiryTopic.placeholder}
                      </option>
                      {content.fields.inquiryTopic.options.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-[#0B0C0E] text-[#F5F5F7]"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {content.fields.inquiryTopic.hint}
                    </p>
                    {errors.inquiryTopic && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.inquiryTopic}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="proposalDetails"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.proposalDetails.label}
                    </label>
                    <textarea
                      id="proposalDetails"
                      name="proposalDetails"
                      rows={4}
                      required
                      value={values.proposalDetails || ""}
                      onChange={(e) =>
                        updateField("proposalDetails", e.target.value)
                      }
                      placeholder={content.fields.proposalDetails.placeholder}
                      aria-invalid={Boolean(errors.proposalDetails)}
                      className={`${inputBaseClasses} min-h-[100px] ${
                        errors.proposalDetails ? inputErrorClasses : ""
                      }`}
                    />
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {content.fields.proposalDetails.hint}
                    </p>
                    {errors.proposalDetails && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.proposalDetails}
                      </p>
                    )}
                  </div>
                </TabsContent>
              </div>

              {/* Universal Corporate Contact Details */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-[#C5A059]">
                  03 // {content.demoSuccess.contactLabel} &amp; {content.demoSuccess.companyLabel}
                </span>

                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contactName"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.contactName.label}
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      autoComplete="name"
                      value={values.contactName}
                      onChange={(e) => updateField("contactName", e.target.value)}
                      placeholder={content.fields.contactName.placeholder}
                      aria-invalid={Boolean(errors.contactName)}
                      className={`${inputBaseClasses} ${
                        errors.contactName ? inputErrorClasses : ""
                      }`}
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.company.label}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      value={values.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      placeholder={content.fields.company.placeholder}
                      aria-invalid={Boolean(errors.company)}
                      className={`${inputBaseClasses} ${
                        errors.company ? inputErrorClasses : ""
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* International E.164 Phone with preset picker */}
                <div className="mt-5">
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                  >
                    {content.fields.phone.label}
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[140px_1fr]">
                    <select
                      aria-label={content.fields.phone.codeLabel}
                      value={countryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className={`${inputBaseClasses} font-mono text-sm`}
                    >
                      {COUNTRY_CODE_PRESETS.map((preset) => (
                        <option
                          key={preset.code}
                          value={preset.code}
                          className="bg-[#0B0C0E] text-[#F5F5F7]"
                        >
                          {preset.label}
                        </option>
                      ))}
                    </select>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder={content.fields.phone.placeholder}
                      aria-invalid={Boolean(errors.phone)}
                      className={`${inputBaseClasses} font-mono ${
                        errors.phone ? inputErrorClasses : ""
                      }`}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-400">
                    {content.fields.phone.hint}
                  </p>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.email.label}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email || ""}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder={content.fields.email.placeholder}
                      aria-invalid={Boolean(errors.email)}
                      className={`${inputBaseClasses} ${
                        errors.email ? inputErrorClasses : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      {content.fields.notes.label}
                    </label>
                    <input
                      id="notes"
                      name="notes"
                      type="text"
                      value={values.notes || ""}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder={content.fields.notes.placeholder}
                      className={inputBaseClasses}
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <p className="text-xs text-zinc-400">
                  {featuresConfig.demoMode
                    ? "🛡️ Demo rejim: ma'lumotlar brauzerda tekshiriladi, serverga jo'natilmaydi."
                    : "🔒 Ma'lumotlarning to'liq konfidensialligi kafolatlanadi."}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-[#C5A059] bg-[#C5A059] px-8 py-2.5 text-sm font-semibold text-[#0B0C0E] transition-all hover:bg-[#E5C378] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] disabled:opacity-50"
                >
                  {isSubmitting
                    ? content.buttons.submitting
                    : featuresConfig.demoMode
                    ? content.buttons.demoSubmit
                    : content.buttons.submit}
                </button>
              </div>
            </form>
          </Tabs>
        </div>
      )}
    </div>
  );
}
