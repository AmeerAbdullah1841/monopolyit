/**
 * Brand-level configuration. Change the company name, contact details and
 * navigation here — every component reads from this file.
 */
export const site = {
  name: "MonyPoly IT",
  tagline: "Consulting & Staffing",
  description:
    "IT consulting and technical staffing for teams that need senior expertise, vetted talent, and delivery they can measure.",
  url: "https://monypoly-it.example.com",
  email: "hello@monypolyit.com",
  phone: "+1 (555) 014-2099",
  location: "Remote-first · US & EMEA",
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "staffing", label: "Staffing" },
  { id: "approach", label: "Approach" },
  { id: "mission", label: "Mission" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
