import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Building2, ArrowLeft, Mail, Phone } from "lucide-react";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { siteConfig, contactDetails, pricing } from "@/data/site-content";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: `Register | ${siteConfig.metaTitle}`,
  description: `Register your interest for the ${siteConfig.eventName}, ${siteConfig.dates}, ${siteConfig.venue}, Guangzhou, China.`,
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header bar */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
          <Link
            href="/"
            aria-label={`${siteConfig.organizer}, return to homepage`}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] focus-visible:rounded"
          >
            {siteConfig.organizer}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] focus-visible:rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </header>

      <main id="main-content">
        {/* Page header */}
        <div className="border-b border-[var(--border)] bg-[var(--surface)] py-12">
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
            <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-bright)]">
              MEEI Program · Registration
            </p>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Register Your Interest
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {siteConfig.eventName}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-[var(--green-primary)]" aria-hidden="true" />
                {siteConfig.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[var(--green-primary)]" aria-hidden="true" />
                {siteConfig.venue}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--green-primary)]" aria-hidden="true" />
                Guangzhou, Guangdong, China
              </span>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Form, left 8 columns */}
            <div className="lg:col-span-8">
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <h2 className="mb-6 font-heading text-lg font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                  Registration Form
                </h2>
                <Suspense fallback={
                  <div className="flex items-center justify-center py-20 text-[var(--text-secondary)]">
                    Loading form…
                  </div>
                }>
                  <RegistrationForm />
                </Suspense>
              </div>
            </div>

            {/* Right sidebar, 4 columns */}
            <aside className="flex flex-col gap-6 lg:col-span-4">
              {/* Delegate pass summary */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="mb-1 font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Delegate Pass
                </h3>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                    {pricing.amount}
                  </span>
                  <span className="text-xs font-semibold text-[var(--green-bright)]">
                    {pricing.currency}
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)]">{pricing.note}</span>
                </div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--green-bright)]">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-1.5">
                  {pricing.includes.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-[var(--green-bright)]" aria-hidden="true" />
                      <span className="text-[11px] leading-relaxed text-[var(--text-secondary)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact fallback */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Need Help?
                </h3>
                <p className="mb-4 text-xs text-[var(--text-secondary)]">
                  For registration assistance, please contact the MEEI Program team directly.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--green-bright)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] focus-visible:rounded"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--green-primary)]" aria-hidden="true" />
                    {contactDetails.email}
                  </a>
                  {contactDetails.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:${phone.number}`}
                      className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--green-bright)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] focus-visible:rounded"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--green-primary)]" aria-hidden="true" />
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>

              {/* Privacy note */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--background-elevated)] p-4">
                <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                  Information submitted through this form is used by MEEI Program solely for summit registration and communication purposes. See our{" "}
                  <Link
                    href="/privacy"
                    className="text-[var(--green-bright)] hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
