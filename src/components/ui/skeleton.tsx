import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-md bg-white/[0.05] border border-white/[0.04]",
        shimmer ? "animate-shimmer" : "animate-pulse",
        className
      )}
      {...props}
    />
  );
}
