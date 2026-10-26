import Link from "next/link";
import { MapPin, ArrowRight, CalendarDays, Check } from "lucide-react";
import { nextSummit } from "@/data/site-content";

// The 2027 programme and venue are not confirmed yet: show the dates and what
// the last edition included until they are announced.
const lastEditionHighlights = [
  "A full day at the Canton Fair",
  "The flagship Summit day: keynote, high-level panels and curated B2B matchmaking",
  "A guided Guangzhou city tour and factory visit",
];

export default function ProgrammeSection() {
  return (
    <section
      id="agenda"
      className="relative bg-[#050806]"
      aria-labelledby="programme-heading"
    >
      <div className="mx-auto max-w-8xl px-4 pt-20 pb-40 sm:px-6 lg:pt-28 lg:pb-44 lg:px-8 xl:px-12">

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 xl:gap-20">

          {/* ── LEFT: header + agenda card ── */}
          <div className="lg:col-span-3">

            {/* ── Header block ── */}
            <div className="mb-9">

              {/* Main heading */}
              <h2
                id="programme-heading"
                className="mb-5 font-body font-semibold leading-[1.05] text-[#F4F4EF]"
                style={{
                  fontSize: "clamp(3rem, 5vw, 4.25rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Summit{" "}
                <span style={{ color: "var(--green-bright)" }}>Agenda</span>
              </h2>

              {/* Description */}
              <p
                className="max-w-[640px] font-body leading-[1.55] text-[#9DA89F] lg:text-[17px]"
              >
                The programme for the April 2027 summit will be announced soon.
                Join the waitlist to receive it as soon as it is confirmed.
              </p>
            </div>

            {/* ── Agenda card ── */}
            <div
              className="overflow-hidden rounded-[20px]"
              style={{
                background: "rgba(12,17,20,0.82)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
              }}
            >
              {/* Dates + status */}
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-6 py-5 lg:px-8"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span className="flex items-center gap-2 font-body text-[15px] font-bold text-[#F4F4EF]">
                  <CalendarDays className="h-4 w-4 text-[var(--green-bright)]" aria-hidden="true" />
                  {nextSummit.dates}
                </span>
                <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.14em] text-[#1C2E20]">
                  Programme to be announced
                </span>
              </div>

              {/* Last edition */}
              <div className="px-6 py-6 lg:px-8">
                <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9DA89F]">
                  The October 2026 edition included
                </p>
                <ul className="flex flex-col gap-3" role="list">
                  {lastEditionHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green-bright)]"
                        aria-hidden="true"
                      />
                      <span className="font-body text-[15px] leading-snug text-[#F4F4EF]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Waitlist + last programme */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/waitlist"
                className="group inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-body text-sm font-semibold text-[#F4F4EF] transition-all duration-200 hover:bg-white/5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green-bright)]"
                style={{ borderColor: "rgba(53,194,74,0.32)" }}
              >
                Join the Waitlist
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/programme"
                className="font-body text-sm text-[#9DA89F] transition-colors hover:text-[#F4F4EF]"
              >
                See the 2026 programme
              </Link>
            </div>
          </div>

          {/* ── RIGHT: venue panel ── */}
          <div
            className="rounded-2xl p-8 lg:col-span-2 lg:self-start lg:p-10"
            style={{
              background: "#F7F3EC",
              border: "1px solid rgba(28,46,32,0.10)",
            }}
          >
            <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--green-primary)]">
              Venue
            </p>

            <p className="mb-1 font-body text-sm font-bold" style={{ color: "#1C2E20" }}>
              To be announced
            </p>
            <p
              className="mb-4 flex items-start gap-1.5 text-[11px] leading-relaxed"
              style={{ color: "#4A5E4F" }}
            >
              <MapPin
                className="mt-0.5 h-3 w-3 shrink-0"
                style={{ color: "var(--green-primary)" }}
                aria-hidden="true"
              />
              {nextSummit.city}
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5E4F" }}>
              The venue will be confirmed soon. Everyone on the waitlist will
              hear first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
