import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Building2, ArrowLeft, Mail, Phone, BadgeCheck, Languages } from "lucide-react";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { registrationCopy, locales, type Locale } from "@/components/registration/registration-copy";
import { siteConfig, contactDetails } from "@/data/site-content";

// Unlisted page shared directly with selected participants already in China,
// served in English, French, and Chinese (/register/in-china[/fr|/zh]).
export function inChinaMetadata(locale: Locale): Metadata {
  const t = registrationCopy[locale].page;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default function InChinaRegistrationPage({ locale }: { locale: Locale }) {
  const t = registrationCopy[locale].page;
  const htmlLang = locales.find((l) => l.code === locale)?.htmlLang;

  return (
    <div lang={htmlLang} className="min-h-screen bg-[var(--background)]">
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
            {t.backHome}
          </Link>
        </div>
      </header>

      <main id="main-content">
        {/* Page header */}
        <div className="border-b border-[var(--border)] bg-[var(--surface)] py-12">
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Language switcher */}
            <nav aria-label={t.languageLabel} className="mb-6 flex flex-wrap items-center gap-2">
              <Languages className="h-4 w-4 text-[var(--text-secondary)]" aria-hidden="true" />
              {locales.map((l) => {
                const active = l.code === locale;
                return (
                  <Link
                    key={l.code}
                    href={l.path}
                    lang={l.htmlLang}
                    hrefLang={l.htmlLang}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] ${
                      active
                        ? "border-[var(--green-bright)] bg-[var(--green-dark)]/30 text-[var(--text-primary)]"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--green-bright)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-bright)]">
              {t.eyebrow}
            </p>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {t.heading}
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {t.eventName}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-[var(--green-primary)]" aria-hidden="true" />
                {t.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[var(--green-primary)]" aria-hidden="true" />
                {t.venue}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--green-primary)]" aria-hidden="true" />
                {t.location}
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
                  {t.formHeading}
                </h2>
                <RegistrationForm variant="in-china" locale={locale} />
              </div>
            </div>

            {/* Right sidebar, 4 columns */}
            <aside className="flex flex-col gap-6 lg:col-span-4">
              {/* No payment notice */}
              <div className="rounded-sm border border-[var(--green-primary)] bg-[var(--green-dark)]/20 p-5">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--green-bright)]" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                      {t.noPaymentTitle}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {t.noPaymentBody}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact fallback */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  {t.helpTitle}
                </h3>
                <p className="mb-4 text-xs text-[var(--text-secondary)]">
                  {t.helpBody}
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
                  {t.privacyBefore}
                  <Link
                    href="/privacy"
                    className="text-[var(--green-bright)] hover:underline"
                  >
                    {t.privacyLink}
                  </Link>
                  {t.privacyAfter}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
