import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Terms and Conditions | ${siteConfig.siteName}`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
          <Link href="/" aria-label={`${siteConfig.organizer}, return to homepage`} className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
            {siteConfig.organizer}
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="mb-4 font-heading text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
          Terms and Conditions
        </h1>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          {siteConfig.organizer} · {siteConfig.eventName}
        </p>

        <div className="rounded-sm border border-[var(--gold)] bg-[var(--gold)]/10 p-5 mb-10">
          <p className="text-sm font-medium text-[var(--ivory)]">Notice</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Official policy content will be added before launch. The placeholder below outlines the intended scope.
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              1. Use of This Website
            </h2>
            <p>
              This website is operated by MEEI Program. By accessing or using this website, you agree to these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              2. Accuracy of Information
            </h2>
            <p>
              While we endeavour to keep the information on this website accurate and up to date, summit details including dates, venue, speakers, and ticket prices are subject to change. MEEI Program will communicate confirmed details through official channels.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              3. Registration
            </h2>
            <p>
              Submission of a registration interest form does not constitute a confirmed booking. Official registration confirmation, refund terms, and cancellation policies will be communicated by MEEI Program when registration processing is finalised.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              4. Contact
            </h2>
            <p>
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:info@meeiprogram.org" className="text-[var(--green-bright)] hover:underline">
                info@meeiprogram.org
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
