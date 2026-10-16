"use client";

import { useI18n } from "@/lib/i18n";
import { Card, Reveal, SectionHeading } from "./ui";

export function Experience() {
  const { t } = useI18n();
  const e = t.experience;

  return (
    <section id="experience" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="03" label={e.label} title={e.title} />
        </div>

        <ol className="relative space-y-6 pl-8 sm:pl-12">
          {/* linha do tempo */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-brand-violet via-brand-pink/60 to-transparent sm:left-[11px]"
          />

          {e.items.map((item, i) => (
            <li key={item.company} className="relative">
              <span
                aria-hidden
                className={`absolute -left-8 top-7 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-bg sm:-left-12 sm:h-[23px] sm:w-[23px] ${
                  item.current ? "bg-gradient-brand" : "bg-line"
                }`}
              >
                {item.current ? (
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-white" />
                ) : null}
              </span>

              <Reveal delay={i * 0.05}>
                <Card>
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {item.company}
                        </h3>
                        <p className="mt-0.5 text-sm text-mute">{item.location}</p>
                      </div>
                      <p className="font-mono text-xs text-mute sm:text-sm">{item.period}</p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <p className="text-gradient w-fit font-medium">{item.role}</p>
                      {item.current ? (
                        <span className="rounded-full border border-brand-violet/40 bg-brand-violet/10 px-2 py-0.5 font-mono text-[11px] text-violet-300">
                          {e.current}
                        </span>
                      ) : null}
                      {item.metric ? (
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
                          {item.metric}
                        </span>
                      ) : null}
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {item.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-3 text-sm leading-relaxed text-ink/85"
                        >
                          <span
                            aria-hidden
                            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
