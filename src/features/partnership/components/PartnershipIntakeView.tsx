"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { featuresConfig } from "@/config/features";
import {
  getPartnershipContent,
  type PartnershipLocale,
} from "../config/partnershipContent";
import {
  normalizeInternationalPhone,
  PARTNERSHIP_TRACKS,
  partnershipSchema,
  type PartnershipFormValues,
  type PartnershipTrack,
} from "../schemas/partnershipSchema";

interface PartnershipIntakeViewProps {
  locale: string;
}

type FieldName = keyof PartnershipFormValues;
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
] as const;

const INITIAL_VALUES: PartnershipFormValues = {
  track: "export",
  contactName: "",
  organization: "",
  phone: "+998 ",
  email: "",
  notes: "",
  honeypot: "",
  targetCountry: "",
  productInterest: "",
  estimatedVolume: "",
  distributionRegion: "",
  salesChannel: "",
  outletCount: "",
  cooperationModel: "",
  productionScope: "",
  targetTimeline: "",
  proposalCategory: "",
  proposalSummary: "",
};

const TRACK_REQUIRED_FIELDS: Record<PartnershipTrack, FieldName[]> = {
  export: ["targetCountry", "productInterest"],
  distribution: ["distributionRegion", "salesChannel"],
  manufacturing: ["cooperationModel", "productionScope"],
  other: ["proposalCategory", "proposalSummary"],
};

