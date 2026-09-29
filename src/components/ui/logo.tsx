import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

import logoMark from "../../../public/logo-mark.png";

export function LogoMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logoMark}
      alt=""
      priority={priority}
      sizes="56px"
      className={cn("h-11 w-auto drop-shadow-[0_0_14px_rgb(95_208_234/0.35)]", className)}
    />
  );
}

/** Wordmark colours sampled from the brand logo; "Mono" is lifted slightly for contrast on navy. */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/#home" className={cn("group flex items-center gap-3", className)} aria-label={`${site.name} home`}>
      <LogoMark
        priority={priority}
        className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-4deg]"
      />
      <span className="leading-tight">
        <span className="block text-[1.05rem] font-bold tracking-tight">
          <span className="text-[#5b7fdc]">Mono</span>
          <span className="text-white">Poly</span> <span className="text-[#3bbcd8]">IT</span>
        </span>
        <span className="block text-[0.62rem] font-medium tracking-[0.22em] text-muted uppercase">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
