"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig, contactDetails } from "@/data/site-content";

/* ── Data ─────────────────────────────────────────────────── */

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
];

/* ── Newsletter form (interactive) ───────────────────────── */

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    // Simulate async, wire to real endpoint when ready
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setIsSubmitting(false);
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || status !== "idle"}
          required
          aria-label="Email for newsletter"
          className="rounded-r-none border-r-0"
        />
        <Button
          type="submit"
          size="default"
          disabled={isSubmitting || status !== "idle"}
          className="shrink-0 rounded-l-none px-4"
          aria-label="Subscribe"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      {status !== "idle" && (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            status === "success" ? "text-[#47c34f]" : "text-red-400"
          )}
        >
          {status === "success"
            ? "Subscribed! We'll keep you updated."
            : "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}

/* ── Footer ──────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 bg-[#050806]"
      aria-label="Site footer"
    >
      {/* Tagline banner */}
      <div className="border-b border-white/8 py-9">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10">
            <span className="font-heading text-lg font-semibold uppercase tracking-[0.15em] text-[#47c34f] sm:text-xl">
              STRONGER TOGETHER
            </span>
            <span className="hidden text-white/20 sm:block" aria-hidden="true">·</span>
            <span className="font-heading text-lg font-semibold uppercase tracking-[0.15em] text-[#d2a74f] sm:text-xl">
              PROSPEROUS TOGETHER
            </span>
            <span className="hidden text-white/20 sm:block" aria-hidden="true">·</span>
            <span className="font-heading text-lg font-semibold uppercase tracking-[0.15em] text-[#f4f1e8] sm:text-xl">
              SUSTAINABLE TOGETHER
            </span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-8xl px-5 py-14 sm:px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── Column 1: Brand ── */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Return to homepage" className="w-fit">
              <p className="mb-0.5 font-heading text-sm font-semibold uppercase tracking-wider text-[#F4F4EF]">
                {siteConfig.organizer}
              </p>
              <p className="text-xs text-[#47c34f]">{siteConfig.organizerTagline}</p>
            </Link>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 text-[#9DA89F] transition-all duration-200 hover:border-[#2ca640]/40 hover:bg-[#2ca640]/10 hover:text-[#47c34f]"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact highlights */}
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#2ca640]" aria-hidden="true" />
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-xs text-[#9DA89F] transition-colors hover:text-[#F4F4EF]"
                >
                  {contactDetails.email}
                </a>
              </li>
              {contactDetails.phones.map((phone) => (
                <li key={phone.number} className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#2ca640]" aria-hidden="true" />
                  <a
                    href={`tel:${phone.number}`}
                    className="text-xs text-[#9DA89F] transition-colors hover:text-[#F4F4EF]"
                  >
                    {phone.display}
                    <span className="ml-1 text-[10px] text-[#9DA89F]/60">({phone.label})</span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#2ca640]" aria-hidden="true" />
                <span className="text-xs text-[#9DA89F]">{contactDetails.venueShort}</span>
              </li>
            </ul>
          </div>

          {/* ── Column 2: Newsletter ── */}
          <div>
            <h3 className="mb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F4EF]">
              Stay Informed
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-[#9DA89F]">
              Get summit updates, speaker announcements, and registration reminders
              delivered to your inbox.
            </p>
            <NewsletterForm />

            {/* Event details card */}
            <div
              className="mt-7 rounded-xl p-4"
              style={{ background: "#0B1710", border: "1px solid rgba(53,194,74,0.14)" }}
            >
              <p className="mb-0.5 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#47c34f]">
                {siteConfig.dates}
              </p>
              <p className="font-heading text-sm font-semibold text-[#F4F4EF]">
                {siteConfig.venue}
              </p>
              <p className="mt-0.5 text-xs text-[#9DA89F]">{siteConfig.venueCity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-[#9DA89F] sm:flex-row sm:px-8 lg:px-16 xl:px-20">
          <p>&copy; 2026 {siteConfig.organizer}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-[#F4F4EF]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#F4F4EF]">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="transition-colors hover:text-[#F4F4EF]">
              Payment &amp; Visa Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