export function PartnershipIntakeView({ locale }: PartnershipIntakeViewProps) {
  const safeLocale: PartnershipLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  const content = useMemo(() => getPartnershipContent(safeLocale), [safeLocale]);

  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<PartnershipFormValues>(INITIAL_VALUES);
  const [countryCode, setCountryCode] = useState<string>("+998");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasSummaryError, setHasSummaryError] = useState(false);
  const [submittedData, setSubmittedData] = useState<PartnershipFormValues | null>(
    null
  );

  const formRef = useRef<HTMLFormElement>(null);

  const resolveErrorMessage = (code: string | undefined): string => {
    if (!code) return content.errors.min2;
    if (code === "min10") return content.errors.min10;
    if (code === "max80") return content.errors.max80;
    if (code === "max120") return content.errors.max120;
    if (code === "invalidPhone") return content.errors.invalidPhone;
    if (code === "invalidEmail") return content.errors.invalidEmail;
    return content.errors.min2;
  };

  const updateField = <K extends FieldName>(field: K, value: PartnershipFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setHasSummaryError(false);
  };

  const handleTrackChange = (track: PartnershipTrack) => {
    setValues((prev) => ({ ...prev, track }));
    setErrors({});
    setHasSummaryError(false);
  };

  const handleCountryCodeChange = (nextCode: string) => {
    setCountryCode(nextCode);
    setValues((prev) => {
      const current = prev.phone.trim();
      const withoutCurrentCode = current.startsWith(countryCode)
        ? current.slice(countryCode.length).trimStart()
        : current.replace(/^\+\d{1,4}\s*/, "");
      return {
        ...prev,
        phone: withoutCurrentCode ? `${nextCode} ${withoutCurrentCode}` : `${nextCode} `,
      };
    });
    setErrors((prev) => {
      if (!prev.phone) return prev;
      const next = { ...prev };
      delete next.phone;
      return next;
    });
  };

  const focusField = (field: FieldName) => {
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`);
    el?.focus();
  };

  const handleNextStep = () => {
    const requiredForTrack = TRACK_REQUIRED_FIELDS[values.track];
    const parsed = partnershipSchema.safeParse({
      ...values,
      // Provide temporary placeholders for step-2-only fields so step 1 checks only track fields
      contactName: values.contactName || "__step1__",
      organization: values.organization || "__step1__",
      phone: values.phone.trim().length > 4 ? values.phone : "+998901234567",
      email: "",
    });

    if (!parsed.success) {
      const step1Errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && requiredForTrack.includes(key) && !step1Errors[key]) {
          step1Errors[key] = resolveErrorMessage(issue.message);
        }
      }

      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        setHasSummaryError(true);
        const firstInvalid = requiredForTrack.find((f) => step1Errors[f]);
        if (firstInvalid) focusField(firstInvalid);
        return;
      }
    }

    setErrors({});
    setHasSummaryError(false);
    setStep(2);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot check: silently ignore automated bot fills without network calls
    if (values.honeypot && values.honeypot.trim().length > 0) {
      return;
    }

    const parsed = partnershipSchema.safeParse(values);
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
      setHasSummaryError(true);

      const requiredForTrack = TRACK_REQUIRED_FIELDS[values.track];
      if (firstField && requiredForTrack.includes(firstField)) {
        setStep(1);
      } else if (firstField) {
        focusField(firstField);
      }
      return;
    }

    // In demoMode (and in this isolated prototype), never transmit or persist data.
    setErrors({});
    setHasSummaryError(false);
    setSubmittedData({
      ...parsed.data,
      phone: normalizeInternationalPhone(parsed.data.phone),
    });
  };

  const handleReset = () => {
    setSubmittedData(null);
    setValues(INITIAL_VALUES);
    setCountryCode("+998");
    setErrors({});
    setHasSummaryError(false);
    setStep(1);
  };

  const activeTrackMeta =
    content.tracks.find((t) => t.id === (submittedData?.track ?? values.track)) ??
    content.tracks[0];

  const inputBaseClass =
    "w-full min-h-[44px] rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] px-3.5 py-2.5 text-[15px] text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)] transition-colors focus:border-[var(--accent-gold)] focus:outline-none";

  const errorInputClass =
    "border-[var(--status-error-border)] bg-[var(--status-error-wash)]";

  return (
    <section
      className="mx-auto w-full max-w-[920px] px-4 py-8 sm:px-6 sm:py-12"
      aria-labelledby="partnership-page-title"
    >
      {/* Top navigation & editorial header */}
      <div className="mb-8 border-b border-[var(--border-hairline-editorial)] pb-7">
        <Link
          href={`/${safeLocale}`}
          className="inline-flex min-h-[44px] items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-soft-editorial)] transition-colors hover:text-[var(--accent-gold-ink)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>{content.header.backHome}</span>
        </Link>

        <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--accent-gold-ink)]">
          {content.header.eyebrow}
        </p>
        <h1
          id="partnership-page-title"
          className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--text-ink)] sm:text-4xl"
        >
          {content.header.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--text-soft-editorial)]">
          {content.header.subtitle}
        </p>
      </div>

      {/* Demo & Privacy Notice */}
      <div
        role="note"
        className="mb-8 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-stone)] p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-[2px] border border-[var(--accent-gold)] bg-[var(--bg-surface-warm)] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-gold-ink)]">
            {content.demoNotice.badge}
          </span>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-soft-editorial)]">
          {content.demoNotice.privacyWarning}
        </p>
      </div>

      {submittedData ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-[2px] border border-[var(--status-success-border)] bg-[var(--bg-surface-warm)] p-6 sm:p-8"
        >
          <span className="inline-flex items-center rounded-[2px] border border-[var(--status-success-border)] bg-[var(--status-success-wash)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--status-success-ink)]">
            {content.confirmation.badge}
          </span>

          <h2 className="mt-4 font-serif text-2xl font-medium text-[var(--text-ink)]">
            {content.confirmation.title}
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--text-soft-editorial)]">
            {content.confirmation.description}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-[var(--border-hairline-editorial)] pt-5 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted-aa)]">
                {content.confirmation.trackLabel}
              </dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text-ink)]">
                {activeTrackMeta.title}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted-aa)]">
                {content.confirmation.organizationLabel}
              </dt>
              <dd className="mt-1 break-words text-sm font-medium text-[var(--text-ink)]">
                {submittedData.organization}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted-aa)]">
                {content.confirmation.phoneLabel}
              </dt>
              <dd className="mt-1 font-mono text-sm font-medium text-[var(--text-ink)]">
                {submittedData.phone}
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] border border-[var(--text-ink)] bg-[var(--bg-dark)] px-6 py-2.5 text-sm font-medium text-[var(--text-on-dark)] transition-opacity hover:opacity-90"
            >
              {content.confirmation.resetButton}
            </button>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] p-5 sm:p-8"
        >
          {/* Stepper indicator */}
          <ol
            className="mb-7 grid grid-cols-1 gap-2 border-b border-[var(--border-hairline-editorial)] pb-5 sm:grid-cols-2"
            aria-label="Form steps"
          >
            <li
              aria-current={step === 1 ? "step" : undefined}
              className={`flex min-h-[44px] items-center border-l-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] ${
                step === 1
                  ? "border-[var(--accent-gold)] bg-[var(--bg-stone)] font-semibold text-[var(--text-ink)]"
                  : "border-transparent text-[var(--text-muted-aa)]"
              }`}
            >
              {content.steps.step1Label}
            </li>
            <li
              aria-current={step === 2 ? "step" : undefined}
              className={`flex min-h-[44px] items-center border-l-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] ${
                step === 2
                  ? "border-[var(--accent-gold)] bg-[var(--bg-stone)] font-semibold text-[var(--text-ink)]"
                  : "border-transparent text-[var(--text-muted-aa)]"
              }`}
            >
              {content.steps.step2Label}
            </li>
          </ol>

          {hasSummaryError && (
            <div
              role="alert"
              className="mb-6 rounded-[2px] border border-[var(--status-error-border)] bg-[var(--status-error-wash)] px-4 py-3 text-sm font-medium text-[var(--status-error-ink)]"
            >
              {content.errors.summary}
            </div>
          )}

          {/* Honeypot field for spam mitigation */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="partnership-company-website">Website</label>
            <input
              id="partnership-company-website"
              name="honeypot"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.honeypot ?? ""}
              onChange={(e) => updateField("honeypot", e.target.value)}
            />
          </div>

          {step === 1 ? (
            <div className="space-y-8">
              {/* Track selector */}
              <div>
                <span
                  id="partnership-tracks-label"
                  className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-ink)]"
                >
                  {content.tracksLabel}
                </span>

                <div
                  role="radiogroup"
                  aria-labelledby="partnership-tracks-label"
                  className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {PARTNERSHIP_TRACKS.map((trackId) => {
                    const track = content.tracks.find((t) => t.id === trackId);
                    if (!track) return null;
                    const isSelected = values.track === trackId;
                    return (
                      <button
                        key={trackId}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleTrackChange(trackId)}
                        className={`flex min-h-[88px] flex-col items-start justify-between rounded-[2px] border p-4 text-left transition-colors ${
                          isSelected
                            ? "border-[var(--accent-gold)] bg-[var(--bg-stone)]"
                            : "border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] hover:border-[var(--text-muted-aa)]"
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent-gold-ink)]">
                            {track.code}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`h-3 w-3 rounded-full border ${
                              isSelected
                                ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]"
                                : "border-[var(--text-muted-aa)] bg-transparent"
                            }`}
                          />
                        </div>
                        <div className="mt-2">
                          <div className="text-base font-medium text-[var(--text-ink)]">
                            {track.title}
                          </div>
                          <div className="mt-1 text-xs leading-relaxed text-[var(--text-soft-editorial)]">
                            {track.summary}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Context-specific conditional fields */}
              <div className="border-t border-[var(--border-hairline-editorial)] pt-6">
                <h2 className="font-serif text-xl font-medium text-[var(--text-ink)]">
                  {content.conditionalHeadings[values.track]}
                </h2>

                {values.track === "export" && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="targetCountry"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.targetCountry.label} *
                      </label>
                      <input
                        id="targetCountry"
                        name="targetCountry"
                        type="text"
                        required
                        value={values.targetCountry ?? ""}
                        onChange={(e) => updateField("targetCountry", e.target.value)}
                        placeholder={content.fields.targetCountry.placeholder}
                        aria-invalid={Boolean(errors.targetCountry)}
                        aria-describedby={
                          errors.targetCountry ? "targetCountry-error" : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.targetCountry ? errorInputClass : ""
                        }`}
                      />
                      {errors.targetCountry && (
                        <p
                          id="targetCountry-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.targetCountry}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="productInterest"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.productInterest.label} *
                      </label>
                      <input
                        id="productInterest"
                        name="productInterest"
                        type="text"
                        required
                        value={values.productInterest ?? ""}
                        onChange={(e) => updateField("productInterest", e.target.value)}
                        placeholder={content.fields.productInterest.placeholder}
                        aria-invalid={Boolean(errors.productInterest)}
                        aria-describedby={
                          errors.productInterest ? "productInterest-error" : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.productInterest ? errorInputClass : ""
                        }`}
                      />
                      {errors.productInterest && (
                        <p
                          id="productInterest-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.productInterest}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="estimatedVolume"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.estimatedVolume.label}
                      </label>
                      <input
                        id="estimatedVolume"
                        name="estimatedVolume"
                        type="text"
                        value={values.estimatedVolume ?? ""}
                        onChange={(e) => updateField("estimatedVolume", e.target.value)}
                        placeholder={content.fields.estimatedVolume.placeholder}
                        className={inputBaseClass}
                      />
                    </div>
                  </div>
                )}

                {values.track === "distribution" && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="distributionRegion"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.distributionRegion.label} *
                      </label>
                      <input
                        id="distributionRegion"
                        name="distributionRegion"
                        type="text"
                        required
                        value={values.distributionRegion ?? ""}
                        onChange={(e) =>
                          updateField("distributionRegion", e.target.value)
                        }
                        placeholder={content.fields.distributionRegion.placeholder}
                        aria-invalid={Boolean(errors.distributionRegion)}
                        aria-describedby={
                          errors.distributionRegion
                            ? "distributionRegion-error"
                            : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.distributionRegion ? errorInputClass : ""
                        }`}
                      />
                      {errors.distributionRegion && (
                        <p
                          id="distributionRegion-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.distributionRegion}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="salesChannel"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.salesChannel.label} *
                      </label>
                      <select
                        id="salesChannel"
                        name="salesChannel"
                        required
                        value={values.salesChannel ?? ""}
                        onChange={(e) => updateField("salesChannel", e.target.value)}
                        aria-invalid={Boolean(errors.salesChannel)}
                        aria-describedby={
                          errors.salesChannel ? "salesChannel-error" : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.salesChannel ? errorInputClass : ""
                        }`}
                      >
                        <option value="">{content.fields.salesChannel.placeholder}</option>
                        {content.fields.salesChannel.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.salesChannel && (
                        <p
                          id="salesChannel-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.salesChannel}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="outletCount"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.outletCount.label}
                      </label>
                      <input
                        id="outletCount"
                        name="outletCount"
                        type="text"
                        value={values.outletCount ?? ""}
                        onChange={(e) => updateField("outletCount", e.target.value)}
                        placeholder={content.fields.outletCount.placeholder}
                        className={inputBaseClass}
                      />
                    </div>
                  </div>
                )}

                {values.track === "manufacturing" && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="cooperationModel"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.cooperationModel.label} *
                      </label>
                      <select
                        id="cooperationModel"
                        name="cooperationModel"
                        required
                        value={values.cooperationModel ?? ""}
                        onChange={(e) => updateField("cooperationModel", e.target.value)}
                        aria-invalid={Boolean(errors.cooperationModel)}
                        aria-describedby={
                          errors.cooperationModel ? "cooperationModel-error" : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.cooperationModel ? errorInputClass : ""
                        }`}
                      >
                        <option value="">
                          {content.fields.cooperationModel.placeholder}
                        </option>
                        {content.fields.cooperationModel.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.cooperationModel && (
                        <p
                          id="cooperationModel-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.cooperationModel}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="productionScope"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.productionScope.label} *
                      </label>
                      <input
                        id="productionScope"
                        name="productionScope"
                        type="text"
                        required
                        value={values.productionScope ?? ""}
                        onChange={(e) => updateField("productionScope", e.target.value)}
                        placeholder={content.fields.productionScope.placeholder}
                        aria-invalid={Boolean(errors.productionScope)}
                        aria-describedby={
                          errors.productionScope ? "productionScope-error" : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.productionScope ? errorInputClass : ""
                        }`}
                      />
                      {errors.productionScope && (
                        <p
                          id="productionScope-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.productionScope}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="targetTimeline"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.targetTimeline.label}
                      </label>
                      <input
                        id="targetTimeline"
                        name="targetTimeline"
                        type="text"
                        value={values.targetTimeline ?? ""}
                        onChange={(e) => updateField("targetTimeline", e.target.value)}
                        placeholder={content.fields.targetTimeline.placeholder}
                        className={inputBaseClass}
                      />
                    </div>
                  </div>
                )}

                {values.track === "other" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="proposalCategory"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.proposalCategory.label} *
                      </label>
                      <select
                        id="proposalCategory"
                        name="proposalCategory"
                        required
                        value={values.proposalCategory ?? ""}
                        onChange={(e) => updateField("proposalCategory", e.target.value)}
                        aria-invalid={Boolean(errors.proposalCategory)}
                        aria-describedby={
                          errors.proposalCategory ? "proposalCategory-error" : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.proposalCategory ? errorInputClass : ""
                        }`}
                      >
                        <option value="">
                          {content.fields.proposalCategory.placeholder}
                        </option>
                        {content.fields.proposalCategory.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.proposalCategory && (
                        <p
                          id="proposalCategory-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.proposalCategory}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="proposalSummary"
                        className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                      >
                        {content.fields.proposalSummary.label} *
                      </label>
                      <textarea
                        id="proposalSummary"
                        name="proposalSummary"
                        rows={3}
                        required
                        value={values.proposalSummary ?? ""}
                        onChange={(e) => updateField("proposalSummary", e.target.value)}
                        placeholder={content.fields.proposalSummary.placeholder}
                        aria-invalid={Boolean(errors.proposalSummary)}
                        aria-describedby={
                          errors.proposalSummary ? "proposalSummary-error" : undefined
                        }
                        className={`${inputBaseClass} min-h-[96px] ${
                          errors.proposalSummary ? errorInputClass : ""
                        }`}
                      />
                      {errors.proposalSummary && (
                        <p
                          id="proposalSummary-error"
                          className="mt-1 text-xs text-[var(--status-error-ink)]"
                        >
                          {errors.proposalSummary}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end border-t border-[var(--border-hairline-editorial)] pt-5">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[2px] bg-[var(--bg-dark)] px-6 py-2.5 text-sm font-medium text-[var(--text-on-dark)] transition-opacity hover:opacity-90"
                >
                  <span>{content.steps.nextButton}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contactName"
                    className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                  >
                    {content.fields.contactName.label} *
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
                    aria-describedby={errors.contactName ? "contactName-error" : undefined}
                    className={`${inputBaseClass} ${
                      errors.contactName ? errorInputClass : ""
                    }`}
                  />
                  {errors.contactName && (
                    <p
                      id="contactName-error"
                      className="mt-1 text-xs text-[var(--status-error-ink)]"
                    >
                      {errors.contactName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                  >
                    {content.fields.organization.label} *
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    required
                    autoComplete="organization"
                    value={values.organization}
                    onChange={(e) => updateField("organization", e.target.value)}
                    placeholder={content.fields.organization.placeholder}
                    aria-invalid={Boolean(errors.organization)}
                    aria-describedby={
                      errors.organization ? "organization-error" : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.organization ? errorInputClass : ""
                    }`}
                  />
                  {errors.organization && (
                    <p
                      id="organization-error"
                      className="mt-1 text-xs text-[var(--status-error-ink)]"
                    >
                      {errors.organization}
                    </p>
                  )}
                </div>
              </div>

              {/* Isolated International E.164 Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                >
                  {content.fields.phone.label} *
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[150px_1fr]">
                  <select
                    aria-label={content.fields.phone.codeLabel}
                    value={countryCode}
                    onChange={(e) => handleCountryCodeChange(e.target.value)}
                    className={inputBaseClass}
                  >
                    {COUNTRY_CODE_PRESETS.map((preset) => (
                      <option key={preset.code} value={preset.code}>
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
                    aria-describedby={
                      errors.phone ? "phone-hint phone-error" : "phone-hint"
                    }
                    className={`${inputBaseClass} font-mono ${
                      errors.phone ? errorInputClass : ""
                    }`}
                  />
                </div>
                <p
                  id="phone-hint"
                  className="mt-1.5 text-xs text-[var(--text-muted-aa)]"
                >
                  {content.fields.phone.hint}
                </p>
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="mt-1 text-xs text-[var(--status-error-ink)]"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                >
                  {content.fields.email.label}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={content.fields.email.placeholder}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${inputBaseClass} ${errors.email ? errorInputClass : ""}`}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-xs text-[var(--status-error-ink)]"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-ink)]"
                >
                  {content.fields.notes.label}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={values.notes ?? ""}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder={content.fields.notes.placeholder}
                  className={`${inputBaseClass} min-h-[88px]`}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline-editorial)] pt-5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] px-5 py-2.5 text-sm font-medium text-[var(--text-ink)] transition-colors hover:bg-[var(--bg-stone)]"
                >
                  {content.steps.prevButton}
                </button>

                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] bg-[var(--bg-dark)] px-6 py-2.5 text-sm font-medium text-[var(--text-on-dark)] transition-opacity hover:opacity-90"
                >
                  {featuresConfig.demoMode
                    ? content.steps.submitDemoButton
                    : content.steps.submitProdButton}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </section>
  );
}

