import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Users2 } from "lucide-react";
import { summitHighlights, siteConfig } from "@/data/site-content";

// iOS line icons from Icons8, filtered white on dark, green on hover
const TO_GREEN =
  "brightness(0) saturate(100%) invert(62%) sepia(50%) saturate(450%) hue-rotate(82deg) brightness(100%) contrast(90%)";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return summitHighlights.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const opportunity = summitHighlights.find((h) => h.id === id);
  if (!opportunity) return {};
  return {
    title: `${opportunity.title} | ${siteConfig.eventName}`,
    description: opportunity.tagline ?? opportunity.description,
  };
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { id } = await params;
  const opportunity = summitHighlights.find((h) => h.id === id);
  if (!opportunity) notFound();

  const index = summitHighlights.findIndex((h) => h.id === id);
  const prev = summitHighlights[index - 1] ?? null;
  const next = summitHighlights[index + 1] ?? null;

  return (
    <div className="min-h-screen bg-[#050806]">
      {/* ── Top navigation bar ── */}
      <header className="border-b border-white/10 bg-[#050806]">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9DA89F] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Opportunities
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
            style={{ background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)" }}
          >
            Register Now
          </Link>
        </div>
      </header>

      <main>
        {/* ── Hero with photo ── */}
        <section
          className="relative overflow-hidden"
          aria-labelledby="opportunity-heading"
          style={{ minHeight: "420px" }}
        >
          {/* Background photo */}
          {opportunity.heroImage && (
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={opportunity.heroImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(5,8,6,0.90) 0%, rgba(5,8,6,0.75) 50%, rgba(5,8,6,0.55) 100%)",
                }}
              />
            </div>
          )}

          {/* Fallback: grid pattern when no image */}
          {!opportunity.heroImage && (
            <div
              className="absolute inset-0 opacity-[0.04]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(71,195,79,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(71,195,79,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                background: "#0B1710",
              }}
            />
          )}

          <div className="relative z-10 mx-auto max-w-8xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 xl:px-12">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex items-center gap-2 text-xs text-[#9DA89F]" role="list">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="select-none">/</li>
                <li><Link href="/opportunities" className="hover:text-white transition-colors">Opportunities</Link></li>
                <li aria-hidden="true" className="select-none">/</li>
                <li className="text-[#47c34f]" aria-current="page">{opportunity.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className="lg:col-span-8">
                {/* Icon */}
                <div
                  className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background: "rgba(44,166,64,0.20)",
                    border: "1px solid rgba(71,195,79,0.30)",
                    backdropFilter: "blur(8px)",
                  }}
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.icons8.com/ios/64/${opportunity.icon}.png`}
                    alt=""
                    width={30}
                    height={30}
                    className="h-[30px] w-[30px] object-contain"
                    style={{ filter: TO_GREEN }}
                  />
                </div>

                {opportunity.tagline && (
                  <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#47c34f]">
                    {opportunity.tagline}
                  </p>
                )}
                <h1
                  id="opportunity-heading"
                  className="font-heading font-bold leading-[1.05] text-[#F4F4EF]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  {opportunity.title}
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="font-body text-base leading-relaxed text-white/70">
                  {opportunity.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Body content ── */}
        {(opportunity.body?.length || opportunity.keyBenefits?.length || opportunity.whoFor?.length) && (
          <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

                {/* Left: body paragraphs + benefits */}
                <div className="lg:col-span-7">
                  {opportunity.body && opportunity.body.length > 0 && (
                    <div className="mb-12 flex flex-col gap-5">
                      {opportunity.body.map((para, i) => (
                        <p key={i} className="font-body text-base leading-[1.8] text-[#9DA89F]">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {opportunity.keyBenefits && opportunity.keyBenefits.length > 0 && (
                    <div>
                      <h2 className="mb-6 font-heading text-xl font-bold text-[#F4F4EF]">
                        Key Benefits
                      </h2>
                      <ul className="flex flex-col gap-4" role="list">
                        {opportunity.keyBenefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                              style={{ background: "rgba(44,166,64,0.14)" }}
                              aria-hidden="true"
                            >
                              <Check className="h-3 w-3" style={{ color: "#47c34f" }} />
                            </div>
                            <span className="font-body text-sm leading-relaxed text-[#9DA89F]">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right: Who For + CTA */}
                <div className="flex flex-col gap-6 lg:col-span-5">
                  {opportunity.whoFor && opportunity.whoFor.length > 0 && (
                    <div
                      className="rounded-2xl p-8"
                      style={{
                        background: "#0B1710",
                        border: "1px solid rgba(53,194,74,0.16)",
                      }}
                    >
                      <div className="mb-5 flex items-center gap-3">
                        <Users2 className="h-5 w-5 shrink-0" style={{ color: "#47c34f" }} aria-hidden="true" />
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-[#F4F4EF]">
                          Who Should Engage
                        </h3>
                      </div>
                      <ul className="flex flex-col gap-2.5" role="list">
                        {opportunity.whoFor.map((group, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span
                              className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: "#47c34f" }}
                              aria-hidden="true"
                            />
                            <span className="font-body text-sm leading-relaxed text-[#9DA89F]">
                              {group}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Register CTA */}
                  <div
                    className="rounded-2xl p-8"
                    style={{
                      background: "#0B1710",
                      border: "1px solid rgba(53,194,74,0.16)",
                    }}
                  >
                    <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#47c34f]">
                      17–21 October 2026
                    </p>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#F4F4EF]">
                      Attend MEEI 2026
                    </h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-[#9DA89F]">
                      Vienna International Hotel, Guangzhou, China
                    </p>
                    <Link
                      href="/register"
                      className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                      style={{ background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)" }}
                    >
                      Claim Your Place
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Prev / Next navigation ── */}
        <section
          className="border-t py-12"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between gap-6">
              {prev ? (
                <Link
                  href={`/opportunities/${prev.id}`}
                  className="group flex items-center gap-2 text-sm font-medium text-[#9DA89F] transition-colors hover:text-[#47c34f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:rounded"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#9DA89F]/60">Previous</span>
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              <Link
                href="/opportunities"
                className="text-xs font-medium text-[#9DA89F] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:rounded"
              >
                All Opportunities
              </Link>
              {next ? (
                <Link
                  href={`/opportunities/${next.id}`}
                  className="group flex items-center gap-2 text-right text-sm font-medium text-[#9DA89F] transition-colors hover:text-[#47c34f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:rounded"
                >
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#9DA89F]/60">Next</span>
                    {next.title}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
