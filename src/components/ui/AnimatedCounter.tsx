"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1800,
  delay = 500,
  className = "",
}: AnimatedCounterProps) {
  // Extract number from string (e.g. "10 000+" -> 10000, suffix "+")
  const numericString = value.replace(/[^0-9]/g, "");
  const targetNumber = parseInt(numericString, 10);
  const hasValidNumber = !isNaN(targetNumber) && targetNumber > 0;
  
  // Suffix (e.g. "+" or "%")
  const suffix = value.includes("+") ? "+" : value.includes("%") ? "%" : "";
  const prefix = value.startsWith("$") ? "$" : "";

  // Helper to format number matching original formatting (non-breaking space separated thousands)
  const formatNumber = useCallback(
    (num: number) => {
      const formatted = num.toLocaleString("uz-UZ").replace(/,/g, "\u00A0");
      return `${prefix}${formatted}${suffix}`;
    },
    [prefix, suffix]
  );

  const [displayValue, setDisplayValue] = useState<string>(() =>
    hasValidNumber ? `${prefix}0${suffix}` : value
  );
  const [mounted, setMounted] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!hasValidNumber) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(targetNumber * easeProgress);

      setDisplayValue(formatNumber(current));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value.replace(/\s+/g, "\u00A0")); // Ensure exact final value matches translation with non-breaking space
      }
    };

    const timerId = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timerId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration, delay, targetNumber, hasValidNumber, formatNumber]);

  // If server-side rendering or before mount, return fallback to prevent layout shift
  if (!mounted) {
    return <span className={`inline-block whitespace-nowrap ${className}`}>{value.replace(/\s+/g, "\u00A0")}</span>;
  }

  return <span className={`inline-block whitespace-nowrap ${className}`}>{displayValue}</span>;
}
