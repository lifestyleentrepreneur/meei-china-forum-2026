import { Globe2 } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function CountryRepCtaSection() {
  return (
    <section
      className="relative py-16 lg:py-20"
      aria-labelledby="country-rep-cta-heading"
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface-secondary)] to-[var(--green-dark)]/30 p-8 sm:p-10 lg:p-12">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-bright)]">
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                Now Recruiting · Country Representatives
              </p>
              <h2
                id="country-rep-cta-heading"
                className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)] sm:text-3xl"
              >
                Represent Your Country at the Summit
              </h2>
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                We&apos;re looking for motivated ambassadors to champion the China–Africa Business &amp;
                Investment Summit in their home countries. Promote the event, connect local businesses,
                and open doors to trade and investment. Apply in a few minutes.
              </p>
            </div>
            <div className="shrink-0">
              <PrimaryButton href="/country-rep" className="min-w-[220px]">
                Apply to Represent Your Country
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
