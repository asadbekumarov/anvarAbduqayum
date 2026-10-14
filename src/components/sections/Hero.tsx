"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { siteMedia } from "@/config/siteMedia";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface HeroProps {
  onOpenApply?: () => void;
}

export function Hero({ onOpenApply }: HeroProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("hero");
  const common = useTranslations("common");
  const { portrait } = siteMedia.hero;

  const cardRef = useRef<HTMLDivElement>(null);
  const [isHoverSupported, setIsHoverSupported] = useState(false);

  useEffect(() => {
    setIsHoverSupported(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Mouse parallax motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 140, mass: 0.6 };
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [20, 80]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [20, 80]), springConfig);
  const heroSpotlightBg = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(400px circle at ${gx}% ${gy}%, rgba(212, 175, 55, 0.16), transparent 50%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverSupported || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Stagger reveal animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Bosh sahifa"
      className="relative min-h-[calc(100vh-5rem)] flex items-center border-b border-border py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Subtle Luxury Radial Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-8"
          >


            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] max-w-3xl"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-muted font-light leading-relaxed max-w-2xl"
            >
              {t("description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleApply}
              >
                {t("ctaPrimary")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="#xizmatlar"
              >
                {t("ctaSecondary")}
              </Button>
            </motion.div>

            {/* Key Metrics Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-10 border-t border-border-subtle grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl"
            >
              <div className="border-r border-border-subtle pr-4">
                <span className="gold-gradient-text font-serif text-3xl sm:text-4xl lg:text-5xl font-bold block">
                  <AnimatedCounter value={t("stats.stat1Value")} delay={650} duration={1500} />
                </span>
                <span className="text-[11px] sm:text-xs text-muted uppercase tracking-wider block mt-1 font-light">
                  {t("stats.stat1Label")}
                </span>
              </div>
              <div className="border-r border-border-subtle pr-4">
                <span className="gold-gradient-text font-serif text-3xl sm:text-4xl lg:text-5xl font-bold block">
                  <AnimatedCounter value={t("stats.stat2Value")} delay={800} duration={1700} />
                </span>
                <span className="text-[11px] sm:text-xs text-muted uppercase tracking-wider block mt-1 font-light">
                  {t("stats.stat2Label")}
                </span>
              </div>
              <div>
                <span className="gold-gradient-text font-serif text-3xl sm:text-4xl lg:text-5xl font-bold block">
                  <AnimatedCounter value={t("stats.stat3Value")} delay={950} duration={1900} />
                </span>
                <span className="text-[11px] sm:text-xs text-muted uppercase tracking-wider block mt-1 font-light">
                  {t("stats.stat3Label")}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Portrait Column with 3D Depth & Orbital Gold Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md perspective-1200 flex items-center justify-center"
            >
              {/* 3D Architectural Orbital Gold Wireframe Aura */}
              <div
                className="absolute inset-0 -m-8 sm:-m-12 flex items-center justify-center pointer-events-none preserve-3d"
                aria-hidden="true"
              >
                {/* Ambient Soft Gold Radiance */}
                <div className="absolute w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,168,128,0.16)_0%,rgba(197,168,128,0.04)_45%,transparent_70%)] blur-2xl" />

                {/* Primary 3D Tilted Rotating Gold Ring */}
                <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-gold/25 border-dashed animate-orbit-1" />

                {/* Secondary Counter-Rotating Architectural Ring */}
                <div className="absolute w-[310px] sm:w-[400px] h-[310px] sm:h-[400px] rounded-full border border-gold/20 animate-orbit-2" />

                {/* Outer Fine Accent Ring */}
                <div className="absolute w-[400px] sm:w-[510px] h-[400px] sm:h-[510px] rounded-full border border-border/40" />

                {/* Precision Corner Crosshair Ticks */}
                <span className="absolute -top-3 -left-3 text-gold/40 text-xs font-mono select-none">+</span>
                <span className="absolute -top-3 -right-3 text-gold/40 text-xs font-mono select-none">+</span>
                <span className="absolute -bottom-3 -left-3 text-gold/40 text-xs font-mono select-none">+</span>
                <span className="absolute -bottom-3 -right-3 text-gold/40 text-xs font-mono select-none">+</span>
              </div>

              {/* Portrait Frame */}
              <div
                className="w-full border border-border bg-elevated relative overflow-hidden group rounded-[2px] transition-all duration-500 hover:border-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_60px_-10px_rgba(197,168,128,0.22)] z-10"
              >
                {/* Dynamic Mouse Spotlight Glow on the Card */}
                {isHoverSupported && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: heroSpotlightBg,
                    }}
                  />
                )}

                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
                    className="object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Nameplate */}
                <div className="p-6 border-t border-border bg-base relative z-10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg font-medium text-white block">
                      {common("brandName")}
                    </span>
                    <span className="text-[11px] font-sans uppercase tracking-widest text-gold block mt-0.5">
                      {common("brandRole")}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-muted tracking-widest border border-border px-2 py-0.5 bg-elevated/60">
                    UZ / CIS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
