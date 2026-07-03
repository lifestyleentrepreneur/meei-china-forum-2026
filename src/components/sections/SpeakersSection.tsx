"use client";

import { useState } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Toast from "@/components/ui/Toast";
import { speakerPlaceholders } from "@/data/site-content";
import Image from "next/image";

export default function SpeakersSection() {
  const [showToast, setShowToast] = useState(false);

  return (
    <section id="speakers" className="py-20 lg:py-28" aria-labelledby="speakers-heading">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow className="mb-3">Featured Speakers</SectionEyebrow>
            <SectionHeading id="speakers-heading">
              Meet the Visionaries{" "}
              <span className="text-[var(--green-bright)]">Driving Change</span>
            </SectionHeading>
          </div>
          <SecondaryButton
            onClick={() => setShowToast(true)}
            className="shrink-0"
            ariaLabel="View all speakers"
          >
            View All Speakers
          </SecondaryButton>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {speakerPlaceholders.map((speaker) => (
            <article
              key={speaker.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:flex-row"
            >
              {/* Speaker photo */}
              <div className="relative aspect-[4/5] w-full shrink-0 bg-[var(--surface-secondary)] sm:aspect-auto sm:w-[42%]">
                <Image
                  src={speaker.image ?? ""}
                  alt={speaker.name ?? "Speaker"}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              {/* Speaker info */}
              <div className="flex flex-1 flex-col justify-center p-6 lg:p-7">
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                  {speaker.name}
                </h3>
                {(speaker.role || speaker.organization) && (
                  <p className="mt-1 font-body text-sm font-semibold text-[var(--green-bright)]">
                    {[speaker.role, speaker.organization].filter(Boolean).join(" · ")}
                  </p>
                )}
                {speaker.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {speaker.bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {showToast && (
        <Toast
          message="The full speaker lineup will be announced soon. Check back for updates."
          onClose={() => setShowToast(false)}
        />
      )}
    </section>
  );
}
