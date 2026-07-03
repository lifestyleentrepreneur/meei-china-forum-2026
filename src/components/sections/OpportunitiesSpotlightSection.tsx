import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { summitHighlights } from "@/data/site-content";

const FEATURED_IDS = ["investment", "manufacturing", "trade"];

interface CardMeta {
  iconSlug: string;
  label: string;
  num: string;
}

const CARD_META: Record<string, CardMeta> = {
  investment:    { iconSlug: "money-bag",  label: "Investment",     num: "01" },
  manufacturing: { iconSlug: "factory",    label: "Manufacturing",  num: "02" },
  trade:         { iconSlug: "cargo-ship", label: "Trade & Export", num: "03" },
};

/* CSS filter: black iOS PNG → #2ca640 brand green */
const TO_GREEN =
  "brightness(0) saturate(100%) invert(44%) sepia(35%) saturate(1000%) hue-rotate(95deg) brightness(97%) contrast(107%)";

function icons8(slug: string, size = 96) {
  return `https://img.icons8.com/ios/${size}/${slug}.png`;
}

const featured = summitHighlights.filter((h) => FEATURED_IDS.includes(h.id));

export default function OpportunitiesSpotlightSection() {
  return (
    <section
      id="all-opportunities"
      className="relative z-10 -mt-[140px] px-5 sm:px-8 lg:px-16 xl:px-20"
      aria-labelledby="spotlight-heading"
    >
      <div className="mx-auto max-w-8xl">
        {/* ── Light green card ── */}
        <div
          className="relative overflow-hidden rounded-[28px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
          style={{
            background: "#E8F4EC",
            boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 4px 24px rgba(0,0,0,0.10)",
          }}
        >
          {/* Decorative radial */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 -top-40 hidden h-[500px] w-[500px] rounded-full opacity-40 lg:block"
            style={{
              background: "radial-gradient(circle at center, #b8dfc2 0%, transparent 68%)",
            }}
          />

          <div className="relative z-10">
            {/* ── Header ── */}
            <div className="mb-8 max-w-[820px] lg:mb-12">
              <h2
                id="spotlight-heading"
                className="mb-4 font-body font-bold leading-[1.08] text-[#10231B]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Why You Should Be Part of the China–Africa Business &amp;
                Investment Summit
              </h2>

              <p
                className="max-w-[600px] font-body leading-[1.62] text-[#3D6049]"
                style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.0625rem)" }}
              >
                Discover high-value pathways for investment, production, trade,
                and cross-border collaboration.
              </p>
            </div>

            {/* ── Cards ── */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map(({ id, title, description }) => {
                const meta = CARD_META[id];
                if (!meta) return null;
                const { iconSlug, label, num } = meta;

                return (
                  <div
                    key={id}
                    className="flex min-h-[280px] flex-col rounded-[18px] border border-[#C8DECD] bg-white p-7 shadow-[0_8px_24px_rgba(20,50,35,0.06)]"
                  >
                    {/* iOS line icon */}
                    <div
                      className="mb-5 flex items-center justify-center rounded-2xl"
                      style={{ background: "#EAF6ED", width: "52px", height: "52px" }}
                      aria-hidden="true"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icons8(iconSlug, 96)}
                        alt=""
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] object-contain"
                        style={{ filter: TO_GREEN }}
                      />
                    </div>

                    {/* Category label */}
                    <p className="mb-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B8C7A]">
                      {num} · {label}
                    </p>

                    {/* Title */}
                    <h3
                      className="mb-2.5 font-body font-bold leading-snug text-[#10231B]"
                      style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)" }}
                    >
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="flex-1 font-body text-[14.5px] leading-[1.65] text-[#4A6358]">
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ── Single CTA ── */}
            <div className="mt-10 flex justify-center lg:mt-14">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2.5 rounded-full px-9 py-4 font-body text-base font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ca640]"
                style={{
                  background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)",
                }}
              >
                Join the Summit
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
