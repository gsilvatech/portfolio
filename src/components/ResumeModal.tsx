"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { CloseIcon, DownloadIcon, FileIcon } from "./icons";

const ResumeContext = createContext<{ open: () => void } | null>(null);

export function useResumeModal() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResumeModal must be used inside <ResumeModalProvider>");
  return ctx;
}

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus?.();
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <ResumeContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen ? <ResumeDialog onClose={close} /> : null}
      </AnimatePresence>
    </ResumeContext.Provider>
  );
}

function ResumeDialog({ onClose }: { onClose: () => void }) {
  const { t, lang } = useI18n();
  const m = t.resumeModal;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // foco inicial: a opção que combina com o idioma do site
    const preferred = panelRef.current?.querySelector<HTMLElement>(
      `[data-lang="${lang}"]`,
    );
    preferred?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const options = [
    { code: "pt" as const, title: m.ptTitle, meta: m.ptMeta },
    { code: "en" as const, title: m.enTitle, meta: m.enMeta },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-3xl border border-line bg-card p-6 shadow-[0_30px_120px_-20px_rgba(139,92,246,0.45)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={m.close}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-mute transition hover:bg-white/5 hover:text-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <h2 id="resume-title" className="text-2xl font-semibold tracking-tight">
          {m.title}
        </h2>
        <p className="mt-1 text-sm text-mute">{m.subtitle}</p>

        <div className="mt-6 grid gap-3">
          {options.map((o) => {
            const match = o.code === lang;
            const file = SITE.resumes[o.code];
            return (
              <a
                key={o.code}
                data-lang={o.code}
                href={file.href}
                download={file.file}
                onClick={() => setTimeout(onClose, 150)}
                className={`group flex items-center gap-4 rounded-2xl border p-4 transition ${
                  match
                    ? "border-brand-violet/60 bg-brand-violet/10 hover:bg-brand-violet/15"
                    : "border-line bg-bg/40 hover:border-brand-violet/40 hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    match ? "bg-gradient-brand text-white" : "bg-white/5 text-mute"
                  }`}
                >
                  <FileIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{o.title}</span>
                  <span className="block text-sm text-mute">{o.meta}</span>
                </span>
                <DownloadIcon className="h-5 w-5 shrink-0 text-mute transition group-hover:translate-y-0.5 group-hover:text-ink" />
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
