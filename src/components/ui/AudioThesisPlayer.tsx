"use client";

import React, { useState, useEffect, useRef } from "react";

export interface AudioThesisPlayerProps {
  audioSrc?: string;
  speechText?: string;
  title?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  durationLabel?: string;
  totalDurationSeconds?: number;
  locale?: string;
  className?: string;
}

// 24 architectural vertical hairline bar heights representing sound monograph envelope
const WAVEFORM_HEIGHTS = [
  6, 12, 8, 16, 20, 14, 22, 18, 10, 16, 24, 19, 13, 21, 17, 23, 15, 11, 18, 14, 9, 12, 7, 5,
];

export const AudioThesisPlayer: React.FC<AudioThesisPlayerProps> = ({
  audioSrc,
  speechText,
  title,
  sourceUrl,
  sourceLabel,
  durationLabel = "0:15",
  totalDurationSeconds = 15,
  locale = "uz",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const duration = totalDurationSeconds;

  // Localized strings
  const labels = {
    uz: {
      listen: "Tezisni tinglash",
      playing: "Tinglanmoqda",
      badge: "OVOZLI TEZIS",
      audioAria: "Falsafiy tezis audiopleyeri",
      playAria: "Tezis audiosini tinglash",
      pauseAria: "Audioni to‘xtatish",
      sourceAria: "Asl video ma’ruzani ochish",
      watchFull: "Asl ma’ruza",
    },
    ru: {
      listen: "Слушать тезис",
      playing: "Воспроизведение",
      badge: "АУДИО-ТЕЗИС",
      audioAria: "Аудио тезиса философии",
      playAria: "Воспроизвести тезис",
      pauseAria: "Приостановить",
      sourceAria: "Открыть оригинальную видеолекцию",
      watchFull: "Первоисточник",
    },
    en: {
      listen: "Listen to Thesis",
      playing: "Playing",
      badge: "AUDIO THESIS",
      audioAria: "Thesis audio player",
      playAria: "Play audio thesis",
      pauseAria: "Pause audio",
      sourceAria: "Open original video lecture",
      watchFull: "Source Lecture",
    },
  }[locale as "uz" | "ru" | "en"] || {
    listen: "Listen to Thesis",
    playing: "Playing",
    badge: "AUDIO THESIS",
    audioAria: "Thesis audio player",
    playAria: "Play audio thesis",
    pauseAria: "Pause audio",
    sourceAria: "Open original video lecture",
    watchFull: "Source Lecture",
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);

      // Play audio element if available
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Audio autoplay fallback
        });
      }

      // Voice with browser speech synthesis if text provided
      if (speechText && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = locale === "ru" ? "ru-RU" : (locale === "uz" ? "uz-UZ" : "en-US");
        utterance.rate = 0.95;
        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentTime(0);
        };
        utterance.onerror = () => {
          // Keep audio playing
        };
        window.speechSynthesis.speak(utterance);
      }

      // Progress interval
      progressTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.25;
          if (next >= duration) {
            if (progressTimerRef.current) {
              clearInterval(progressTimerRef.current);
              progressTimerRef.current = null;
            }
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 250);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const progressRatio = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const activeBarsCount = Math.floor(progressRatio * 24);

  return (
    <div
      role="region"
      aria-label={`${labels.audioAria}${title ? `: ${title}` : ""}`}
      className={`inline-flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 px-3 py-1.5 rounded-[2px] bg-[#17181D] border border-[rgba(212,175,55,0.22)] shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[rgba(212,175,55,0.4)] ${className}`}
    >
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="metadata"
        />
      )}

      {/* Button: [ ▶ Listen to Thesis · 0:15 ] */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? labels.pauseAria : labels.playAria}
        className="group min-h-[30px] inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-[0.06em] rounded-[2px] bg-[#111215] text-[#F5F4F0] border border-[rgba(255,255,255,0.12)] hover:border-[#D4AF37] hover:text-[#D4AF37] active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <span
          className="text-[#D4AF37] text-[10px] flex items-center justify-center w-3 h-3 transition-transform duration-150 group-hover:scale-110"
          aria-hidden="true"
        >
          {isPlaying ? "❚❚" : "▶"}
        </span>
        <span className="whitespace-nowrap">
          {isPlaying ? labels.playing : labels.listen}
        </span>
        <span className="text-[#8E95A5] tabular-nums text-[10.5px]">
          · {isPlaying ? formatTime(currentTime) : durationLabel}
        </span>
      </button>

      {/* 24 Vertical Hairline Bars in JetBrains Mono Aesthetic */}
      <div
        className="flex items-center gap-[2px] h-[24px] px-1.5 bg-[#111215]/80 rounded-[2px] border border-[rgba(255,255,255,0.06)]"
        aria-hidden="true"
      >
        {WAVEFORM_HEIGHTS.map((baseHeight, i) => {
          const isPassed = i <= activeBarsCount && (isPlaying || currentTime > 0);
          return (
            <div
              key={i}
              className={`w-[1.5px] rounded-full transition-all duration-150 ${
                isPassed ? "bg-[#D4AF37]" : "bg-[rgba(255,255,255,0.2)]"
              } ${isPlaying ? "animate-pulse" : ""}`}
              style={{
                height: isPlaying
                  ? `${Math.max(4, Number((baseHeight * (0.65 + ((i % 5) * 0.15))).toFixed(1)))}px`
                  : `${baseHeight}px`,
                animationDelay: `${(i * 35) % 500}ms`,
                animationDuration: "0.75s",
              }}
            />
          );
        })}
      </div>

      {/* Verified Authority Badge */}
      <span
        className="inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-[2px] border border-[#D4AF37]/30 shrink-0"
      >
        {labels.badge}
      </span>

      {/* Real YouTube Source Attribution Link */}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.sourceAria}: ${sourceLabel || title || "YouTube"}`}
          className="inline-flex items-center gap-1 font-mono text-[10px] text-[#8E95A5] hover:text-[#D4AF37] transition-colors py-0.5 border-b border-transparent hover:border-[#D4AF37] shrink-0"
          title={`Ko'rish: ${sourceLabel || "YouTube video ma'ruza"}`}
        >
          <span className="text-[#D4AF37]" aria-hidden="true">↗</span>
          <span className="hidden md:inline">{sourceLabel || labels.watchFull}</span>
        </a>
      )}
    </div>
  );
};
