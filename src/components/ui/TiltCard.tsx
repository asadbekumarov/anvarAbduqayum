"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function TiltCard({
  children,
  className,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHoverSupported, setIsHoverSupported] = useState(false);

  useEffect(() => {
    setIsHoverSupported(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  const mousePixelX = useMotionValue(0);
  const mousePixelY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverSupported || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mousePixelX.set(e.clientX - rect.left);
    mousePixelY.set(e.clientY - rect.top);
  };

  const spotlightBg = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(500px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.12), transparent 40%)`
  );

  const spotlightBorderMask = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(350px circle at ${x}px ${y}px, black 30%, transparent 70%)`
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn("relative rounded-[inherit]", className)}
      {...props}
    >
      <div className="relative w-full h-full rounded-[inherit] group">
        {/* Dynamic mouse-tracking radial Gold Spotlight glow on surface */}
        {isHoverSupported && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
            style={{
              background: spotlightBg,
            }}
          />
        )}

        {/* Dynamic Gold Spotlight Border Glow */}
        {isHoverSupported && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-[inherit] border border-gold/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
            style={{
              maskImage: spotlightBorderMask,
              WebkitMaskImage: spotlightBorderMask,
            }}
          />
        )}

        <div className="relative z-0 h-full w-full">{children}</div>
      </div>
    </div>
  );
}
