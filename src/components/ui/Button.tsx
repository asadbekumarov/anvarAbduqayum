"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      href,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium uppercase tracking-wider text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:opacity-50 disabled:pointer-events-none rounded-[2px] overflow-hidden group select-none transition-colors duration-200";

    const sizeStyles = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-xs",
      lg: "h-14 px-8 text-sm",
    };

    const variantStyles = {
      primary:
        "bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] font-medium border-none",
      outline:
        "bg-transparent border border-white/15 text-white hover:border-white/40 hover:text-white active:bg-elevated",
      ghost:
        "bg-transparent text-muted hover:text-white border-none p-0 h-auto",
    };

    const classes = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const innerContent = (
      <>
        {/* Subtle Gold/White Shimmer Light-Sweep Ray on Primary */}
        {variant === "primary" && (
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full z-10"
            aria-hidden="true"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: EASE_SWISS }}
          className={classes}
        >
          {innerContent}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.2, ease: EASE_SWISS }}
        className={classes}
        {...(props as HTMLMotionProps<"button">)}
      >
        {innerContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
