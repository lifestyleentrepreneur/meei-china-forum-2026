import Link from "next/link";
import { Languages } from "lucide-react";
import { locales, type Locale } from "@/components/registration/registration-copy";

// Language pills for pages served at basePath, basePath/fr and basePath/zh.
export default function LanguageSwitcher({
  basePath,
  locale,
  label,
}: {
  basePath: string;
  locale: Locale;
  label: string;
}) {
  return (
    <nav aria-label={label} className="mb-6 flex flex-wrap items-center gap-2">
      <Languages className="h-4 w-4 text-[var(--text-secondary)]" aria-hidden="true" />
      {locales.map((l) => {
        const active = l.code === locale;
        return (
          <Link
            key={l.code}
            href={`${basePath}${l.suffix}`}
            lang={l.htmlLang}
            hrefLang={l.htmlLang}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)] ${
              active
                ? "border-[var(--green-bright)] bg-[var(--green-dark)]/30 text-[var(--text-primary)]"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--green-bright)] hover:text-[var(--text-primary)]"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
