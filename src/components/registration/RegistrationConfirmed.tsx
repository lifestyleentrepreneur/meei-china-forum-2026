import { CheckCircle2, MessageCircle } from "lucide-react";
import { paymentConfig } from "@/data/site-content";
import { registrationCopy, type Locale } from "@/components/registration/registration-copy";

// Final step for the no-payment flows: already-in-China registration, and
// the next-edition waitlist.
export default function RegistrationConfirmed({
  name,
  locale = "en",
  waitlist = false,
}: {
  name: string;
  locale?: Locale;
  waitlist?: boolean;
}) {
  const copy = registrationCopy[locale];
  const t = waitlist ? copy.waitlistConfirmed : copy.confirmed;
  const firstName = name.split(" ")[0];
  const waMessage = t.whatsappMessage(name);

  return (
    <div
      className="rounded-sm border border-[var(--green-primary)] bg-[var(--green-dark)]/20 p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[var(--green-bright)]" aria-hidden="true" />
      <h2 className="font-heading text-xl font-semibold uppercase tracking-wide text-[var(--text-primary)]">
        {t.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
        {t.body(firstName)}
      </p>

      <div className="mt-6 border-t border-[var(--border)] pt-5">
        <p className="mb-3 text-sm text-[var(--text-secondary)]">{t.whatsappPrompt}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {paymentConfig.whatsapp.map((w) => (
            <a
              key={w.number}
              href={`https://wa.me/${w.number}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {w.display}
            </a>
          ))}
        </div>
      </div>

      <a href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--green-bright)] hover:underline">
        {t.home}
      </a>
    </div>
  );
}
