"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { siteConfig } from "@/data/site-content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.65,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

export default function HeroSection() {
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

      {/* ── Dark scrim so the banner text stays readable over the photo ── */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,7,5,0.62) 0%, rgba(2,7,5,0.5) 40%, rgba(1,4,2,0.86) 100%)",
        }}
      />

      {/* ── Center radial to lift the headline off the bright sky ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at center, rgba(1,4,2,0.45) 0%, transparent 62%, rgba(1,4,2,0.5) 100%)",
        }}
      />

      {/* ── All content: centered, ~2/3 width ── */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-28 text-center lg:w-2/3">

            {/* Organizer eyebrow */}
            <motion.p
              {...fadeUp(0.08)}
              className="mb-4 font-semibold uppercase tracking-[0.34em] text-white/70"
              style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}
            >
              MEEI Program Presents
            </motion.p>

            {/* Banner title */}
            <motion.h1
              {...fadeUp(0.14)}
              className="mb-3 uppercase leading-[0.95]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              <span
                className="block font-bold tracking-[0.02em]"
                style={{ color: "#C8102E", fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                China&nbsp;–&nbsp;Africa
              </span>
              <span
                className="block font-semibold text-white tracking-[0.06em]"
                style={{ fontSize: "clamp(1.35rem, 3.2vw, 2.9rem)" }}
              >
                Business &amp; Investment Summit{" "}
                <span style={{ color: "#2FD07A" }}>2026</span>
              </span>
            </motion.h1>

            {/* Theme */}
            <motion.div {...fadeUp(0.22)} className="mb-6 max-w-2xl">
              <p
                className="mb-1 font-semibold uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(1rem, 1.8vw, 1.35rem)" }}
              >
                <span style={{ color: "#D2A74F" }}>Theme:&nbsp;</span>
                <span className="text-white">{siteConfig.theme}</span>
              </p>
              <p
                className="font-body leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
              >
                {siteConfig.themeDescription}
              </p>
            </motion.div>

            {/* Venue + date */}
            <motion.div
              {...fadeUp(0.28)}
              className="mb-9 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center sm:gap-5"
            >
              <div className="flex items-center gap-2">
                <CalendarDays
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#D2A74F" }}
                  aria-hidden="true"
                />
                <span
                  className="font-semibold uppercase tracking-[0.08em] text-white"
                  style={{ fontFamily: "var(--font-oswald)", fontSize: "0.95rem" }}
                >
                  {siteConfig.dates}
                </span>
              </div>
              <div
                className="hidden h-4 w-px shrink-0 sm:block"
                style={{ background: "rgba(255,255,255,0.25)" }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                <MapPin
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#D2A74F" }}
                  aria-hidden="true"
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {siteConfig.venue}, {siteConfig.venueCity}
                </span>
              </div>
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
              {...fadeUp(0.36)}
              className="flex flex-col items-center gap-4"
            >
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
              <div className="flex flex-col items-center gap-1">
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Secure your spot today.
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "#D2A74F" }}
                >
                  Registration closes {siteConfig.registrationCloses}.
                </p>
              </div>
            </motion.div>

            {/* ── Countdown ── */}
            <motion.div {...fadeUp(0.44)} className="mt-10">
              <CountdownTimer />
            </motion.div>

        </div>
      </div>

      {/* Bottom border */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
