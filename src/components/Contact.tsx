"use client";

import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { ArrowUpRightIcon, MailIcon } from "./icons";
import { Reveal } from "./ui";

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;

  return (
    <section id="contact" className="relative px-4 pb-16 pt-24 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-violet/25 blur-[110px]" />
              <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-brand-pink/20 blur-[110px]" />
            </div>

            <div className="relative">
              <p className="font-mono text-sm">
                <span className="text-gradient-cool">04</span>{" "}
                <span className="text-mute">/ {c.label}</span>
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                <span className="text-gradient">{c.title}</span>
              </h2>
              <p className="mt-4 text-lg text-mute">{c.subtitle}</p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(236,72,153,0.7)] transition hover:brightness-110"
                >
                  <MailIcon className="h-4 w-4" />
                  {c.email}
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line bg-bg/50 px-5 text-sm font-medium transition hover:border-brand-violet/60 hover:bg-white/[0.04]"
                >
                  <i className="devicon-github-original text-lg" aria-hidden />
                  {c.github}
                  <ArrowUpRightIcon className="h-4 w-4 text-mute transition group-hover:text-ink" />
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line bg-bg/50 px-5 text-sm font-medium transition hover:border-brand-violet/60 hover:bg-white/[0.04]"
                >
                  <i className="devicon-linkedin-plain text-lg" aria-hidden />
                  {c.linkedin}
                  <ArrowUpRightIcon className="h-4 w-4 text-mute transition group-hover:text-ink" />
                </a>
              </div>

              <p className="mt-6 font-mono text-sm text-mute">
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline decoration-line underline-offset-4 transition hover:text-ink hover:decoration-brand-violet"
                >
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 border-t border-line pt-6 text-center text-sm text-mute sm:flex-row sm:text-left">
        <p>
          © <span suppressHydrationWarning>{year}</span>{" "}
          <span className="font-mono">{SITE.brand}</span> · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
