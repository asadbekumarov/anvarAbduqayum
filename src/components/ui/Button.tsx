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
      "relative inline-flex items-center justify-center font-medium uppercase tracking-wider text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50 disabled:pointer-events-none rounded-[2px] overflow-hidden group select-none transition-colors duration-200";

    const sizeStyles = {
      sm: "h-9 px-4 text-[11px]",
      md: "h-11 px-6 text-xs",
      lg: "h-14 px-8 text-sm",
    };

    const variantStyles = {
      primary:
        "gold-gradient text-base font-semibold border-none shadow-[0_4px_16px_rgba(197,168,128,0.2)] hover:shadow-[0_6px_22px_rgba(197,168,128,0.35)]",
      outline:
        "bg-transparent border border-border text-white hover:border-gold hover:text-gold active:bg-elevated",
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
            className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10"
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
