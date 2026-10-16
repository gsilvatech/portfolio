"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { CheckIcon, ChevronDownIcon, CloseIcon, GlobeIcon, MenuIcon } from "./icons";
import { useResumeModal } from "./ResumeModal";

const SECTIONS = ["about", "projects", "experience", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function LanguageSwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.nav.language}: ${current.label}`}
        className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-card/70 px-3 text-sm font-medium text-ink transition hover:border-brand-violet/50"
      >
        <GlobeIcon className="h-4 w-4 text-mute" />
        <span className="font-mono text-xs">{current.short}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 text-mute transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            role="listbox"
            aria-label={t.nav.language}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-full z-10 mt-2 min-w-44 overflow-hidden rounded-2xl border border-line bg-card p-1.5 shadow-xl shadow-black/50 ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {LANGUAGES.map((l) => (
              <li key={l.code} role="option" aria-selected={l.code === lang}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/5"
                >
                  <span>
                    <span className="mr-2 font-mono text-xs text-mute">{l.short}</span>
                    {l.label}
                  </span>
                  {l.code === lang ? (
                    <CheckIcon className="h-4 w-4 text-brand-violet" />
                  ) : null}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const { open: openResume } = useResumeModal();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
      >
        <a
          href="#top"
          aria-label={`${SITE.brand} — ${t.nav.home}`}
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 font-mono text-[15px] font-semibold tracking-tight"
        >
          <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-gradient-brand" />
          {SITE.brand}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === id ? "text-ink" : "text-mute hover:text-ink"
                }`}
              >
                {t.nav[id]}
                {active === id ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gradient-brand"
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={openResume}
            className="hidden h-9 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition hover:bg-white sm:inline-flex"
          >
            {t.nav.resume}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card/70 md:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="mx-auto grid max-w-6xl gap-1 px-4 pb-5 pt-1">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-xl px-3 py-3 text-base ${
                      active === id ? "bg-white/5 text-ink" : "text-mute"
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openResume();
                  }}
                  className="w-full rounded-xl bg-ink px-4 py-3 text-base font-medium text-bg"
                >
                  {t.hero.resume}
                </button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
