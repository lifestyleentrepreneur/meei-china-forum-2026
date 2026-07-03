"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { siteConfig } from "@/data/site-content";

export default function HeroSection() {
  // "17–20 October 2026" → days: "17–20", month: "October", year: "2026"
  const [dateDays, dateMonth = "", dateYear = ""] = siteConfig.dates.split(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#020705]"
      aria-label="China–Africa Business & Investment Summit 2026, hero"
    >
      {/* ── Full-bleed background image (China–Africa scene) ── */}
      <Image
        src="/images/hero-china-africa.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />

      {/* ── Light veil: keeps the photo bright while lifting black text ── */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.42) 45%, rgba(255,255,255,0.55) 78%, rgba(255,255,255,0.2) 90%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* ── Bottom fade into the dark Summit Agenda section ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,8,6,0) 0%, rgba(5,8,6,0.55) 55%, #050806 100%)",
        }}
      />

      {/* ── All content: centered, ~2/3 width ── */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-28 text-center lg:w-2/3">

            {/* Banner title */}
            <h1
              className="mb-12 uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              <span
                className="mb-5 block font-bold leading-[0.92] tracking-[0.02em]"
                style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
              >
                <span style={{ color: "#AE301E" }}>China</span>
                <span className="text-black">&nbsp;–&nbsp;</span>
                <span style={{ color: "#26461A" }}>Africa</span>
              </span>
              <span
                className="block font-semibold tracking-[0.06em] text-black"
                style={{ fontSize: "clamp(1.5rem, 3.6vw, 3.2rem)" }}
              >
                Business &amp; Investment Summit
              </span>
            </h1>

            {/* Calendar + Venue on a white card */}
            <div className="mb-14 w-full max-w-3xl">
              <div className="mx-auto flex flex-col items-center gap-5 rounded-full bg-white px-9 py-5 shadow-2xl sm:flex-row sm:items-center sm:justify-center sm:gap-8">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 shrink-0 flex-col overflow-hidden rounded-lg border border-neutral-200">
                    <div className="h-3 w-full" style={{ background: "#AE301E" }} />
                    <div className="flex flex-1 items-center justify-center bg-white">
                      <Calendar className="h-5 w-5 text-neutral-800" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="whitespace-nowrap font-bold leading-none text-neutral-900"
                      style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(1.9rem, 3vw, 2.7rem)" }}
                    >
                      {dateDays}
                    </span>
                    <span
                      className="flex flex-col text-left uppercase leading-tight"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      <span className="font-semibold tracking-[0.08em] text-neutral-800" style={{ fontSize: "0.95rem" }}>
                        {dateMonth}
                      </span>
                      <span className="tracking-[0.14em] text-neutral-500" style={{ fontSize: "0.85rem" }}>
                        {dateYear}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="hidden h-12 w-px shrink-0 sm:block"
                  style={{ background: "rgba(0,0,0,0.12)" }}
                  aria-hidden="true"
                />

                {/* Venue */}
                <div className="flex items-center gap-3 text-left">
                  <MapPin
                    className="h-6 w-6 shrink-0"
                    style={{ color: "#AE301E" }}
                    aria-hidden="true"
                  />
                  <div className="leading-snug">
                    <p className="font-semibold text-neutral-900" style={{ fontSize: "0.98rem" }}>
                      {siteConfig.venue}
                    </p>
                    <p className="font-body text-neutral-500" style={{ fontSize: "0.82rem" }}>
                      {siteConfig.venueAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme */}
            <div className="mb-12 max-w-3xl">
              <p
                className="mb-2 font-semibold uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}
              >
                <span style={{ color: "#26461A" }}>Theme:&nbsp;</span>
                <span className="text-black">{siteConfig.theme}</span>
              </p>
              <p
                className="font-body leading-relaxed text-black/80"
                style={{ fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)" }}
              >
                {siteConfig.themeDescription}
              </p>
            </div>

            {/* ── CTA ── */}
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-10 py-5 text-lg font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                style={{
                  background:
                    "linear-gradient(135deg, #078442 0%, #00A85A 100%)",
                  boxShadow: "0 10px 40px rgba(7,132,66,0.45)",
                }}
              >
                Join the Summit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <p className="font-body text-xs font-medium text-black/70">
                Registration closes {siteConfig.registrationCloses}.
              </p>
            </div>

            {/* ── Countdown ── */}
            <div className="mt-10">
              <CountdownTimer variant="dark" />
            </div>

        </div>
      </div>

    </section>
  );
}
