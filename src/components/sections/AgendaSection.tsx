"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import { agendaDays, siteConfig } from "@/data/site-content";

export default function AgendaSection() {
  const [activeDay, setActiveDay] = useState(agendaDays[0].id);
  const day = agendaDays.find((d) => d.id === activeDay) ?? agendaDays[0];

  return (
    <section id="agenda" className="py-16 lg:py-20" aria-labelledby="agenda-heading">
      <div className="mb-8">
        <SectionEyebrow className="mb-3">Programme</SectionEyebrow>
        <SectionHeading id="agenda-heading">
          Summit{" "}
          <span className="text-[var(--green-bright)]">Agenda</span>
        </SectionHeading>
        <p className="mt-3 text-xs text-[var(--text-secondary)]">
          {siteConfig.dates} · Vienna International Hotel, Guangzhou
        </p>
      </div>

      {/* Day tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Summit days">
        {agendaDays.map((d) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={d.id === activeDay}
            aria-controls={`agenda-panel-${d.id}`}
            onClick={() => setActiveDay(d.id)}
            className={`shrink-0 rounded-sm border px-4 py-2.5 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] ${
              d.id === activeDay
                ? "border-[var(--green-primary)] bg-[var(--green-dark)]/20 text-[var(--text-primary)]"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--green-dark)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="block font-body text-[10px] font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              {d.date}
            </span>
            <span className="block font-body text-xs font-semibold uppercase tracking-wide">
              {d.label}
            </span>
          </button>
        ))}
      </div>

      {/* Day theme badge */}
      <div
        id={`agenda-panel-${day.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${day.id}`}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-[var(--green-dark)] bg-[var(--green-dark)]/20 px-3 py-1">
          <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-[var(--green-bright)]">
            {day.theme}
          </span>
        </div>

        {/* Sessions */}
        <div className="flex flex-col">
          {day.sessions.map((session, i) => (
            <div
              key={i}
              className={`flex gap-4 py-4 ${
                i < day.sessions.length - 1 ? "border-b border-[var(--border)]" : ""
              }`}
            >
              {/* Time */}
              <div className="flex w-16 shrink-0 items-start gap-1.5 pt-0.5">
                <Clock className="h-3 w-3 shrink-0 text-[var(--green-bright)] mt-0.5" aria-hidden="true" />
                <span className="font-body text-[11px] font-semibold tabular-nums text-[var(--green-bright)]">
                  {session.time}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="mb-1 font-body text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                  {session.title}
                </p>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {session.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-[var(--text-secondary)]">
          Full programme details will be announced by MEEI Program. Schedule subject to change.
        </p>
      </div>
    </section>
  );
}
