"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/site-content";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="faq"
      className="py-20 lg:py-28"
      style={{ background: "#0A1C0D" }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

          {/* ── Left: sticky heading block ── */}
          <div className="lg:sticky lg:top-28">
            <p className="mb-2 font-body text-sm font-medium" style={{ color: "#47c34f" }}>
              FAQ&apos;s
            </p>
            <h2
              id="faq-heading"
              className="mb-4 font-body font-semibold leading-tight"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#F4F4EF" }}
            >
              Looking for an answer?
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: "#9DA89F" }}>
              Proactively answering your questions about the MEEI China Business
              Forum 2027, venue, dates, who can attend, and how to get in touch.
            </p>

            {/* ── Subtle CTAs ── */}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/waitlist"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#2ca640] px-6 py-2.5 font-body text-sm font-semibold text-white transition-all duration-200 hover:bg-[#078442] active:scale-95"
              >
                Join the Waitlist
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <Link
                href="/#contact"
                className="font-body text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "#9DA89F" }}
              >
                Still have questions?{" "}
                <span className="font-semibold underline underline-offset-4" style={{ color: "#47c34f" }}>
                  Get in touch
                </span>
              </Link>
            </div>
          </div>

          {/* ── Right: accordion list ── */}
          <div className="flex flex-col">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="cursor-pointer border-b py-4"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  onClick={() => toggle(faq.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="font-body text-base font-medium"
                      style={{ color: "#E8EDE9" }}
                    >
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-[18px] w-[18px] shrink-0 transition-all duration-500 ease-in-out`}
                      style={{ color: isOpen ? "#47c34f" : "#9DA89F", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p
                    className={`font-body text-sm leading-relaxed transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-[300px] translate-y-0 pt-4 opacity-100"
                        : "-translate-y-2 max-h-0 opacity-0"
                    }`}
                    style={{ color: "#9DA89F", overflow: "hidden" }}
                    id={`faq-answer-${faq.id}`}
                    aria-hidden={!isOpen}
                  >
                    {faq.answer}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
