"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import { getContent } from "@/config/content";

interface MediaSectionProps {
  locale?: string;
}

type VideoFilterKey = "all" | "published" | "archive";
type PressFilterKey = "all" | "profile" | "public";
type ModalPlayerState = "idle" | "loading" | "ready" | "fallback";

interface ActiveModalVideo {
  youtubeId: string;
  title: string;
  channel: string;
  url: string;
  posterUrl?: string;
}

export const MediaSection: React.FC<MediaSectionProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const media = content.media;
  const featured = media.featured;
  const ui = media.ui;

  const [videoFilter, setVideoFilter] = useState<VideoFilterKey>("all");
  const [pressFilter, setPressFilter] = useState<PressFilterKey>("all");
  const [activeVideo, setActiveVideo] = useState<ActiveModalVideo | null>(null);
  const [playerState, setPlayerState] = useState<ModalPlayerState>("idle");
  const [failedPosters, setFailedPosters] = useState<Record<string, boolean>>({});

  const videoTabListRef = useRef<HTMLDivElement>(null);
  const pressTabListRef = useRef<HTMLDivElement>(null);
  const modalDialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const playerReadyRef = useRef<boolean>(false);

  const videoFilterKeys: VideoFilterKey[] = ["all", "published", "archive"];
  const pressFilterKeys: PressFilterKey[] = ["all", "profile", "public"];

  const filteredVideos = (media.videos || []).filter((video) => {
    if (videoFilter === "all") return true;
    const cat = video.filterCat || (video.isAvailable !== false ? "published" : "archive");
    return cat === videoFilter;
  });

  const posterVideo = filteredVideos.find((v) => v.hasCleanPoster && v.isAvailable !== false);
  const sideVideos = filteredVideos.filter((v) => v !== posterVideo);

  const filteredPress = (media.pressMentions || []).filter((item) => {
    if (pressFilter === "all") return true;
    return (item.category || "profile") === pressFilter;
  });

  const handleTabKeyDown = <T extends string>(
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
    keys: T[],
    setKey: React.Dispatch<React.SetStateAction<T>>,
    listRef: React.RefObject<HTMLDivElement | null>
  ) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % keys.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + keys.length) % keys.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = keys.length - 1;
    }

    if (nextIndex !== -1) {
      setKey(keys[nextIndex]);
      const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabs?.[nextIndex]?.focus();
    }
  };

  const openVideoModal = (video: ActiveModalVideo, triggerEl?: HTMLElement | null) => {
    if (!video.youtubeId) return;
    lastTriggerRef.current = triggerEl || (document.activeElement as HTMLElement | null);
    playerReadyRef.current = false;

    const isHttp =
      typeof window !== "undefined" &&
      (window.location.protocol === "http:" || window.location.protocol === "https:");

    setPlayerState(isHttp ? "loading" : "fallback");
    setActiveVideo(video);
  };

  const closeVideoModal = () => {
    playerReadyRef.current = false;
    setActiveVideo(null);
    setPlayerState("idle");

    requestAnimationFrame(() => {
      if (lastTriggerRef.current && typeof lastTriggerRef.current.focus === "function") {
        lastTriggerRef.current.focus();
      }
    });
  };

  // Scroll lock, focus management, Escape/Tab trapping, and YouTube iframe readiness/fallback tracking
  useEffect(() => {
    if (!activeVideo) {
      document.body.classList.remove("modal-locked");
      document.documentElement.classList.remove("modal-locked");
      return;
    }

    document.body.classList.add("modal-locked");
    document.documentElement.classList.add("modal-locked");

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const fallbackTimer =
      playerState === "loading"
        ? window.setTimeout(() => {
            if (!playerReadyRef.current) {
              setPlayerState("fallback");
            }
          }, 7000)
        : undefined;

    const handleMessage = (event: MessageEvent) => {
      if (!String(event.origin || "").includes("youtube")) return;
      let payload: { event?: string } | null = null;
      try {
        payload = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (!payload) return;

      if (
        payload.event === "onReady" ||
        payload.event === "infoDelivery" ||
        payload.event === "onStateChange"
      ) {
        playerReadyRef.current = true;
        setPlayerState("ready");
      } else if (payload.event === "onError") {
        playerReadyRef.current = false;
        setPlayerState("fallback");
      }
    };

    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeVideoModal();
        return;
      }

      if (e.key === "Tab" && modalDialogRef.current) {
        const focusables = Array.from(
          modalDialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleGlobalKeyDown);
      document.body.classList.remove("modal-locked");
      document.documentElement.classList.remove("modal-locked");
    };
  }, [activeVideo, playerState]);

  const markPosterFailed = (id: string) => {
    setFailedPosters((prev) => ({ ...prev, [id]: true }));
  };

  const renderPosterArtwork = (
    posterId: string,
    thumbUrl: string,
    alt: string,
    priorityLoad: boolean
  ) => {
    const fallbackPlate = (
      <div
        className="absolute inset-0 bg-[var(--bg-dark)] flex items-center justify-center p-6 text-center"
        aria-hidden="true"
      >
        <span className="font-serif text-[17px] leading-[1.35] text-[var(--text-muted-on-dark)] line-clamp-3">
          {alt}
        </span>
      </div>
    );

    if (failedPosters[posterId] || !thumbUrl) {
      return fallbackPlate;
    }

    return (
      <div className="relative w-full h-full bg-[var(--bg-dark)]">
        {fallbackPlate}
        <Image
          unoptimized
          loading="eager"
          src={thumbUrl}
          alt={alt}
          width={1280}
          height={720}
          priority={priorityLoad}
          onError={() => markPosterFailed(posterId)}
          className="relative z-[1] w-full h-full object-cover object-[center_20%] contrast-[1.03] saturate-[0.92] block"
        />
      </div>
    );
  };

  const modalEmbedSrc =
    activeVideo && typeof window !== "undefined"
      ? `https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?${new URLSearchParams({
          autoplay: "1",
          rel: "0",
          enablejsapi: "1",
          origin: window.location.origin,
          playsinline: "1",
        }).toString()}`
      : "";

  return (
    <section id="media" aria-labelledby="media-heading" className="scroll-mt-24">
      {/* =================================================================
          BAND 1: FEATURED DOCUMENTARY & CURATED VIDEO COLLECTION (WARM STONE)
          ================================================================= */}
      <div className="bg-[var(--bg-stone)] border-b border-[var(--border-hairline-editorial)] py-20 lg:py-28">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Editorial Split Header */}
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end pb-6 border-b border-[var(--border-hairline-editorial)] mb-10">
            <div className="lg:col-span-7 flex items-baseline gap-3 min-w-0">
              <span
                className="font-mono text-[14px] font-medium text-[var(--accent-gold-ink)] shrink-0 tabular-nums"
                aria-hidden="true"
              >
                {media.sectionNum || "06"}
              </span>
              <h2
                id="media-heading"
                className="font-serif text-[clamp(32px,4.1vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
              >
                {media.title}
                {media.titleEmphasis ? ` ${media.titleEmphasis}` : ""}
              </h2>
            </div>

            <p className="lg:col-span-5 text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[58ch] [text-wrap:pretty]">
              {media.subtitle}
            </p>
          </header>

          {/* Featured Editorial Interview (7:5 Split Showcase) */}
          {featured && (
            <article
              aria-labelledby="featured-interview-title"
              className="bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] rounded-[2px] p-4 sm:p-6 lg:p-10 mb-14 lg:mb-16 shadow-[var(--shadow-editorial-subtle)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* 7-Col Editorial 16:9 Poster Frame */}
                <div className="lg:col-span-7 min-w-0">
                  <div
                    onClick={(e) => {
                      const btn = e.currentTarget.querySelector<HTMLButtonElement>("#featured-poster-btn");
                      openVideoModal(
                        {
                          youtubeId: featured.youtubeId,
                          title: featured.title,
                          channel: featured.channel,
                          url: featured.url,
                          posterUrl: featured.thumbUrl,
                        },
                        btn
                      );
                    }}
                    className="group relative block w-full aspect-video bg-[var(--bg-dark)] rounded-[2px] overflow-hidden outline outline-1 -outline-offset-1 outline-[var(--outline-inset-media)] cursor-pointer"
                  >
                    {renderPosterArtwork(featured.id, featured.thumbUrl, featured.title, true)}

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, var(--poster-scrim-start) 0%, var(--poster-scrim-mid) 36%, var(--poster-scrim-end) 72%)",
                      }}
                    />

                    <div className="absolute left-3 right-3 bottom-3 sm:left-6 sm:right-6 sm:bottom-6 z-10 flex items-center justify-start">
                      <button
                        id="featured-poster-btn"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openVideoModal(
                            {
                              youtubeId: featured.youtubeId,
                              title: featured.title,
                              channel: featured.channel,
                              url: featured.url,
                              posterUrl: featured.thumbUrl,
                            },
                            e.currentTarget
                          );
                        }}
                        className="min-h-[44px] sm:min-h-[48px] px-4 sm:px-6 bg-[var(--bg-surface-warm)] text-[var(--text-ink)] border border-[var(--bg-surface-warm)] group-hover:bg-[var(--accent-gold-ink)] group-hover:border-[var(--accent-gold-ink)] group-hover:text-[var(--bg-surface-warm)] group-hover:-translate-y-0.5 hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] hover:text-[var(--bg-surface-warm)] active:translate-y-0 rounded-[2px] text-[13.5px] sm:text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>{featured.playLabel}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5-Col Publication Ledger & Actions */}
                <div className="lg:col-span-5 flex flex-col gap-4 min-w-0">
                  <span className="inline-flex items-center self-start min-h-[28px] px-3 py-1 rounded-[2px] text-[12.5px] font-semibold bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)] border border-[var(--accent-gold-border)]">
                    {featured.statusLabel}
                  </span>

                  <h3
                    id="featured-interview-title"
                    className="font-serif text-[clamp(24px,2.5vw,32px)] font-semibold leading-[1.2] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
                  >
                    {featured.title}
                  </h3>

                  <p className="text-[15.5px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[56ch] [text-wrap:pretty]">
                    {featured.synopsis}
                  </p>

                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-[var(--border-hairline-editorial)]">
                    <div>
                      <dt className="text-[12.5px] font-medium text-[var(--text-muted-aa)] mb-0.5">
                        {featured.channelLabel}
                      </dt>
                      <dd className="text-[14.5px] font-semibold text-[var(--text-ink)]">
                        {featured.channel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12.5px] font-medium text-[var(--text-muted-aa)] mb-0.5">
                        {featured.dateLabel}
                      </dt>
                      <dd className="font-mono text-[13.5px] tabular-nums font-medium text-[var(--text-ink)]">
                        <time dateTime={featured.dateIso}>{featured.dateFormatted}</time>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12.5px] font-medium text-[var(--text-muted-aa)] mb-0.5">
                        {featured.durationLabel}
                      </dt>
                      <dd className="font-mono text-[13.5px] tabular-nums font-medium text-[var(--text-ink)]">
                        {featured.duration}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      id="featured-watch-btn"
                      type="button"
                      onClick={(e) =>
                        openVideoModal(
                          {
                            youtubeId: featured.youtubeId,
                            title: featured.title,
                            channel: featured.channel,
                            url: featured.url,
                            posterUrl: featured.thumbUrl,
                          },
                          e.currentTarget
                        )
                      }
                      className="min-h-[46px] px-6 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] rounded-[2px] text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>{featured.watchLabel}</span>
                    </button>

                    <a
                      id="featured-ext-link"
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] px-4 bg-transparent text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--accent-gold-ink)] hover:bg-[var(--accent-gold-soft)] rounded-[2px] text-[14px] font-medium inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{featured.extLabel}</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M4 12L12 4M6 4h6v6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Curated Video & Archive Collection */}
          <div id="media-videos">
            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-3 border-b border-[var(--border-hairline-editorial-strong)] mb-6">
              <h3 className="font-serif text-[clamp(22px,2.4vw,28px)] font-semibold leading-[1.2] text-[var(--text-ink)]">
                {media.youtubeHeading}
              </h3>
              {media.videosSubmeta && (
                <span className="text-[13.5px] font-medium text-[var(--text-muted-aa)]">
                  {media.videosSubmeta}
                </span>
              )}
            </div>

            {media.videoFilters && (
              <div
                ref={videoTabListRef}
                id="media-video-filters"
                role="tablist"
                aria-label={media.videoFilters.ariaLabel}
                className="flex flex-wrap gap-2 mb-6"
              >
                {videoFilterKeys.map((key, idx) => {
                  const isActive = videoFilter === key;
                  const label = media.videoFilters![key];
                  return (
                    <button
                      key={key}
                      id={`media-vflt-${key}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setVideoFilter(key)}
                      onKeyDown={(e) =>
                        handleTabKeyDown(e, idx, videoFilterKeys, setVideoFilter, videoTabListRef)
                      }
                      className={`min-h-[44px] px-4 py-2 rounded-[2px] border text-[14px] font-medium transition-[background-color,color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                        isActive
                          ? "bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border-[var(--bg-dark)]"
                          : "bg-[var(--bg-surface-warm)] text-[var(--text-soft-editorial)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] hover:text-[var(--text-ink)]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            <div
              id="media-video-collection-grid"
              className={`grid grid-cols-1 gap-6 ${
                posterVideo && sideVideos.length > 0 ? "lg:grid-cols-12 lg:items-start" : ""
              }`}
            >
              {/* Published Studio Poster Card */}
              {posterVideo && (
                <article
                  className={`bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] hover:border-[var(--accent-gold)] rounded-[2px] overflow-hidden flex flex-col transition-colors duration-200 min-w-0 ${
                    sideVideos.length > 0 ? "lg:col-span-7" : "lg:col-span-12"
                  }`}
                >
                  <div
                    onClick={(e) => {
                      const btn = e.currentTarget.querySelector<HTMLButtonElement>("button");
                      openVideoModal(
                        {
                          youtubeId: posterVideo.youtubeId,
                          title: posterVideo.title,
                          channel: posterVideo.channel,
                          url:
                            posterVideo.url ||
                            `https://www.youtube.com/watch?v=${posterVideo.youtubeId}`,
                          posterUrl: posterVideo.thumbUrl,
                        },
                        btn
                      );
                    }}
                    className="group relative block w-full aspect-video bg-[var(--bg-dark)] overflow-hidden cursor-pointer"
                  >
                    {renderPosterArtwork(
                      posterVideo.id,
                      posterVideo.thumbUrl || "",
                      posterVideo.title,
                      false
                    )}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, var(--poster-scrim-start) 0%, var(--poster-scrim-mid) 36%, var(--poster-scrim-end) 72%)",
                      }}
                    />
                    <div className="absolute left-3 right-3 bottom-3 sm:left-6 sm:right-6 sm:bottom-6 z-10 flex items-center justify-start">
                      <button
                        id="featured-poster-btn"
                        type="button"
                        aria-label={`${featured?.playLabel || ui?.watchCard}: ${posterVideo.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openVideoModal(
                            {
                              youtubeId: posterVideo.youtubeId,
                              title: posterVideo.title,
                              channel: posterVideo.channel,
                              url:
                                posterVideo.url ||
                                `https://www.youtube.com/watch?v=${posterVideo.youtubeId}`,
                              posterUrl: posterVideo.thumbUrl,
                            },
                            e.currentTarget
                          );
                        }}
                        className="min-h-[44px] sm:min-h-[48px] px-4 sm:px-6 bg-[var(--bg-surface-warm)] text-[var(--text-ink)] border border-[var(--bg-surface-warm)] group-hover:bg-[var(--accent-gold-ink)] group-hover:border-[var(--accent-gold-ink)] group-hover:text-[var(--bg-surface-warm)] group-hover:-translate-y-0.5 hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] hover:text-[var(--bg-surface-warm)] rounded-[2px] text-[13.5px] sm:text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>{featured?.playLabel || ui?.watchCard}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[var(--text-muted-aa)]">
                      <span className="font-semibold text-[var(--accent-gold-ink)]">
                        {posterVideo.channel}
                      </span>
                      <span className="font-mono text-[12.5px] tabular-nums">
                        {posterVideo.dateIso && posterVideo.dateFormatted ? (
                          <time dateTime={posterVideo.dateIso}>{posterVideo.dateFormatted}</time>
                        ) : null}
                        {posterVideo.dateFormatted ? ` / ${posterVideo.durationPlaceholder}` : posterVideo.durationPlaceholder}
                      </span>
                    </div>

                    <span className="inline-flex items-center self-start min-h-[28px] px-3 py-1 rounded-[2px] text-[12.5px] font-semibold bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)] border border-[var(--accent-gold-border)]">
                      {posterVideo.statusNote || posterVideo.topicBadge}
                    </span>

                    <h4 className="font-serif text-[clamp(20px,2vw,24px)] font-semibold leading-[1.25] text-[var(--text-ink)] [overflow-wrap:break-word] min-w-0">
                      {posterVideo.title}
                    </h4>

                    {posterVideo.summary && (
                      <p className="text-[15px] leading-[1.6] text-[var(--text-soft-editorial)] max-w-[58ch]">
                        {posterVideo.summary}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
                      <button
                        type="button"
                        onClick={(e) =>
                          openVideoModal(
                            {
                              youtubeId: posterVideo.youtubeId,
                              title: posterVideo.title,
                              channel: posterVideo.channel,
                              url:
                                posterVideo.url ||
                                `https://www.youtube.com/watch?v=${posterVideo.youtubeId}`,
                              posterUrl: posterVideo.thumbUrl,
                            },
                            e.currentTarget
                          )
                        }
                        className="min-h-[46px] px-5 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] rounded-[2px] text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>{ui?.watchCard}</span>
                      </button>

                      <a
                        href={posterVideo.url || `https://www.youtube.com/watch?v=${posterVideo.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[46px] px-4 bg-transparent text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--accent-gold-ink)] hover:bg-[var(--accent-gold-soft)] rounded-[2px] text-[14px] font-medium inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                      >
                        <span>{ui?.extCard}</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M4 12L12 4M6 4h6v6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              )}

              {/* Side Stack: Published Broadcast Entry & Safe Obsidian Archive Fallback */}
              {sideVideos.length > 0 && (
                <div
                  className={`flex flex-col gap-6 min-w-0 ${
                    posterVideo ? "lg:col-span-5" : "lg:col-span-12"
                  }`}
                >
                  {sideVideos.map((entry) => {
                    const isAvailable = entry.isAvailable !== false;

                    if (isAvailable) {
                      return (
                        <article
                          key={entry.id}
                          className="bg-[var(--bg-stone-soft)] border border-[var(--border-hairline-editorial)] rounded-[2px] p-6 flex flex-col gap-3 min-w-0"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[var(--text-muted-aa)]">
                            <span className="font-semibold text-[var(--accent-gold-ink)]">
                              {entry.channel}
                            </span>
                            <span className="font-mono text-[12.5px] tabular-nums">
                              {entry.dateIso && entry.dateFormatted ? (
                                <time dateTime={entry.dateIso}>{entry.dateFormatted}</time>
                              ) : null}
                              {entry.dateFormatted ? ` / ${entry.durationPlaceholder}` : entry.durationPlaceholder}
                            </span>
                          </div>

                          <span className="inline-flex items-center self-start min-h-[28px] px-3 py-1 rounded-[2px] text-[12.5px] font-semibold bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)] border border-[var(--accent-gold-border)]">
                            {entry.statusNote || entry.topicBadge}
                          </span>

                          <h4 className="font-serif text-[clamp(20px,2vw,24px)] font-semibold leading-[1.25] text-[var(--text-ink)] [overflow-wrap:break-word] min-w-0">
                            {entry.title}
                          </h4>

                          {entry.summary && (
                            <p className="text-[15px] leading-[1.6] text-[var(--text-soft-editorial)] max-w-[58ch]">
                              {entry.summary}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
                            <button
                              type="button"
                              onClick={(e) =>
                                openVideoModal(
                                  {
                                    youtubeId: entry.youtubeId,
                                    title: entry.title,
                                    channel: entry.channel,
                                    url:
                                      entry.url ||
                                      `https://www.youtube.com/watch?v=${entry.youtubeId}`,
                                  },
                                  e.currentTarget
                                )
                              }
                              className="min-h-[46px] px-5 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] rounded-[2px] text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              <span>{ui?.watchCard}</span>
                            </button>

                            <a
                              href={entry.url || `https://www.youtube.com/watch?v=${entry.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="min-h-[46px] px-4 bg-transparent text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--accent-gold-ink)] hover:bg-[var(--accent-gold-soft)] rounded-[2px] text-[14px] font-medium inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                            >
                              <span>{ui?.extCard}</span>
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path
                                  d="M4 12L12 4M6 4h6v6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </div>
                        </article>
                      );
                    }

                    // Unavailable / Archive-in-Production Slate: Obsidian surface, zero broken YouTube requests
                    return (
                      <article
                        key={entry.id}
                        aria-label={entry.statusNote || entry.topicBadge}
                        className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] border border-[var(--border-on-dark)] rounded-[2px] p-6 flex flex-col gap-4 min-w-0"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-on-dark)] text-[12.5px] text-[var(--text-muted-on-dark)]">
                          <span>{entry.channel}</span>
                          <span className="px-2 py-1 border border-[var(--accent-gold-border)] text-[var(--accent-gold-light)] rounded-[2px] text-[12px] font-semibold">
                            {entry.statusNote || entry.topicBadge}
                          </span>
                        </div>

                        <h4 className="font-serif text-[20px] font-medium leading-[1.3] text-[var(--text-on-dark)] [overflow-wrap:break-word]">
                          {entry.title}
                        </h4>

                        {entry.summary && (
                          <p className="text-[14.5px] leading-[1.6] text-[var(--text-muted-on-dark)]">
                            {entry.summary}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-on-dark)]">
                          <button
                            type="button"
                            disabled
                            aria-disabled="true"
                            className="min-h-[44px] px-4 bg-[var(--bg-dark-elevated)] text-[var(--text-muted-on-dark)] border border-[var(--border-on-dark)] rounded-[2px] text-[13.5px] font-medium inline-flex items-center gap-2 disabled:opacity-65 disabled:cursor-not-allowed"
                          >
                            <span>{ui?.archiveSoonBtn}</span>
                          </button>

                          <a
                            href={entry.channelUrl || ui?.officialChannelUrl || "https://www.youtube.com/@AnvarAbduqayum"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] px-4 border border-[var(--accent-gold-border)] text-[var(--accent-gold-light)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-light)] hover:text-[var(--bg-surface-warm)] rounded-[2px] text-[13.5px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                          >
                            <span>{ui?.officialChannelBtn}</span>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path
                                d="M4 12L12 4M6 4h6v6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          BAND 2: PRESS COVERAGE & PUBLIC FORUMS LEDGER (ALABASTER CREAM)
          ================================================================= */}
      <div
        id="media-press"
        className="bg-[var(--bg-alabaster)] border-b border-[var(--border-hairline-editorial)] py-20 lg:py-28"
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-3 border-b border-[var(--border-hairline-editorial-strong)] mb-6">
            <h3 className="font-serif text-[clamp(22px,2.4vw,28px)] font-semibold leading-[1.2] text-[var(--text-ink)]">
              {media.pressHeading}
            </h3>
            {media.pressSubmeta && (
              <span className="text-[13.5px] font-medium text-[var(--text-muted-aa)]">
                {media.pressSubmeta}
              </span>
            )}
          </div>

          {media.pressFilters && (
            <div
              ref={pressTabListRef}
              id="media-press-filters"
              role="tablist"
              aria-label={media.pressFilters.ariaLabel}
              className="flex flex-wrap gap-2 mb-6"
            >
              {pressFilterKeys.map((key, idx) => {
                const isActive = pressFilter === key;
                const label = media.pressFilters![key];
                return (
                  <button
                    key={key}
                    id={`media-pflt-${key}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setPressFilter(key)}
                    onKeyDown={(e) =>
                      handleTabKeyDown(e, idx, pressFilterKeys, setPressFilter, pressTabListRef)
                    }
                    className={`min-h-[44px] px-4 py-2 rounded-[2px] border text-[14px] font-medium transition-[background-color,color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                      isActive
                        ? "bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border-[var(--bg-dark)]"
                        : "bg-[var(--bg-surface-warm)] text-[var(--text-soft-editorial)] border-[var(--border-hairline-editorial-strong)] hover:border-[var(--text-ink)] hover:text-[var(--text-ink)]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          <div
            id="media-press-ledger"
            className="border-t border-[var(--border-hairline-editorial-strong)]"
          >
            {filteredPress.map((press) => (
              <article
                key={press.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 py-6 lg:px-2 border-b border-[var(--border-hairline-editorial)] items-center hover:bg-[var(--bg-stone-soft)] transition-colors duration-150"
              >
                <div className="lg:col-span-2 flex flex-col gap-0.5">
                  <span className="text-[15.5px] font-bold text-[var(--text-ink)]">
                    {press.outlet}
                  </span>
                  <span className="font-mono text-[12.5px] tabular-nums text-[var(--text-muted-aa)]">
                    {press.dateIso ? (
                      <time dateTime={press.dateIso}>{press.datePlaceholder}</time>
                    ) : (
                      press.datePlaceholder
                    )}
                  </span>
                </div>

                <div className="lg:col-span-2 text-[13.5px] font-medium text-[var(--accent-gold-ink)]">
                  {press.publicationType}
                </div>

                <div className="lg:col-span-6 min-w-0">
                  <h4 className="font-serif text-[clamp(18px,1.8vw,22px)] font-semibold leading-[1.3] text-[var(--text-ink)] [overflow-wrap:break-word] min-w-0">
                    {press.articleTitle}
                  </h4>
                  {press.contextNote && (
                    <p className="text-[14px] leading-[1.5] text-[var(--text-soft-editorial)] mt-1 max-w-[60ch]">
                      {press.contextNote}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-2 flex justify-start lg:justify-end">
                  <a
                    href={press.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-4 bg-[var(--bg-surface-warm)] text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:bg-[var(--bg-dark)] hover:border-[var(--bg-dark)] hover:text-[var(--bg-surface-warm)] rounded-[2px] text-[13.5px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                  >
                    <span>{ui?.readPress}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M4 12L12 4M6 4h6v6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {ui?.disclosureHeading && (
            <aside
              id="media-source-disclosure"
              aria-label={ui.disclosureHeading}
              className="mt-10 p-6 bg-[var(--bg-stone-soft)] border-t border-[var(--border-hairline-editorial-strong)] border-b border-[var(--border-hairline-editorial)] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
            >
              <div className="lg:col-span-8">
                <h4 className="text-[14px] font-bold text-[var(--text-ink)] mb-1">
                  {ui.disclosureHeading}
                </h4>
                <p className="text-[14px] leading-[1.6] text-[var(--text-soft-editorial)] max-w-[68ch]">
                  {ui.disclosureCopy}
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <a
                  id="media-official-yt-link"
                  href={ui.officialChannelUrl || "https://www.youtube.com/@AnvarAbduqayum"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] px-4 bg-transparent text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:border-[var(--accent-gold-ink)] hover:bg-[var(--accent-gold-soft)] rounded-[2px] text-[14px] font-medium inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span>{ui.officialChannelHandleLabel}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 12L12 4M6 4h6v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* =================================================================
          ACCESSIBLE YOUTUBE MODAL (Mounts ONLY on activation + Safe Fallback)
          ================================================================= */}
      {activeVideo && (
        <div
          id="media-video-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-modal-title"
          onClick={closeVideoModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-backdrop-media)]"
        >
          <div
            ref={modalDialogRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[58rem] bg-[var(--bg-dark)] text-[var(--text-on-dark)] border border-[var(--border-on-dark)] rounded-[2px] overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[var(--bg-dark-elevated)] border-b border-[var(--border-on-dark)]">
              <div className="min-w-0 flex-1 basis-[240px]">
                <h3
                  id="media-modal-title"
                  className="font-serif text-[19px] font-medium leading-[1.3] text-[var(--text-on-dark)]"
                >
                  {activeVideo.title}
                </h3>
                <p className="text-[13px] text-[var(--accent-gold-light)] font-medium mt-0.5">
                  {activeVideo.channel}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  id="media-modal-ext-link"
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 border border-[var(--accent-gold-border)] text-[var(--accent-gold-light)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-light)] hover:text-[var(--bg-surface-warm)] rounded-[2px] text-[13.5px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span>{ui?.modalExt}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 12L12 4M6 4h6v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <button
                  ref={closeButtonRef}
                  id="media-modal-close-btn"
                  type="button"
                  onClick={closeVideoModal}
                  aria-label={ui?.modalCloseAriaLabel || ui?.modalClose}
                  className="min-h-[44px] min-w-[44px] px-4 bg-[var(--bg-surface-warm)] text-[var(--text-ink)] border border-[var(--bg-surface-warm)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] hover:text-[var(--bg-surface-warm)] rounded-[2px] text-[13.5px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span>{ui?.modalClose}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 16:9 Player / Loading / Graceful Fallback Frame */}
            <div className="relative w-full aspect-video bg-[var(--bg-dark)] overflow-hidden">
              {playerState === "fallback" ? (
                <div
                  className="relative w-full h-full min-h-[260px] flex items-center justify-center p-6 bg-[var(--bg-dark)]"
                  role="region"
                  aria-label={ui?.modalFallbackTitle}
                >
                  {activeVideo.posterUrl && (
                    <Image
                      unoptimized
                      src={activeVideo.posterUrl}
                      alt={activeVideo.title}
                      width={1280}
                      height={720}
                      className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale-[35%] contrast-[1.05]"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[var(--bg-backdrop-media)]"
                  />
                  <div className="relative z-10 max-w-[46ch] text-center flex flex-col items-center gap-4">
                    <h4 className="font-serif text-[clamp(20px,2.2vw,24px)] font-medium leading-[1.3] text-[var(--text-on-dark)]">
                      {ui?.modalFallbackTitle}
                    </h4>
                    <p className="text-[14.5px] leading-[1.6] text-[var(--text-muted-on-dark)]">
                      {ui?.modalFallbackBody}
                    </p>
                    <a
                      href={activeVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] px-6 bg-[var(--accent-gold-ink)] text-[var(--bg-surface-warm)] border border-[var(--accent-gold-light)] hover:bg-[var(--bg-surface-warm)] hover:border-[var(--bg-surface-warm)] hover:text-[var(--text-ink)] rounded-[2px] text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{ui?.modalWatchYoutube}</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M4 12L12 4M6 4h6v6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {playerState === "loading" && (
                    <div
                      id="media-modal-loading"
                      className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center text-[14px] text-[var(--text-muted-on-dark)] pointer-events-none"
                    >
                      {ui?.modalLoading}
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    id="media-yt-iframe"
                    src={modalEmbedSrc}
                    title={activeVideo.title}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => {
                      try {
                        iframeRef.current?.contentWindow?.postMessage(
                          JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
                          "*"
                        );
                      } catch {
                        // postMessage may be restricted; timeout fallback guards UX
                      }
                    }}
                    onError={() => {
                      playerReadyRef.current = false;
                      setPlayerState("fallback");
                    }}
                    className="relative z-20 w-full h-full border-0 block"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
