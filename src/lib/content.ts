import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Cloud,
  Compass,
  Crosshair,
  Handshake,
  Layers,
  ListChecks,
  ShieldCheck,
  UserCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Practice = "consulting" | "staffing";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  practice: Practice;
  highlights: string[];
}

export const services: Service[] = [
  {
    title: "IT strategy & consulting",
    description:
      "Technology roadmaps, architecture reviews, and vendor selection grounded in your budget, your risk profile, and what your team can actually run.",
    icon: Compass,
    practice: "consulting",
    highlights: ["Roadmaps", "Architecture review", "Vendor selection"],
  },
  {
    title: "Cloud & infrastructure",
    description:
      "Migration planning, cost optimisation, and platform engineering across AWS, Azure, and GCP—with observability and runbooks from day one.",
    icon: Cloud,
    practice: "consulting",
    highlights: ["Migrations", "FinOps", "Platform engineering"],
  },
  {
    title: "Security & compliance",
    description:
      "Gap assessments, SOC 2 / ISO 27001 readiness, and secure SDLC practices that hold up under audit and real-world pressure.",
    icon: ShieldCheck,
    practice: "consulting",
    highlights: ["SOC 2", "ISO 27001", "Secure SDLC"],
  },
  {
    title: "Staff augmentation",
    description:
      "Pre-vetted engineers, analysts, and architects who plug into your rituals and tooling within days—not the usual hiring quarter.",
    icon: UsersRound,
    practice: "staffing",
    highlights: ["Contract", "Contract-to-hire", "Nearshore"],
  },
  {
    title: "Dedicated delivery teams",
    description:
      "A cross-functional pod—lead, engineers, QA, and delivery manager—accountable for outcomes, with transparent velocity and burn reporting.",
    icon: Layers,
    practice: "staffing",
    highlights: ["Squads", "Managed delivery", "SLAs"],
  },
  {
    title: "Direct hire & executive search",
    description:
      "Permanent placements from senior ICs to CTOs, backed by technical screening our consultants run themselves and a 90-day guarantee.",
    icon: UserCheck,
    practice: "staffing",
    highlights: ["Permanent", "Leadership", "90-day guarantee"],
  },
];

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export const stats: Stat[] = [
  { value: 250, suffix: "+", label: "Consultants placed", icon: BriefcaseBusiness },
  { value: 95, suffix: "%", label: "Client retention rate", icon: Handshake },
  { value: 72, suffix: "h", label: "Average time to shortlist", icon: BadgeCheck },
  { value: 60, suffix: "+", label: "Companies served", icon: Building2 },
];

/* ------------------------------------------------------------------ */
/* Staffing engagement models                                          */
/* ------------------------------------------------------------------ */

export interface EngagementModel {
  id: string;
  label: string;
  title: string;
  description: string;
  bestFor: string;
  timeline: string;
  points: string[];
}

export const engagementModels: EngagementModel[] = [
  {
    id: "contract",
    label: "Contract",
    title: "Flexible capacity, on demand",
    description:
      "Bring in specialists for a sprint, a migration, or a spike in demand. Scale up or down with two weeks’ notice.",
    bestFor: "Project peaks, niche skills, backfills",
    timeline: "Shortlist in 72 hours",
    points: ["Hourly or monthly billing", "Replacement guarantee", "Your tools, your rituals"],
  },
  {
    id: "contract-to-hire",
    label: "Contract-to-hire",
    title: "Try the fit before you commit",
    description:
      "Work with a consultant for 3–6 months, then convert them to a full-time employee with no additional placement fee.",
    bestFor: "Critical roles where culture fit matters",
    timeline: "Convert after 90 days",
    points: ["Zero conversion fee", "Performance check-ins", "Reduced hiring risk"],
  },
  {
    id: "dedicated-team",
    label: "Dedicated team",
    title: "A pod that owns the outcome",
    description:
      "A managed, cross-functional team with a delivery lead who reports on velocity, quality, and budget every sprint.",
    bestFor: "New products, platform rebuilds, modernisation",
    timeline: "Team live in 2–3 weeks",
    points: ["Delivery manager included", "Sprint-level reporting", "Knowledge transfer built in"],
  },
  {
    id: "direct-hire",
    label: "Direct hire",
    title: "Permanent talent, technically vetted",
    description:
      "We source, screen, and close permanent hires—from senior engineers to technology leadership—on a success-fee basis.",
    bestFor: "Long-term headcount and leadership roles",
    timeline: "Offers in 3–5 weeks",
    points: ["Success-based fee", "Technical interviews by practitioners", "90-day guarantee"],
  },
];

