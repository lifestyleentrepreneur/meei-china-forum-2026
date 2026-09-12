import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { agendaDays, siteConfig } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Full Programme | ${siteConfig.siteName}`,
  description: `The complete five-day programme for the ${siteConfig.eventName}.`,
};

export default function ProgrammePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-[#050806]">
        <div className="mx-auto max-w-5xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14">
            <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--green-bright)]">
              Programme
            </p>
            <h1
              className="mb-5 font-body font-semibold leading-[1.05] text-[#F4F4EF]"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Full{" "}
              <span style={{ color: "var(--green-bright)" }}>Programme</span>
            </h1>
            <p className="mb-6 max-w-[640px] font-body leading-[1.55] text-[#9DA89F] lg:text-[17px]">
              Five days in Guangzhou alongside the Canton Fair: arrival and
              welcome dinner, a full day at the Fair, the flagship Summit, a
              guided city and factory visit, and departure.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <Calendar
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--green-bright)" }}
                  aria-hidden="true"
                />
                <span className="font-body text-sm text-[#9DA89F]">
                  {siteConfig.dates}
                </span>
              </div>
              <div className="hidden h-3.5 w-px bg-white/15 sm:block" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <MapPin
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--green-bright)" }}
                  aria-hidden="true"
                />
                <span className="font-body text-sm text-[#9DA89F]">
                  {siteConfig.venue}, {siteConfig.venueCity}
                </span>
              </div>
            </div>
          </div>

          {/* Days */}
          <div className="flex flex-col gap-8">
            {agendaDays.map((day) => (
              <div
                key={day.id}
                className="overflow-hidden rounded-[20px]"
                style={{
                  background: "rgba(12,17,20,0.82)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                {/* Day header */}
                <div
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b px-6 py-5 lg:px-8"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="font-body text-lg font-bold text-[#F4F4EF]"
                  >
                    {day.label}
                  </span>
                  <span className="font-body text-lg font-semibold text-[#F4F4EF]">
                    {day.theme}
                  </span>
                  {day.flagship && (
                    <span className="self-center rounded-full bg-[var(--gold)] px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.14em] text-[#1C2E20]">
                      Flagship
                    </span>
                  )}
                  <span
                    className="font-body text-sm font-semibold"
                    style={{ color: "var(--green-bright)" }}
                  >
                    {day.weekday} · {day.date} 2026
                  </span>
                </div>

                {/* Sessions */}
                <div className="px-6 py-2 lg:px-8">
                  {day.sessions.map((session, i) => (
                    <div key={`${day.id}-${i}`}>
                      <div
                        className="grid items-start py-5"
                        style={{
                          gridTemplateColumns: "28px 72px minmax(0,1fr)",
                          gap: "0 16px",
                        }}
                      >
                        <div className="flex justify-center pt-[3px]" aria-hidden="true">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={
                              i === 0
                                ? {
                                    background: "var(--green-bright)",
                                    boxShadow: "0 0 10px rgba(71,195,79,0.35)",
                                  }
                                : {
                                    background: "transparent",
                                    border: "2px solid var(--green-bright)",
                                  }
                            }
                          />
                        </div>
                        <span
                          className="font-body text-sm font-semibold leading-none tracking-[0.02em]"
                          style={{ color: "var(--green-bright)" }}
                        >
                          {session.time}
                        </span>
                        <div>
                          <p className="font-body text-[15px] font-semibold leading-snug text-[#F4F4EF]">
                            {session.title}
                            {session.tag && (
                              <span className="ml-2 inline-block rounded-full border border-[var(--green-bright)] px-2 py-px align-middle text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--green-bright)]">
                                {session.tag}
                              </span>
                            )}
                          </p>
                          {session.description && (
                            <p className="mt-1.5 font-body text-[13px] leading-relaxed text-[#9DA89F]">
                              {session.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {i < day.sessions.length - 1 && (
                        <div
                          className="ml-[132px]"
                          style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-base font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              style={{ background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)" }}
            >
              Join the Summit
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/#agenda"
              className="font-body text-sm text-[#9DA89F] transition-colors hover:text-[#F4F4EF]"
            >
              ← Back to summit overview
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
