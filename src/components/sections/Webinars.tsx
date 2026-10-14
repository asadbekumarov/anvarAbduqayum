"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoStrip } from "@/components/ui/VideoStrip";
import { YouTubeModal } from "@/components/ui/YouTubeModal";
import { siteMedia, VideoItem } from "@/config/siteMedia";

export function Webinars() {
  const t = useTranslations("webinars");
  const webinars = siteMedia.webinars;
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <section
      id="vebinarlar"
      aria-label="O'tgan vebinarlar"
      className="py-20 sm:py-28 border-b border-border bg-elevated/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="10"
          kicker={t("kicker")}
          title={t("title")}
          description="Boshqaruv tizimlari, xodimlar motivatsiyasi va sotuvni oshirish mavzularidagi ochiq darslar."
        />

        <VideoStrip
          videos={webinars}
          onSelectVideo={(vid) => setSelectedVideo(vid)}
        />
      </div>

      {/* Accessible YouTube Modal */}
      <YouTubeModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.id || null}
        title={selectedVideo?.title}
      />
    </section>
  );
}
