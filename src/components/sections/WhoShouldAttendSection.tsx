"use client";

import Link from "next/link";
import { attendeeTypes } from "@/data/site-content";

// Icons8 iOS Line CDN, black PNGs filtered to deep green
const ICONS8: Record<string, string> = {
  investors:     "money-bag",
  entrepreneurs: "idea",
  manufacturers: "factory",
  trade:         "cargo-ship",
  government:    "parliament",
  agencies:      "handshake",
  associations:  "conference",
  corporate:     "businessman",
  industrial:    "engineering",
  services:      "scales",
};

// CSS filter: black PNG → #064E3B (deep forest green)
const TO_DEEP_GREEN =
  "brightness(0) saturate(100%) invert(18%) sepia(55%) saturate(900%) hue-rotate(130deg) brightness(95%) contrast(95%)";

function icons8Url(slug: string, size = 96) {
  return `https://img.icons8.com/ios/${size}/${slug}.png`;
}

const DEEP_GREEN = "#064E3B";
const CARD_SHADOW = "0 8px 28px rgba(15,45,35,0.07)";
const CARD_BORDER = "rgba(10,80,55,0.10)";
const ICON_BG = "#EAF1EA";

export default function WhoShouldAttendSection() {
  return (
    <section
      id="who-attends"
      className="relative overflow-hidden py-14 lg:py-32"
      style={{ background: "#FBFAF6" }}
      aria-labelledby="who-attends-heading"
    >
      {/* ── Decorative: top-left partial circles ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -top-28 opacity-[0.06]"
        width="460"
        height="460"
        viewBox="0 0 460 460"
        fill="none"
      >
        <circle cx="160" cy="160" r="155" stroke={DEEP_GREEN} strokeWidth="2" />
        <circle cx="125" cy="195" r="110" stroke={DEEP_GREEN} strokeWidth="1.5" />
        <circle cx="95"  cy="222" r="72"  stroke={DEEP_GREEN} strokeWidth="1" />
      </svg>

      {/* ── Decorative: top-right dotted pattern clipped to circle ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 opacity-[0.055]"
        width="380"
        height="380"
        viewBox="0 0 380 380"
      >
        <defs>
          <clipPath id="wsa-dot-clip">
            <circle cx="190" cy="190" r="185" />
          </clipPath>
        </defs>
        <g clipPath="url(#wsa-dot-clip)">
          {Array.from({ length: 19 }, (_, row) =>
            Array.from({ length: 19 }, (_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 20 + 10}
                cy={row * 20 + 10}
                r="2.8"
                fill={DEEP_GREEN}
              />
            ))
          )}
        </g>
      </svg>

      {/* ── Section content ── */}
      <div className="relative z-10 mx-auto max-w-[1560px] px-6 lg:px-16 xl:px-20">

        {/* Heading block */}
        <div className="mb-8 flex flex-col items-center text-center lg:mb-16">
          <h2
            id="who-attends-heading"
            className="mb-6 font-semibold leading-[1.08]"
            style={{
              fontFamily: 'var(--font-lora, Georgia, "Times New Roman", serif)',
              fontSize: "clamp(2.5rem, 5vw, 4.75rem)",
              color: "#0B1B24",
              letterSpacing: "-0.02em",
            }}
          >
            Who Should Attend
          </h2>
          <p
            className="max-w-[740px] font-body leading-[1.7]"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", color: "#59616C" }}
          >
            The China–Africa Business &amp; Investment Summit unites a diverse
            community of leaders and professionals to connect, collaborate, and
            drive lasting impact.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
          {attendeeTypes.map((type) => {
            return (
              <article
                key={type.id}
                className="group flex flex-col items-center px-3 pb-5 pt-5 text-center sm:px-6 sm:pb-7 sm:pt-8"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "14px",
                  boxShadow: CARD_SHADOW,
                  transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 18px 44px rgba(15,45,35,0.13)";
                  el.style.borderColor = "rgba(6,78,59,0.22)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.boxShadow = CARD_SHADOW;
                  el.style.borderColor = CARD_BORDER;
                }}
              >
                {/* Icons8 Fluency icon in pale-green circle */}
                <div
                  className="mb-3 flex items-center justify-center rounded-full sm:mb-5"
                  style={{ width: "64px", height: "64px", background: ICON_BG }}
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icons8Url(ICONS8[type.id] ?? "briefcase", 96)}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                    style={{ filter: TO_DEEP_GREEN }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[11.5px] sm:tracking-[0.13em]"
                  style={{ color: "#0B1B24" }}
                >
                  {type.title}
                </h3>

                {/* Description */}
                <p
                  className="flex-1 font-body text-[12px] leading-[1.6] sm:text-[13.5px] sm:leading-[1.65]"
                  style={{ color: "#59616C" }}
                >
                  {type.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-3 rounded-full sm:mt-6"
                  style={{ width: "32px", height: "2px", background: DEEP_GREEN }}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* ── Subtle CTA ── */}
        <div className="mt-10 flex justify-center lg:mt-14">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full border px-7 py-3 font-body text-sm font-semibold transition-all duration-200 hover:bg-[#064E3B] hover:text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064E3B]"
            style={{ borderColor: "rgba(6,78,59,0.3)", color: DEEP_GREEN }}
          >
            Book Your Place
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>

      {/* ── Decorative: bottom layered waves ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: "170px" }}
      >
        <svg
          viewBox="0 0 1440 170"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* Layer 1: palest */}
          <path
            d="M0,90 C280,130 560,38 840,78 C1080,110 1280,28 1440,68 L1440,170 L0,170 Z"
            fill="rgba(6,78,59,0.07)"
          />
          {/* Layer 2: medium */}
          <path
            d="M0,108 C320,68 660,148 960,104 C1140,74 1320,118 1440,90 L1440,170 L0,170 Z"
            fill="rgba(6,78,59,0.16)"
          />
          {/* Layer 3: solid dark */}
          <path
            d="M0,132 C380,102 760,158 1100,122 C1280,108 1390,140 1440,132 L1440,170 L0,170 Z"
            fill={DEEP_GREEN}
          />
        </svg>
      </div>
    </section>
  );
}
