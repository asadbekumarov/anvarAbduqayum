"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoStrip } from "@/components/ui/VideoStrip";
import { YouTubeModal } from "@/components/ui/YouTubeModal";
import { siteMedia, VideoItem } from "@/config/siteMedia";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const testimonials = siteMedia.testimonials;
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <section
      id="fikrlar"
      aria-label="Mijozlar fikrlari"
      className="py-20 sm:py-28 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="08"
          kicker={t("kicker")}
          title={t("title")}
          description="Kompaniyamiz bilan hamkorlikda tizimlashtirilgan korxona rahbarlari va asoschilarining amaliy xulosalari."
        />

        <VideoStrip
          videos={testimonials}
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