/* ------------------------------------------------------------------ */
/* Delivery approach                                                   */
/* ------------------------------------------------------------------ */

export interface Phase {
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  metric: { value: string; label: string };
}

export const phases: Phase[] = [
  {
    title: "Discover & define",
    description:
      "We map your goals, systems, and team gaps—then agree on outcomes, constraints, and what “done” looks like before anyone writes a line of code.",
    duration: "1–2 weeks",
    deliverables: ["Needs assessment", "Skills matrix", "Success metrics"],
    metric: { value: "360°", label: "Visibility" },
  },
  {
    title: "Match & design",
    description:
      "Solution blueprints and hand-picked talent. Every candidate is technically interviewed by a practitioner who has done the job.",
    duration: "72 hours – 2 weeks",
    deliverables: ["Candidate shortlist", "Solution design", "Engagement plan"],
    metric: { value: "3%", label: "Of applicants make the bench" },
  },
  {
    title: "Onboard & deliver",
    description:
      "Structured onboarding, clear ownership, and weekly reporting on progress, quality, and spend—so there are no late-stage surprises.",
    duration: "Engagement length",
    deliverables: ["Onboarding kit", "Weekly reports", "Quality reviews"],
    metric: { value: "Zero", label: "Ambiguous handoffs" },
  },
  {
    title: "Scale & evolve",
    description:
      "Quarterly reviews, team adjustments, and knowledge transfer so your organisation keeps the capability after we step back.",
    duration: "Ongoing",
    deliverables: ["QBRs", "Scaling plan", "Knowledge base"],
    metric: { value: "95%", label: "Client retention" },
  },
];

/* ------------------------------------------------------------------ */
/* Expertise (marquee)                                                 */
/* ------------------------------------------------------------------ */

export const roles = [
  "Solutions Architects",
  "Full-stack Engineers",
  "DevOps & SRE",
  "Data Engineers",
  "Cloud Architects",
  "Security Analysts",
  "QA Automation",
  "Product Managers",
  "Scrum Masters",
  "ML Engineers",
  "Business Analysts",
  "UI/UX Designers",
];

export const technologies = [
  "AWS",
  "Azure",
  "Google Cloud",
  "Kubernetes",
  "Terraform",
  "React",
  "Next.js",
  "Node.js",
  ".NET",
  "Java",
  "Python",
  "Snowflake",
  "Salesforce",
  "ServiceNow",
  "SAP",
  "Databricks",
];

/* ------------------------------------------------------------------ */
/* Mission & principles                                                */
/* ------------------------------------------------------------------ */

export interface PrincipleCard {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "cyan" | "gold";
  points: string[];
}

export const principles: PrincipleCard[] = [
  {
    title: "Our mission",
    description:
      "Give growing organisations access to senior technology expertise and proven talent—without the overhead, delays, or guesswork of traditional hiring.",
    icon: ListChecks,
    accent: "cyan",
    points: [
      "Transparent pricing—rates, margins, and timelines spelled out early.",
      "Every candidate screened by an engineer, not a keyword filter.",
      "Advice that is independent of the tools and vendors we recommend.",
    ],
  },
  {
    title: "Our goal",
    description:
      "Be the partner you call first—because the people we place and the plans we write keep delivering long after the engagement ends.",
    icon: Crosshair,
    accent: "gold",
    points: [
      "Placements that last: measured by retention, not just fills.",
      "Knowledge transfer built into every consulting engagement.",
      "Partnerships that survive audits, re-orgs, and roadmap shifts.",
    ],
  },
];

export const whyUs = [
  { icon: ChartNoAxesCombined, label: "Outcome-based reporting" },
  { icon: ShieldCheck, label: "Background-checked talent" },
  { icon: Handshake, label: "Single point of accountability" },
];

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export const contactInterests = [
  "IT consulting",
  "Staff augmentation",
  "Dedicated team",
  "Direct hire",
  "Not sure yet",
] as const;

export type ContactField = "name" | "email" | "company" | "interest" | "message";
