import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Globe2, Users, Megaphone, Handshake } from "lucide-react";
import CountryRepForm from "@/components/country-rep/CountryRepForm";
import { siteConfig, contactDetails } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Become a Country Representative | ${siteConfig.metaTitle}`,
  description: `Represent your country at the ${siteConfig.eventName}. Apply to join the MEEI Program country representative network and help build Africa–China business partnerships.`,
};

const perks = [
  {
    icon: Globe2,
    title: "Represent your country",
    text: "Be the official point of contact for the summit in your market.",
  },
  {
    icon: Users,
    title: "Grow your network",
    text: "Connect with delegates, investors, and partners across Africa and China.",
  },
  {
    icon: Megaphone,
    title: "Champion opportunities",
    text: "Promote trade, investment, and matchmaking opportunities locally.",
  },
  {
    icon: Handshake,
    title: "Recognition & access",
    text: "Gain visibility and privileged access to the MEEI Program network.",
  },
];

export default function CountryRepPage() {
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
              MEEI Program · Country Representatives
            </p>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Become a Country Representative
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
              Help bring the {siteConfig.eventName} to your country. As a country representative, you&apos;ll
              be our local ambassador — promoting the summit, connecting businesses, and opening doors to
              Africa–China trade and investment opportunities.
            </p>
          </div>
        </div>

        {/* Main content grid */}
        <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Form, left 8 columns */}
            <div className="lg:col-span-8">
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <h2 className="mb-6 font-heading text-lg font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                  Application Form
                </h2>
                <CountryRepForm />
              </div>
            </div>

            {/* Right sidebar, 4 columns */}
            <aside className="flex flex-col gap-6 lg:col-span-4">
              {/* Why become a rep */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Why Join
                </h3>
                <ul className="flex flex-col gap-4">
                  {perks.map((p) => (
                    <li key={p.title} className="flex items-start gap-3">
                      <p.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green-bright)]" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-[var(--text-primary)]">{p.title}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--text-secondary)]">{p.text}</p>
                      </div>
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
                  For questions about the country representative programme, contact the MEEI Program team directly.
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
                  Information submitted through this form is used by MEEI Program solely to review your
                  application and communicate about the summit. See our{" "}
                  <Link href="/privacy" className="text-[var(--green-bright)] hover:underline">
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
