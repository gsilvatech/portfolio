"use client";

import { useI18n } from "@/lib/i18n";
import { Card, Reveal, SectionHeading } from "./ui";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.14em] text-mute">
      {children}
    </p>
  );
}

export function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label={a.label} title={a.title} />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* trajetória */}
          <Reveal className="md:col-span-2 lg:col-span-4 lg:row-span-2">
            <Card
              className="h-full overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 0% 0%, rgba(139,92,246,0.22), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(236,72,153,0.16), transparent 55%)",
              }}
            >
              <div className="flex h-full flex-col p-7 sm:p-9">
                <Label>{a.summaryLabel}</Label>
                <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink/90 sm:text-xl">
                  {a.summary.map((p, i) => (
                    <p key={i} className={i === 0 ? "text-ink" : "text-ink/80"}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          {/* métrica em produção */}
          <Reveal className="lg:col-span-2" delay={0.05}>
            <Card
              className="h-full"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(139,92,246,0.28), rgba(236,72,153,0.2))",
              }}
            >
              <div className="flex h-full flex-col justify-between gap-6 p-7">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {a.productionLabel}
                </span>
                <div>
                  <p className="text-gradient w-fit text-6xl font-semibold tracking-tight sm:text-7xl">
                    {a.productionMetric}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">
                    {a.productionText}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* inglês / intérprete */}
          <Reveal className="lg:col-span-2" delay={0.1}>
            <Card className="h-full">
              <div className="flex h-full flex-col gap-3 p-7">
                <Label>{a.englishLabel}</Label>
                <h3 className="text-xl font-semibold leading-snug tracking-tight">
                  {a.englishTitle}
                </h3>
                <p className="text-sm leading-relaxed text-mute">{a.englishText}</p>
              </div>
            </Card>
          </Reveal>

          {/* bagagem técnica */}
          <Reveal className="md:col-span-2 lg:col-span-3" delay={0.05}>
            <Card className="h-full">
              <div className="p-7">
                <Label>{a.toolboxLabel}</Label>
                <div className="mt-5 space-y-5">
                  {a.toolbox.map((g) => (
                    <div key={g.name}>
                      <p className="text-sm font-medium text-ink">{g.name}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-line bg-bg/60 px-3 py-1 font-mono text-xs text-mute"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          {/* desafios */}
          <Reveal className="md:col-span-2 lg:col-span-3" delay={0.1}>
            <Card className="h-full">
              <div className="p-7">
                <Label>{a.challengesLabel}</Label>
                <ul className="mt-5 space-y-4">
                  {a.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>

          {/* formação */}
          <Reveal className="md:col-span-2 lg:col-span-4" delay={0.05}>
            <Card className="h-full">
              <div className="p-7">
                <Label>{a.educationLabel}</Label>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                  {a.education.map((e) => (
                    <li key={e.title}>
                      <p className="font-medium leading-snug">{e.title}</p>
                      <p className="mt-1 text-sm text-ink/80">{e.place}</p>
                      <p className="mt-0.5 font-mono text-xs text-mute">{e.meta}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>

          {/* localização */}
          <Reveal className="md:col-span-2 lg:col-span-2" delay={0.1}>
            <Card className="h-full">
              <div className="flex h-full flex-col gap-2 p-7">
                <Label>{a.locationLabel}</Label>
                <p className="text-lg font-semibold leading-snug tracking-tight">
                  {a.locationTitle}
                </p>
                <p className="text-sm text-mute">{a.locationText}</p>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
