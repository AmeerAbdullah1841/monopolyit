"use client";

import { useRef, type ComponentProps, type PointerEvent } from "react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = ComponentProps<"div"> & {
  /** CSS color of the glow that follows the pointer. */
  glow?: string;
};

/**
 * Card surface with a radial highlight that tracks the pointer. Position is
 * written to CSS variables so hovering never triggers a React re-render.
 */
export function SpotlightCard({
  glow = "rgb(95 208 234 / 0.14)",
  className,
  children,
  onPointerMove,
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }
    onPointerMove?.(event);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "surface group/card relative isolate overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1",
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), ${glow}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
