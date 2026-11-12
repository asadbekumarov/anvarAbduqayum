"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  getMediaLibraryEntries,
  getMediaLibraryUiCopy,
  type MediaLibraryEntry,
  type MediaLibraryLocale,
  type MediaLibrarySourceFilter,
  type MediaLibraryTopicFilter,
} from "../config/mediaLibraryContent";

interface MediaLibraryViewProps {
  locale: string;
}

const TOPIC_KEYS: MediaLibraryTopicFilter[] = [
  "all",
  "systemization",
  "manufacturing",
  "export",
  "entrepreneurship",
  "interviews",
  "investment",
];

const SOURCE_KEYS: MediaLibrarySourceFilter[] = ["all", "video", "press"];

export function MediaLibraryView({ locale }: MediaLibraryViewProps) {
  const safeLocale: MediaLibraryLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  const ui = useMemo(() => getMediaLibraryUiCopy(safeLocale), [safeLocale]);
  const entries = useMemo(() => getMediaLibraryEntries(safeLocale), [safeLocale]);

  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<MediaLibrarySourceFilter>("all");
  const [topicFilter, setTopicFilter] = useState<MediaLibraryTopicFilter>("all");
  const [activeVideo, setActiveVideo] = useState<MediaLibraryEntry | null>(null);
  const [embedFallback, setEmbedFallback] = useState(false);

  const topicListRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return entries.filter((item) => {
      if (sourceFilter !== "all" && item.kind !== sourceFilter) return false;
      if (topicFilter !== "all" && item.topicCategory !== topicFilter) return false;
      if (!normalized) return true;
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.sourceName.toLowerCase().includes(normalized) ||
        item.summary.toLowerCase().includes(normalized) ||
        item.publishedDate.toLowerCase().includes(normalized)
      );
    });
  }, [entries, query, sourceFilter, topicFilter]);

  useEffect(() => {
    if (!activeVideo) return;
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveVideo(null);
        requestAnimationFrame(() => lastTriggerRef.current?.focus());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideo]);

  const openVideo = (entry: MediaLibraryEntry, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setEmbedFallback(false);
    setActiveVideo(entry);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const resetAllFilters = () => {
    setQuery("");
    setSourceFilter("all");
    setTopicFilter("all");
  };

  const handleTopicKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIdx = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIdx = (index + 1) % TOPIC_KEYS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIdx = (index - 1 + TOPIC_KEYS.length) % TOPIC_KEYS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIdx = TOPIC_KEYS.length - 1;
    }
    if (nextIdx !== -1) {
      setTopicFilter(TOPIC_KEYS[nextIdx]);
      const tabs = topicListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabs?.[nextIdx]?.focus();
    }
  };

  const embedSrc =
    activeVideo?.videoId && typeof window !== "undefined"
      ? `https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?${new URLSearchParams({
          autoplay: "1",
          rel: "0",
          playsinline: "1",
        }).toString()}`
      : "";

  return (
    <section
      className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12"
      aria-labelledby="media-library-title"
    >
      {/* Breadcrumbs + Back to Media */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline-editorial)] pb-4">
        <nav aria-label={ui.breadcrumbs.ariaLabel}>
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-[var(--text-muted-aa)]">
            <li>
              <Link
                href={`/${safeLocale}`}
                className="inline-flex min-h-[44px] items-center hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              >
                {ui.breadcrumbs.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[var(--text-ink)]">
              {ui.breadcrumbs.current}
            </li>
          </ol>
        </nav>

        <Link
          href={`/${safeLocale}#media`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-ink)] transition-colors hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
        >
          <span aria-hidden="true">←</span>
          <span>{ui.backToMedia}</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-7 border-b border-[var(--border-hairline-editorial)] pb-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold-ink)]">
          {ui.eyebrow}
        </p>
        <h1
          id="media-library-title"
          className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--text-ink)] sm:text-4xl"
        >
          {ui.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--text-soft-editorial)]">
          {ui.subtitle}
        </p>

        <div
          role="note"
          className="mt-5 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-stone)] px-4 py-3 text-xs font-medium text-[var(--text-soft-editorial)]"
        >
          {ui.demoNotice}
        </div>
      </header>

      {/* Search + Filters Controls */}
      <div className="mb-8 space-y-4 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="media-library-search"
              className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-ink)]"
            >
              {ui.searchLabel}
            </label>
            <div className="flex gap-2">
              <input
                id="media-library-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="min-h-[44px] w-full rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] px-3.5 py-2 text-sm text-[var(--text-ink)] placeholder:text-[var(--text-muted-aa)] focus:border-[var(--accent-gold)] focus:outline-none"
              />
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="min-h-[44px] shrink-0 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-stone)] px-4 text-xs font-semibold text-[var(--text-ink)] hover:border-[var(--accent-gold)]"
                >
                  {ui.clearSearch}
                </button>
              )}
            </div>
          </div>

          {/* Source Type Filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Source type">
            {SOURCE_KEYS.map((key) => {
              const active = sourceFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSourceFilter(key)}
                  className={`min-h-[44px] rounded-[2px] border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                    active
                      ? "border-[var(--text-ink)] bg-[var(--bg-dark)] text-[var(--text-on-dark)]"
                      : "border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] text-[var(--text-ink)] hover:border-[var(--accent-gold)]"
                  }`}
                >
                  {ui.sourceFilters[key]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Filter Tabs */}
        <div
          ref={topicListRef}
          role="tablist"
          aria-label="Topic categories"
          className="flex flex-wrap gap-2 border-t border-[var(--border-hairline-subtle)] pt-4"
        >
          {TOPIC_KEYS.map((key, idx) => {
            const active = topicFilter === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTopicFilter(key)}
                onKeyDown={(e) => handleTopicKeyDown(e, idx)}
                className={`min-h-[40px] rounded-[2px] border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                  active
                    ? "border-[var(--accent-gold)] bg-[var(--bg-stone)] text-[var(--accent-gold-ink)]"
                    : "border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] text-[var(--text-soft-editorial)] hover:border-[var(--accent-gold)] hover:text-[var(--text-ink)]"
                }`}
              >
                {ui.topicFilters[key]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted-aa)]">
        <span data-testid="media-results-count">{filteredEntries.length}</span>{" "}
        {ui.resultsCountLabel}
      </div>

      {/* Grid or Empty State */}
      {filteredEntries.length === 0 ? (
        <div
          data-testid="media-empty-state"
          className="rounded-[2px] border border-dashed border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-surface-warm)] p-8 text-center"
        >
          <h2 className="font-serif text-xl font-medium text-[var(--text-ink)]">
            {ui.emptyState.title}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-soft-editorial)]">
            {ui.emptyState.body}
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-[2px] bg-[var(--bg-dark)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-on-dark)] hover:opacity-90"
          >
            {ui.emptyState.resetButton}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => (
            <article
              key={entry.id}
              data-testid="media-library-card"
              data-kind={entry.kind}
              data-topic={entry.topicCategory}
              className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] p-5 transition-colors hover:border-[var(--accent-gold)]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline-subtle)] pb-3">
                  <span
                    className={`inline-flex items-center rounded-[2px] border px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] ${
                      entry.kind === "video"
                        ? "border-[var(--accent-gold)] bg-[var(--bg-stone)] text-[var(--accent-gold-ink)]"
                        : "border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-alabaster)] text-[var(--text-ink)]"
                    }`}
                  >
                    {entry.kind === "video" ? ui.card.videoBadge : ui.card.pressBadge}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted-aa)]">
                    {entry.publishedDate} · {entry.durationOrType}
                  </span>
                </div>

                <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-gold-ink)]">
                  {entry.sourceName} · {ui.topicFilters[entry.topicCategory]}
                </p>

                <h2 className="mt-2 font-serif text-lg font-semibold leading-snug text-[var(--text-ink)]">
                  {entry.title}
                </h2>

                <div className="mt-3 border-l-2 border-[var(--border-hairline-editorial-strong)] pl-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted-aa)]">
                    {ui.card.takeawayLabel}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-soft-editorial)]">
                    {entry.summary}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-[var(--border-hairline-subtle)] pt-3">
                {entry.kind === "video" && entry.videoId ? (
                  <button
                    type="button"
                    onClick={(e) => openVideo(entry, e.currentTarget)}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[2px] bg-[var(--bg-dark)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-on-dark)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                  >
                    <span>{ui.card.watchVideo}</span>
                    <span aria-hidden="true">▶</span>
                  </button>
                ) : (
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[2px] border border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-alabaster)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-ink)] transition-colors hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                  >
                    <span>{ui.card.readArticle}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Privacy-Friendly YouTube Lite-Embed Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="library-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeVideo();
          }}
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-[var(--bg-scrim)] p-4 sm:p-6"
        >
          <div className="w-full max-w-[880px] overflow-hidden rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-dark)] text-[var(--text-on-dark)] shadow-[var(--shadow-editorial-modal)]">
            <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.12)] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#D4AF37]">
                  {activeVideo.sourceName} · {activeVideo.publishedDate}
                </p>
                <h3
                  id="library-modal-title"
                  className="truncate font-serif text-base font-medium text-[var(--text-on-dark)] sm:text-lg"
                >
                  {activeVideo.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeVideo}
                aria-label={ui.modal.close}
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[2px] border border-[rgba(255,255,255,0.2)] px-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-on-dark)] hover:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                {ui.modal.close}
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {embedFallback || !embedSrc ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <p className="font-serif text-lg text-[var(--text-on-dark)]">
                    {ui.modal.fallbackTitle}
                  </p>
                  <p className="max-w-md text-xs text-[#A1A7B3]">
                    {ui.modal.fallbackBody}
                  </p>
                  <a
                    href={activeVideo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center rounded-[2px] bg-[#D4AF37] px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#090909]"
                  >
                    {ui.modal.watchOnYoutube} ↗
                  </a>
                </div>
              ) : (
                <iframe
                  src={embedSrc}
                  title={activeVideo.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setEmbedFallback(true)}
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

