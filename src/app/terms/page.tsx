import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="September 2026">
      <p>
        These placeholder terms govern use of the {site.name} website. Replace them with terms reviewed by your legal
        counsel before launch.
      </p>
      <h2>Use of this site</h2>
      <p>Content is provided for general information and does not constitute a binding offer of services.</p>
      <h2>Engagements</h2>
      <p>Consulting and staffing engagements are governed by a separate master services agreement.</p>
    </LegalPage>
  );
}
