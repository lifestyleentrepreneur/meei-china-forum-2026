import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { siteConfig, pricing, contactDetails } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Payment & Visa Refund Disclaimer | ${siteConfig.siteName}`,
  description: `Payment terms and visa refund policy for the ${siteConfig.eventName}, ${siteConfig.venueCity}.`,
};

const legalEntity = "MEEI HUB DANIŞMANLIK TİCARET LİMİTED ŞİRKETİ, Istanbul, Türkiye";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
          <Link
            href="/"
            aria-label={`${siteConfig.organizer}, return to homepage`}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]"
          >
            {siteConfig.organizer}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="mb-3 font-heading text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
          Payment &amp; Visa Refund Disclaimer
        </h1>
        <p className="mb-8 text-sm text-[var(--text-secondary)]">
          {siteConfig.eventName} · {siteConfig.venueCity} · {siteConfig.dates}
        </p>

        <p className="mb-10 text-sm leading-relaxed text-[var(--text-secondary)]">
          By proceeding with payment for the Summit delegate package, all delegates acknowledge and
          agree to the following terms:
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-[var(--text-secondary)]">
          {/* 1. Package Fee */}
          <section>
            <h2 className="mb-3 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              1. Package Fee
            </h2>
            <p className="mb-4">
              The Summit Pass is priced at{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                {pricing.currency} {pricing.amount.replace("$", "")}
              </span>{" "}
              per delegate.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--green-bright)]">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-1.5">
                  {pricing.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--green-bright)]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--gold)]">
                  Not included
                </p>
                <ul className="flex flex-col gap-1.5">
                  {pricing.excludes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Visa Refusal Policy */}
          <section>
            <h2 className="mb-3 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              2. Visa Refusal Policy
            </h2>
            <p className="mb-3">
              MEEI Program facilitates all necessary documentation and support for the visa application
              process; however, visa issuance remains solely at the discretion of the relevant Embassy or
              Consulate, and approval cannot be guaranteed.
            </p>
            <p>
              In the event a delegate&apos;s visa application is denied, the delegate shall be entitled to a
              refund of{" "}
              <span className="font-semibold text-[var(--text-primary)]">70% of the total amount paid</span>{" "}
              toward the package. This refund reflects the deduction of administrative, processing, and
              logistics costs already incurred by MEEI Program on the delegate&apos;s behalf. The remaining{" "}
              <span className="font-semibold text-[var(--text-primary)]">30% is non-refundable</span>.
            </p>
          </section>

          {/* 3. Refund Conditions */}
          <section>
            <h2 className="mb-3 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              3. Refund Conditions
            </h2>
            <ul className="flex flex-col gap-2">
              {[
                "Refund requests must be accompanied by valid proof of visa refusal issued by the relevant Embassy or Consulate.",
                "Approved refunds will be processed within a reasonable administrative timeframe following verification.",
                "Refunds do not apply to cancellations initiated by the delegate for reasons unrelated to visa refusal.",
                "No refund is payable once travel, accommodation, or event arrangements have been finalized on the delegate's behalf.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-bright)]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Acknowledgment */}
          <section>
            <h2 className="mb-3 font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              4. Acknowledgment
            </h2>
            <p>
              All payments made toward the Summit delegate package constitute acceptance of this disclaimer
              in full. For questions regarding payments or refunds, delegates should contact MEEI Program
              directly through official channels at{" "}
              <a href={`mailto:${contactDetails.email}`} className="text-[var(--green-bright)] hover:underline">
                {contactDetails.email}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-6">
          <p className="text-xs text-[var(--text-secondary)]">
            MEEI Program — {legalEntity}
          </p>
        </div>
      </main>
    </div>
  );
}
