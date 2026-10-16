"use client";

import { useI18n } from "@/lib/i18n";
import { TECH, TECH_STRIP } from "@/lib/tech";

function Row({ hidden = false }: { hidden?: boolean }) {
  const { t } = useI18n();

  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-3 pr-3 ${hidden ? "marquee-dup" : ""}`}
    >
      {TECH_STRIP.map((id) => {
        const tech = TECH[id];
        return (
          <li key={id}>
            <a
              href={tech.docs}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={hidden ? -1 : undefined}
              aria-label={`${t.tech.documentation} ${tech.name}`}
              title={`${t.tech.documentation} ${tech.name}`}
              className="group flex items-center gap-3 rounded-full border border-line bg-card/70 py-2.5 pl-4 pr-5 transition-colors duration-200 hover:border-brand-violet/70 hover:bg-brand-violet/10"
            >
              <span className="text-3xl leading-none">{tech.icon}</span>
              <span className="whitespace-nowrap text-sm font-medium text-ink/90">
                {tech.name}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function TechStrip() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t.tech.label}
      className="relative border-y border-line bg-gradient-to-b from-card/40 to-transparent py-10"
    >
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-mute">
        {t.tech.label}
      </p>
      <div className="marquee">
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
