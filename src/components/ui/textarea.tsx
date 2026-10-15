"use client"

import * as React from "react"
import { RiErrorWarningLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useOptionalFieldContext } from "@/components/ui/field"
import { scrollBarVariants } from "@/components/ui/scroll-area"
import { Spinner, type SpinnerProps } from "@/components/ui/spinner"

type TextareaSize = "xs" | "sm" | "md"

const textareaVariants = cva(
  [
    // base
    "flex min-h-[90px] w-full resize-none border border-[#262626] outline-none bg-[#0A0A0A] font-sans text-sm text-white placeholder:text-muted/60 transition-colors shadow-none rounded-lg p-3",
    // scrollbar
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    // hover
    "hover:border-[#383838]",
    // focus
    "focus:border-gold focus:ring-1 focus:ring-gold/30",
    "focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30",
    // disabled
    "disabled:cursor-not-allowed disabled:opacity-50",
    // aria-[invalid=true]
    "aria-[invalid=true]:border-red-500/80",
  ],
  {
    variants: {
      size: {
        xs: "p-2.5 text-xs min-h-[75px]",
        sm: "p-3 text-sm min-h-[90px]",
        md: "p-3.5 text-sm min-h-[110px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function TextareaResizerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="3"
        y1="10"
        x2="10"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="10"
        x2="10"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const resizeClassMap = {
  x: "resize-x",
  y: "resize-y",
  both: "resize",
} as const

const SPINNER_SIZE: Record<TextareaSize, SpinnerProps["size"]> = {
  xs: "sm",
  sm: "md",
  md: "lg",
}

const INVALID_ICON_SIZE: Record<TextareaSize, string> = {
  xs: "size-4",
  sm: "size-4",
  md: "size-4",
}

function Textarea({
  className,
  size,
  resizable,
  loading: loadingProp,
  "aria-invalid": ariaInvalidProp,
  disabled: disabledProp,
  readOnly,
  ...props
}: Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof textareaVariants> & {
    resizable?: "x" | "y" | "both"
    loading?: boolean
  }) {
  const fieldCtx = useOptionalFieldContext()
  const resolvedSize: TextareaSize =
    (size as TextareaSize | undefined) ??
    (fieldCtx?.size as TextareaSize | undefined) ??
    "sm"
  const resolvedLoading = loadingProp ?? fieldCtx?.loading ?? false
  const resolvedDisabled = disabledProp ?? fieldCtx?.disabled
  const resolvedInvalid =
    ariaInvalidProp === true ||
    ariaInvalidProp === "true" ||
    fieldCtx?.invalid ||
    false

  const showStatusIcon = resolvedLoading || resolvedInvalid

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [scrollbar, setScrollbar] = React.useState({ size: 1, offset: 0 })

  const syncScrollbar = React.useCallback(() => {
    const el = wrapperRef.current?.querySelector("textarea")
    if (!el) return
    const size = el.clientHeight / el.scrollHeight
    const offset = el.scrollTop / el.scrollHeight
    setScrollbar((prev) =>
      prev.size === size && prev.offset === offset ? prev : { size, offset }
    )
  }, [])

  React.useEffect(syncScrollbar)

  React.useEffect(() => {
    const el = wrapperRef.current?.querySelector("textarea")
    if (!el) return
    el.addEventListener("scroll", syncScrollbar, { passive: true })
    el.addEventListener("input", syncScrollbar)
    const observer = new ResizeObserver(syncScrollbar)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", syncScrollbar)
      el.removeEventListener("input", syncScrollbar)
      observer.disconnect()
    }
  }, [syncScrollbar])

  return (
    <div
      ref={wrapperRef}
      data-slot="textarea-wrapper"
      className={cn("relative w-full", resizable && "grid")}
    >
      <textarea
        data-slot="textarea"
        data-size={resolvedSize}
        data-loading={resolvedLoading || undefined}
        aria-invalid={resolvedInvalid || undefined}
        aria-busy={resolvedLoading || undefined}
        disabled={resolvedDisabled}
        readOnly={resolvedLoading || readOnly || undefined}
        className={cn(
          textareaVariants({ size: resolvedSize }),
          resizable &&
            `${resizeClassMap[resizable]} col-start-1 row-start-1 [&::-webkit-resizer]:hidden`,
          className
        )}
        {...props}
      />
      {showStatusIcon && (
        <span
          aria-hidden="true"
          data-slot="textarea-status-icon"
          className={cn(
            "pointer-events-none absolute bottom-3 left-3 z-[1] flex items-center justify-center",
            !resolvedLoading &&
              cn(
                "text-error-base [&_svg]:size-full",
                INVALID_ICON_SIZE[resolvedSize]
              )
          )}
        >
          {resolvedLoading ? (
            <Spinner variant="info" size={SPINNER_SIZE[resolvedSize]} />
          ) : (
            <RiErrorWarningLine />
          )}
        </span>
      )}
      <span
        data-slot="textarea-scrollbar"
        data-orientation="vertical"
        data-state={scrollbar.size < 1 ? "visible" : "hidden"}
        className={cn(
          scrollBarVariants({ appearance: "ghost", size: "sm" }),
          "pointer-events-none absolute inset-y-0 right-0 z-[1]"
        )}
      >
        <span
          data-slot="textarea-scrollbar-thumb"
          style={{
            height: `${scrollbar.size * 100}%`,
            top: `${scrollbar.offset * 100}%`,
          }}
          className="bg-medium relative flex-1 rounded-full"
        />
      </span>
      {resizable && (
        <span className="pointer-events-none z-[1] col-start-1 row-start-1 self-end justify-self-end p-3">
          <TextareaResizerIcon className="text-placeholder" />
        </span>
      )}
    </div>
  )
}

export { Textarea, textareaVariants }
