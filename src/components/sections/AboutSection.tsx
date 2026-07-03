import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoPlaceholder from "@/components/ui/VideoPlaceholder";
import { mediaConfig } from "@/data/site-content";

const BODY_COLOR = "#4A5E4F";
const HEADING_COLOR = "#1C2E20";

const bullets = [
  "Expand your international business network",
  "Explore trade and investment opportunities",
  "Build sustainable industrial partnerships",
  "Participate in practical market-focused conversations",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="pt-40 pb-20 lg:pt-44 lg:pb-28"
      style={{ background: "#F7F3EC" }}
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* Text content */}
          <div>
            <SectionHeading
              id="about-heading"
              className="mb-6"
              style={{ color: HEADING_COLOR }}
            >
              Strengthening Ties.{" "}
              <span className="text-[var(--green-bright)]">Shaping the Future.</span>
            </SectionHeading>

            <div className="space-y-4 text-sm leading-relaxed" style={{ color: BODY_COLOR }}>
              <p>
                The China–Africa Business &amp; Investment Summit 2026 is designed
                to bring together stakeholders engaged in strengthening Africa–China
                trade, investment, manufacturing, industrial cooperation, and
                sustainable economic partnerships. Hosted in Guangzhou, one of
                China&apos;s leading commercial and industrial hubs, the summit
                offers a focused environment for meaningful dialogue and business
                development.
              </p>
              <p>
                Organized by MEEI Program, the summit reflects a commitment to
                building lasting, practical bridges between the African and Chinese
                business ecosystems. From government dialogue to private-sector
                matchmaking, the programme is structured to deliver actionable value
                for every participant.
              </p>
            </div>

            <ul className="mt-6 flex flex-col gap-3" role="list">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green-bright)]"
                    aria-hidden="true"
                  />
                  <span className="text-sm" style={{ color: BODY_COLOR }}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                style={{ background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)" }}
              >
                Join the Summit
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Video/image placeholder */}
          <div>
            <VideoPlaceholder
              videoUrl={mediaConfig.aboutVideoUrl}
              posterUrl={mediaConfig.aboutPoster}
              title="Summit experience, conference photography or event video"
              label="Summit experience video or conference photography"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
