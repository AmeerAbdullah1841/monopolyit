import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-gold-400 text-ink-950 shadow-[0_10px_40px_-10px] shadow-gold-400/60 hover:bg-gold-300 hover:shadow-[0_14px_50px_-8px] hover:shadow-gold-400/70",
  outline:
    "border border-cyan-400/35 bg-ink-800/40 text-cyan-300 backdrop-blur hover:border-cyan-400/70 hover:bg-cyan-400/10 hover:text-cyan-300",
  solid: "bg-cyan-400 text-ink-950 hover:bg-cyan-300 shadow-[0_10px_30px_-12px] shadow-cyan-400/70",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: ButtonVariant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles(variant, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles(variant, className)} {...props} />;
}
