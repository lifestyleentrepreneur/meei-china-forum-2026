"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Tickets", href: "/register" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Switch off mobile drawer once the desktop nav is visible (≥768 px)
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = NAV_ITEMS.filter((i) => i.href.startsWith("#")).map((i) =>
      i.href.slice(1)
    );
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      // Detection band across the upper-middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    // At the very top of the page, force "home" active.
    const onScroll = () => {
      if (window.scrollY < 8) setActiveSection("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {/* ── Floating header bar ── */}
      <header
        className="fixed left-0 right-0 top-5 z-50 px-4 sm:px-6 xl:px-12"
        role="banner"
      >
        <div className="relative mx-auto flex max-w-8xl items-center justify-between gap-4">

          {/* ── Brand / Logo (removed for now) ── */}

          {/* ── Desktop centred nav pill (visible ≥ 768 px) ── */}
          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 md:block"
          >
            <ul
              className="flex items-center gap-0.5 rounded-full border border-white/15 bg-black/30 px-1.5 py-1 shadow-xl backdrop-blur-lg"
              role="list"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === `#${activeSection}`;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={
                        isActive
                          ? "inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#063F32] shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 lg:px-4 lg:py-1.5 lg:text-sm"
                          : "inline-block rounded-full px-3 py-1 text-xs font-medium text-white/75 transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 lg:px-4 lg:py-1.5 lg:text-sm"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Right: Register button (desktop) + Hamburger (mobile) ── */}
          <div className="ml-auto flex items-center gap-3">
            {/* Register Now, desktop */}
            <Link
              href="/register"
              className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#063F32] shadow-md transition-all duration-200 hover:bg-white/90 hover:shadow-lg active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 md:inline-flex lg:gap-2 lg:px-5 lg:py-2 lg:text-sm"
            >
              Register Now
              <ArrowRight className="h-3 w-3 lg:h-3.5 lg:w-3.5" aria-hidden="true" />
            </Link>

            {/* Hamburger, mobile only (< 768 px) */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 md:hidden"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
            >
              {isMobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile navigation overlay (< 768 px only) ── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isMobileOpen}
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        />

        {/* Slide-in drawer */}
        <div
          className={`absolute right-0 top-0 flex h-full w-72 max-w-full flex-col shadow-2xl transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#041A0F" }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <span className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              Menu
            </span>
            <button
              type="button"
              onClick={closeMobile}
              className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === `#${activeSection}`;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                        isActive
                          ? "bg-[var(--green-bright)]/15 font-semibold text-[var(--green-bright)]"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[var(--green-bright)]"
                          aria-hidden="true"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/10 px-4 pb-8 pt-4">
            <Link
              href="/register"
              onClick={closeMobile}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#063F32] shadow-md transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              Register Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
