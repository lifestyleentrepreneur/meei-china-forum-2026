import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function CtaSection() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--green-dark)]/40 via-[var(--background)] to-[var(--surface-secondary)]" aria-hidden="true">
        {/* Decorative network */}
        <svg
          className="absolute inset-0 h-full w-full opacity-10"
          viewBox="0 0 1200 600"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="600" cy="300" r="250" stroke="#d2a74f" strokeWidth="0.8" />
          <circle cx="600" cy="300" r="150" stroke="#2ca640" strokeWidth="0.8" />
          <circle cx="600" cy="300" r="8" fill="#47c34f" />
          <circle cx="100" cy="100" r="5" fill="#d2a74f" />
          <circle cx="1100" cy="500" r="5" fill="#d2a74f" />
          <circle cx="200" cy="500" r="4" fill="#2ca640" />
          <circle cx="1000" cy="100" r="4" fill="#2ca640" />
          <line x1="100" y1="100" x2="600" y2="300" stroke="#d2a74f" strokeWidth="0.4" strokeDasharray="8 8" />
          <line x1="1100" y1="500" x2="600" y2="300" stroke="#d2a74f" strokeWidth="0.4" strokeDasharray="8 8" />
          <line x1="200" y1="500" x2="600" y2="300" stroke="#2ca640" strokeWidth="0.4" strokeDasharray="8 8" />
          <line x1="1000" y1="100" x2="600" y2="300" stroke="#2ca640" strokeWidth="0.4" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-8xl px-4 text-center sm:px-6 lg:px-8 xl:px-12">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-bright)]">
          Guangzhou · April 2027
        </p>
        <h2
          id="cta-heading"
          className="section-heading mx-auto mb-6 max-w-3xl font-body font-bold uppercase tracking-tight text-[var(--text-primary)]"
        >
          Build the Partnerships That{" "}
          <span className="text-[var(--gold)]">Shape Tomorrow</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
          Join the conversation around sustainable Africa–China trade, investment, manufacturing, and industrial cooperation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton href="/waitlist" className="min-w-[200px]">
            Join the Waitlist
          </PrimaryButton>
          <SecondaryButton href="/#contact">
            Contact the Organizers
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
