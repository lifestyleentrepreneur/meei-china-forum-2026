"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import ParticleField from "@/components/ui/ParticleField";
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
      {/* ── Top-to-bottom black base with a subtle green in the middle ── */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, #010402 0%, #051A0F 52%, #020806 100%)",
        }}
      />

      {/* ── Animated white starfield ── */}
      <ParticleField />

      {/* ── Vignette to deepen the edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(1,4,2,0.6) 100%)",
        }}
      />

      {/* ── All content: centered, ~2/3 width ── */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-28 text-center lg:w-2/3">

            {/* Main heading */}
            <motion.h1
              {...fadeUp(0.12)}
              className="mb-7 font-bold leading-[1.06] text-white"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontFamily: "var(--font-lora)" }}
            >
              China–Africa Business &amp;{" "}
              <span style={{ color: "#2FD07A" }}>Investment Summit</span> 2026
            </motion.h1>

            {/* Venue + date */}
            <motion.div
              {...fadeUp(0.2)}
              className="mb-7 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center sm:gap-5"
            >
              <div className="flex items-center gap-2">
                <MapPin
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#D2A74F" }}
                  aria-hidden="true"
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
                  {siteConfig.venue}, {siteConfig.venueCity}
                </span>
              </div>
              <div
                className="hidden h-4 w-px shrink-0 sm:block"
                style={{ background: "rgba(255,255,255,0.18)" }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                <CalendarDays
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#D2A74F" }}
                  aria-hidden="true"
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
                  {siteConfig.dates}
                </span>
              </div>
            </motion.div>

            {/* Sub headline */}
            <motion.p
              {...fadeUp(0.28)}
              className="mb-9 max-w-2xl font-body leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
            >
              Join global leaders, entrepreneurs, innovators, and investors
              shaping the future of business and international cooperation
              between China and Africa.
            </motion.p>

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
