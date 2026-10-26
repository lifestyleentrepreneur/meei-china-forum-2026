import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";

// 2027 pricing is not confirmed yet; the 2026 pass stays on /register.
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
            2027{" "}
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
            className="flex flex-col items-center gap-2 border-b px-8 py-10 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <span
              className="font-heading font-bold uppercase text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              To Be Announced
            </span>
            <p className="font-body text-sm text-[#9DA89F]">Pricing for the April 2027 summit</p>
          </div>

          {/* Details */}
          <div className="px-8 py-8 text-center lg:px-10">
            <p className="mx-auto max-w-xl font-body text-sm leading-relaxed text-[#D7DED8]">
              Pricing and package details will be announced soon. Join the
              waitlist and we will email you as soon as they are confirmed —
              there is nothing to pay now.
            </p>
          </div>

          {/* CTA */}
          <div
            className="flex flex-col items-center gap-3 border-t px-8 py-8"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Link
              href="/waitlist"
              className="group inline-flex items-center gap-2.5 rounded-full px-9 py-4 font-body text-base font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              style={{ background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)" }}
            >
              Join the Waitlist
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
