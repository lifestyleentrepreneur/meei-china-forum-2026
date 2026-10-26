import { Phone, Mail, Globe, MapPin, QrCode } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactDetails, nextSummit } from "@/data/site-content";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-12">
          <SectionEyebrow className="mb-3">Get in Touch</SectionEyebrow>
          <SectionHeading id="contact-heading">
            Contact the{" "}
            <span className="text-[var(--green-bright)]">Organizers</span>
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Email */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[var(--green-bright)]" aria-hidden="true" />
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Email
                  </span>
                </div>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="break-all text-sm font-medium text-[var(--text-primary)] hover:text-[var(--green-bright)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] focus-visible:rounded"
                >
                  {contactDetails.email}
                </a>
              </div>

              {/* Website */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[var(--green-bright)]" aria-hidden="true" />
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Website
                  </span>
                </div>
                <a
                  href={contactDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--green-bright)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] focus-visible:rounded"
                >
                  {contactDetails.websiteDisplay}
                </a>
              </div>

              {/* Phone numbers */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5 sm:col-span-2">
                <div className="mb-3 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[var(--green-bright)]" aria-hidden="true" />
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Phone
                  </span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                  {contactDetails.phones.map((phone) => (
                    <div key={phone.number}>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                        {phone.label}
                      </p>
                      <a
                        href={`tel:${phone.number}`}
                        className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--green-bright)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] focus-visible:rounded"
                      >
                        {phone.display}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue */}
              <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5 sm:col-span-2">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--green-bright)]" aria-hidden="true" />
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Venue
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {nextSummit.venue}
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {nextSummit.city}
                </p>
              </div>
            </div>
          </div>

          {/* QR code placeholder */}
          <div className="flex flex-col items-center justify-center rounded-sm border border-[var(--border)] bg-[var(--surface)] p-8">
            <div
              className="mb-4 flex h-32 w-32 items-center justify-center rounded-sm border border-[var(--border)] bg-[var(--background-elevated)]"
              role="img"
              aria-label="Registration QR code, to be added"
            >
              <QrCode className="h-12 w-12 text-[var(--text-secondary)]" aria-hidden="true" />
            </div>
            <p className="text-center font-body text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Registration QR Code
            </p>
            <p className="mt-1 text-center text-[11px] text-[var(--text-secondary)]">
              QR code will be available when registration opens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
