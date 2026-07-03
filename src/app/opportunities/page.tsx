import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  HandCoins,
  Factory,
  Ship,
  Users,
  Landmark,
  Compass,
  Globe,
  MapPin,
  Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { summitHighlights, siteConfig } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Summit Opportunities | ${siteConfig.metaTitle}`,
  description:
    "Explore the seven interconnected opportunity areas at the MEEI China–Africa Business & Investment Summit 2026 in Guangzhou.",
};

const ICON_MAP: Record<string, LucideIcon> = {
  investment:      HandCoins,
  manufacturing:   Factory,
  trade:           Ship,
  matchmaking:     Users,
  dialogue:        Landmark,
  factory:         Compass,
  "market-access": Globe,
};

/* Warm linen cream, main page surface */
const CREAM = "#EFE9DF";
const DARK  = "#0D1E11";

const PAD_X     = "clamp(24px, 5.5vw, 80px)";
const PAD_Y     = "clamp(40px, 7vw, 100px)";

export default function OpportunitiesPage() {
  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>

      {/* ── Top nav, dark, matches site header ── */}
      <header
        className="sticky top-0 z-40"
        style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="mx-auto flex max-w-[1440px] items-center justify-between"
          style={{ height: "64px", paddingLeft: PAD_X, paddingRight: PAD_X }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-body text-sm font-medium transition-colors duration-200 hover:text-white"
            style={{ color: "#9DA89F" }}
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to Summit
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center rounded-full font-body text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "#2ca640", padding: "9px 20px" }}
          >
            Register Now
          </Link>
        </div>
      </header>

      <main>
        {/* ── Desktop two-column editorial layout ── */}
        <div
          className="mx-auto hidden max-w-[1440px] lg:grid"
          style={{
            gridTemplateColumns: "34% 1fr",
            columnGap: "clamp(56px, 6vw, 100px)",
            alignItems: "start",
            padding: `${PAD_Y} ${PAD_X}`,
          }}
        >
          <Intro sticky />
          <OpportunityList />
        </div>

        {/* ── Mobile stacked layout ── */}
        <div
          className="mx-auto max-w-[1440px] lg:hidden"
          style={{ padding: `${PAD_Y} ${PAD_X}` }}
        >
          <Intro sticky={false} />
          <div className="mt-10">
            <OpportunityList />
          </div>
        </div>

        {/* ── Bottom register CTA, dark to close the page ── */}
        <section
          style={{ background: DARK, borderTop: "1px solid rgba(255,255,255,0.06)" }}
          aria-label="Registration call to action"
        >
          <div
            className="mx-auto max-w-[1440px]"
            style={{ padding: `clamp(48px, 6vw, 80px) ${PAD_X}` }}
          >
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p
                  className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "#47c34f" }}
                >
                  Join Us in Guangzhou
                </p>
                <h2
                  className="mb-3 font-body font-bold leading-snug"
                  style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)", color: "#F4F4EF" }}
                >
                  Ready to Attend MEEI 2026?
                </h2>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#9DA89F" }}>
                  Register your interest today and secure your place at the
                  China–Africa Business &amp; Investment Summit, 17–18 October
                  2026, Guangzhou.
                </p>
              </div>
              <Link
                href="/register"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl font-body text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "#2ca640", padding: "14px 32px" }}
              >
                Book Your Place
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ── Left introduction panel (dark card) ──────────────────── */

function Intro({ sticky }: { sticky: boolean }) {
  return (
    <aside
      className="rounded-2xl"
      style={{
        background: DARK,
        padding: "clamp(28px, 3vw, 40px)",
        ...(sticky ? { position: "sticky", top: "88px", alignSelf: "start" } : {}),
      }}
    >
      {/* Eyebrow */}
      <div className="mb-5 flex items-center gap-2.5">
        <div className="h-px w-5 rounded-full" style={{ background: "#47c34f" }} aria-hidden="true" />
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "#47c34f" }}
        >
          Summit Opportunities
        </p>
      </div>

      {/* Heading */}
      <h1
        className="mb-5 font-body font-bold leading-[1.08]"
        style={{ fontSize: "clamp(1.7rem, 2.4vw, 2.8rem)", color: "#F4F4EF" }}
      >
        Seven Focus Areas.{" "}
        <span style={{ color: "#47c34f" }}>One Mission.</span>
      </h1>

      {/* Description */}
      <p
        className="mb-7 font-body leading-[1.72]"
        style={{ fontSize: "14px", color: "#9DA89F" }}
      >
        The summit is structured around seven interconnected opportunity areas
        delivering practical, actionable value, from cross-border investment
        and manufacturing to trade, matchmaking, and government dialogue.
      </p>

      {/* Stat pill */}
      <div
        className="mb-7 inline-flex items-baseline gap-2 rounded-full font-body text-[12px] font-medium"
        style={{
          background: "rgba(71,195,79,0.1)",
          color: "#9DA89F",
          border: "1px solid rgba(71,195,79,0.18)",
          padding: "7px 14px",
        }}
      >
        <span className="text-xl font-bold leading-none" style={{ color: "#47c34f" }}>7</span>
        interconnected opportunity areas
      </div>

      {/* Divider */}
      <div className="mb-7 h-px" style={{ background: "rgba(255,255,255,0.07)" }} aria-hidden="true" />

      {/* Register CTA */}
      <Link
        href="/register"
        className="group mb-3 flex w-full items-center justify-center gap-2 rounded-xl font-body text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{ background: "#2ca640", padding: "13px 24px" }}
      >
        Apply to Attend
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>

      {/* Event details card */}
      <div
        className="rounded-xl"
        style={{
          background: "#0B1710",
          border: "1px solid rgba(53,194,74,0.14)",
          padding: "16px 18px",
        }}
      >
        <div className="mb-2.5 flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: "#47c34f" }} aria-hidden="true" />
          <p
            className="font-body text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#47c34f" }}
          >
            17–18 October 2026
          </p>
        </div>
        <p className="mb-1 font-body text-sm font-semibold" style={{ color: "#E8EDE9" }}>
          Vienna International Hotel
        </p>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 shrink-0" style={{ color: "#9DA89F" }} aria-hidden="true" />
          <p className="font-body text-xs" style={{ color: "#9DA89F" }}>Guangzhou, China</p>
        </div>
      </div>
    </aside>
  );
}

/* ── Opportunity list (right column) ──────────────────────── */

function OpportunityList() {
  return (
    <ol
      aria-label="Summit opportunity areas"
      className="border-t"
      style={{ borderColor: "rgba(10,30,15,0.16)" }}
    >
      {summitHighlights.map(({ id, title, description, tagline }, index) => {
        const Icon = ICON_MAP[id];
        const num = String(index + 1).padStart(2, "0");

        return (
          <li key={id} className="group border-b" style={{ borderColor: "rgba(10,30,15,0.16)" }}>
            <Link
              href={`/opportunities/${id}`}
              className="flex items-start gap-4 py-6 outline-none transition-colors duration-200 hover:bg-[#D8EDDB] lg:gap-8 lg:py-12 focus-visible:bg-[#D8EDDB]"
              style={{ borderRadius: "2px" }}
            >
              {/* Index number */}
              <span
                className="mt-1.5 w-7 shrink-0 font-body text-[11px] font-semibold tracking-[0.2em] transition-colors duration-200 group-hover:text-[#2ca640]"
                style={{ color: "#BDB0A0" }}
                aria-hidden="true"
              >
                {num}
              </span>

              {/* Content */}
              <div className="flex flex-1 items-start justify-between gap-6 lg:gap-10">
                <div className="flex-1">

                  {/* Icon + Title */}
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-200"
                      style={{ background: "rgba(13,30,17,0.07)" }}
                      aria-hidden="true"
                    >
                      {Icon && (
                        <Icon
                          className="h-[17px] w-[17px]"
                          style={{ color: "#1FA447" }}
                          strokeWidth={1.6}
                        />
                      )}
                    </div>
                    <h2
                      className="font-body font-bold leading-snug"
                      style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)", color: "#0D1E11" }}
                    >
                      {title}
                    </h2>
                  </div>

                  {/* Tagline */}
                  {tagline && (
                    <p
                      className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "#1FA447" }}
                    >
                      {tagline}
                    </p>
                  )}

                  {/* Description */}
                  <p
                    className="font-body leading-[1.65]"
                    style={{ fontSize: "14.5px", color: "#4A5448", maxWidth: "520px" }}
                  >
                    {description}
                  </p>

                  {/* Explore link */}
                  <div
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: "#1FA447" }}
                  >
                    Explore this area
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Desktop hover arrow */}
                <div
                  className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full opacity-0 transition-all duration-200 group-hover:opacity-100 lg:flex"
                  style={{ background: "rgba(31,164,71,0.1)" }}
                  aria-hidden="true"
                >
                  <ArrowRight className="h-3.5 w-3.5" style={{ color: "#1FA447" }} />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
