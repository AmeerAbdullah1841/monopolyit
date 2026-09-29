import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="September 2026">
      <p>
        This placeholder describes how {site.name} handles personal information. Replace it with a policy reviewed by
        your legal counsel before launch.
      </p>
      <h2>Information we collect</h2>
      <p>Details you submit through our forms—such as your name, work email, company, and message—and basic analytics.</p>
      <h2>How we use it</h2>
      <p>To respond to enquiries, match candidates to roles, and send updates you have opted into. We never sell your data.</p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a className="text-cyan-400 hover:text-cyan-300" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
