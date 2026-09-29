import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

import { NewsletterForm } from "./newsletter-form";

const columns = [
  {
    title: "Services",
    links: [
      { label: "IT consulting", href: "/#services" },
      { label: "Staff augmentation", href: "/#staffing" },
      { label: "Dedicated teams", href: "/#staffing" },
      { label: "Direct hire", href: "/#staffing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Approach", href: "/#approach" },
      { label: "Mission", href: "/#mission" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-950/60">
      <div aria-hidden className="divider-glow absolute inset-x-0 top-0" />

      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_2fr] md:gap-16">
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            We pair senior IT consulting with technically vetted talent so you can plan confidently, staff quickly,
            and deliver without the guesswork.
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow !text-fg/80">{column.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative text-sm text-muted transition-colors hover:text-white"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-line py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <a href={`mailto:${site.email}`} className="text-cyan-400 transition-colors hover:text-cyan-300">
          {site.email}
        </a>
      </div>
    </footer>
  );
}
