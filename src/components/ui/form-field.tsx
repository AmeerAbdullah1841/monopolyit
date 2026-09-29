"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const inputStyles =
  "w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-fg placeholder:text-subtle transition-[border-color,box-shadow,background-color] duration-300 outline-none hover:border-line-strong focus:border-cyan-400/60 focus:bg-ink-900 focus:shadow-[0_0_0_4px] focus:shadow-cyan-400/10";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string; className: string }) => ReactNode;
}

/** Label + control + animated inline error, with the ARIA wiring done once. */
export function Field({ id, label, error, optional, children }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-fg">
        {label}
        {optional && <span className="text-xs font-normal text-subtle">Optional</span>}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        className: cn(inputStyles, error ? "border-red-400/60" : "border-line"),
      })}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            className="text-xs text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
