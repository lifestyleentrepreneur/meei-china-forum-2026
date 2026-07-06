import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.siteName}`,
};

export default function PrivacyPage() {
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
          Privacy Policy
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

        <div className="prose prose-sm max-w-none">
          <div className="space-y-6 text-sm leading-relaxed text-[var(--text-secondary)]">
            <section>
              <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                1. Information We Collect
              </h2>
              <p>
                When you register interest or contact us through this website, we collect the information you provide, including your name, email address, phone number, professional details, and any additional notes you submit.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                2. How We Use Your Information
              </h2>
              <p>
                Information collected is used by MEEI Program to process registration interest, communicate summit-related updates, and respond to enquiries. We do not use your information for unrelated purposes without your consent.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                3. Data Sharing
              </h2>
              <p>
                We do not sell, rent, or share your personal information with third parties without your explicit consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                4. Contact
              </h2>
              <p>
                For questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:conference@meeihub.com" className="text-[var(--green-bright)] hover:underline">
                  conference@meeihub.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
