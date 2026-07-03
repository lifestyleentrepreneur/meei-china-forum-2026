import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import { pricing } from "@/data/site-content";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 lg:py-28"
      style={{ background: "#050806" }}
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center lg:mb-14">
          <SectionEyebrow className="mb-3">Summit Pass</SectionEyebrow>
          <SectionHeading id="pricing-heading">
            One All-Inclusive{" "}
            <span className="text-[var(--green-bright)]">Delegate Pass</span>
          </SectionHeading>
        </div>

        <div
          className="overflow-hidden rounded-3xl border"
          style={{
            borderColor: "rgba(255,255,255,0.10)",
            background: "rgba(12,17,20,0.82)",
          }}
        >
          {/* Price header */}
          <div
            className="flex flex-col items-center gap-1 border-b px-8 py-10 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-baseline gap-2">
              <span
                className="font-heading font-bold text-white"
                style={{ fontSize: "clamp(2.75rem, 6vw, 4rem)" }}
              >
                {pricing.amount}
              </span>
              <span className="font-body text-lg font-semibold text-[var(--green-bright)]">
                {pricing.currency}
              </span>
            </div>
            <p className="font-body text-sm text-[#9DA89F]">{pricing.note}</p>
          </div>

          {/* Includes / excludes */}
          <div className="grid gap-8 p-8 sm:grid-cols-2 lg:p-10">
            <div>
              <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green-bright)]">
                What&apos;s included
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {pricing.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--green-bright)]"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm leading-relaxed text-[#D7DED8]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#7C8A80]">
                Not included
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {pricing.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#7C8A80]"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm leading-relaxed text-[#9DA89F]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div
            className="flex flex-col items-center gap-3 border-t px-8 py-8"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-2.5 rounded-full px-9 py-4 font-body text-base font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              style={{ background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)" }}
            >
              Book Your Place
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
