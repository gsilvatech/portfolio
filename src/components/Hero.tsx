"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { dictionaries, ROTATING_TITLES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion, useScramble } from "@/lib/motion";
import { SITE } from "@/lib/site";
import { ArrowUpRightIcon, DownloadIcon } from "./icons";
import { useResumeModal } from "./ResumeModal";

const toBinary = (s: string) =>
  [...s].map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function RotatingTitle({
  active,
  reduced,
  staticText,
}: {
  active: boolean;
  reduced: boolean;
  staticText: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % ROTATING_TITLES.length), 3200);
    return () => clearInterval(id);
  }, [active, reduced]);

  return (
    <div
      aria-hidden
      className="relative mt-5 flex h-[1.35em] items-center justify-center text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
    >
      {reduced ? (
        <span className="text-gradient">{staticText}</span>
      ) : (
        <AnimatePresence mode="wait">
          {active ? (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient inline-block whitespace-nowrap"
            >
              {ROTATING_TITLES[i]}
            </motion.span>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
}

export function Hero() {
  const { t, lang, ready } = useI18n();
  const { open: openResume } = useResumeModal();
  const reduced = usePrefersReducedMotion();
  const greet = useScramble();
  const name = useScramble();
  const [decrypted, setDecrypted] = useState(false);

  const langRef = useRef(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const { scrambleTo: scrambleGreeting } = greet;
  const { scrambleTo: scrambleName } = name;

  useEffect(() => {
    if (!ready || reduced === null || reduced) return;
    let cancelled = false;

    (async () => {
      // 1) descriptografa "meu nome é" + nome; 2) alterna PT / EN / binário.
      const own = dictionaries[langRef.current].hero.greeting;
      const other = dictionaries[langRef.current === "pt" ? "en" : "pt"].hero.greeting;
      const phrases = [own, other, toBinary(dictionaries.en.hero.greeting)];

      await sleep(350);
      if (cancelled) return;
      await Promise.all([
        scrambleGreeting(phrases[0], { fromNoise: true, spread: 18, settle: 10 }),
        scrambleName(SITE.name, { fromNoise: true, spread: 22, settle: 12 }),
      ]);
      if (cancelled) return;
      setDecrypted(true);

      let n = 0;
      while (!cancelled) {
        await sleep(3400);
        if (cancelled) return;
        n = (n + 1) % phrases.length;
        await scrambleGreeting(phrases[n], { spread: 8, settle: 8 });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, reduced, scrambleGreeting, scrambleName]);

  const isReduced = reduced === true;
  const greeting = isReduced ? t.hero.greeting : greet.text;
  const nameText = isReduced ? SITE.name : name.text;
  const [first, ...rest] = nameText.split(" ");
  const last = rest.join(" ");
  const [finalFirst, finalLast] = SITE.name.split(" ");

  const staticRole = lang === "pt" ? ROTATING_TITLES[0] : ROTATING_TITLES[1];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-20 pt-28"
    >
      {/* fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-violet/20 blur-[120px]" />
        <div className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-brand-pink/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-brand-blue/10 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Texto real para leitores de tela e SEO: fixo, sem embaralhar */}
        <h1>
          <span className="sr-only">
            {SITE.name} — {t.hero.roleSr}
          </span>

          <span
            aria-hidden
            className="flex min-h-[3.75rem] items-start justify-center break-all px-2 font-mono text-[11px] leading-5 text-brand-violet sm:min-h-[1.75rem] sm:break-normal sm:text-base sm:leading-7"
          >
            <span>
              {greeting}
              <span className="caret" />
            </span>
          </span>

          <span
            aria-hidden
            className="relative mt-3 block text-[2.9rem] font-semibold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
          >
            {/* camada invisível reserva o espaço do nome final (sem pulos de layout) */}
            <span className="invisible block">
              <span className="block sm:inline">{finalFirst}</span>{" "}
              <span className="block sm:inline">{finalLast}</span>
            </span>
            <span className="text-gradient absolute inset-y-0 -inset-x-10 block">
              <span className="block sm:inline">{first}</span>{" "}
              <span className="block sm:inline">{last}</span>
            </span>
          </span>
        </h1>

        <RotatingTitle active={decrypted} reduced={isReduced} staticText={staticRole} />

        <p className="mt-6 max-w-xl text-balance text-base text-mute sm:text-lg">
          {t.hero.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line bg-card px-5 text-sm font-medium transition hover:border-brand-violet/60 hover:bg-white/[0.04]"
          >
            <i className="devicon-github-original text-lg" aria-hidden />
            {t.hero.github}
            <ArrowUpRightIcon className="h-4 w-4 text-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line bg-card px-5 text-sm font-medium transition hover:border-brand-violet/60 hover:bg-white/[0.04]"
          >
            <i className="devicon-linkedin-plain text-lg" aria-hidden />
            {t.hero.linkedin}
            <ArrowUpRightIcon className="h-4 w-4 text-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </a>
          <button
            type="button"
            onClick={openResume}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(236,72,153,0.7)] transition hover:brightness-110"
          >
            <DownloadIcon className="h-4 w-4" />
            {t.hero.resume}
          </button>
        </div>
      </div>
    </section>
  );
}
