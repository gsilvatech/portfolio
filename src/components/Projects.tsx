"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PROJECTS, type Project, type ProjectId } from "@/lib/projects";
import { AliancaCover, RagCover, SnakeCover } from "./covers";
import { ArrowUpRightIcon, ChevronDownIcon } from "./icons";
import { onSpotMove, Reveal, SectionHeading, TechIcon } from "./ui";

function Badge({ status }: { status: Project["status"] }) {
  const { t } = useI18n();
  const label = t.projects.badges[status];

  if (status === "production") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {label}
      </span>
    );
  }
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 font-mono text-[11px] text-sky-300">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-mute">
      {label}
    </span>
  );
}

function Cover({ id }: { id: ProjectId }) {
  const { t } = useI18n();
  const alt = t.projects.items[id].alt;
  if (id === "alianca") return <AliancaCover alt={alt} />;
  if (id === "rag") return <RagCover alt={alt} />;
  return <SnakeCover alt={alt} />;
}

function ProjectCard({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  const text = t.projects.items[project.id];
  const panelId = `project-${project.id}-panel`;
  const featured = project.status === "production";

  return (
    <article
      data-project-card
      data-open={open}
      onPointerMove={onSpotMove}
      className={`project-card bento spot group overflow-hidden ${featured ? "frame-gradient" : ""}`}
    >
      <div className="relative z-[1]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="block w-full text-left"
        >
          <Cover id={project.id} />
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
              <span
                aria-hidden
                className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-mute transition-transform duration-300 ${
                  open ? "rotate-180 bg-white/5 text-ink" : ""
                }`}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <Badge status={project.status} />
              <ul
                aria-label={t.projects.stackLabel}
                className="flex flex-wrap items-center gap-2.5"
              >
                {project.stack.map((id) => (
                  <li key={id}>
                    <TechIcon id={id} className="text-[22px]" />
                  </li>
                ))}
              </ul>
            </div>
            <span className="sr-only">{open ? t.projects.collapse : t.projects.expand}</span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="panel"
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-line px-5 pb-5 pt-5">
                <p className="text-sm leading-relaxed text-ink/90">{text.summary}</p>
                <ul className="mt-4 space-y-2.5">
                  {text.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-mute">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                {text.note ? (
                  <p className="mt-4 rounded-xl border border-line bg-bg/50 px-3.5 py-2.5 text-xs leading-relaxed text-mute">
                    {text.note}
                  </p>
                ) : null}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <a
                    href={project.links.primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-3 text-xs font-semibold text-white shadow-[0_10px_36px_-12px_rgba(236,72,153,0.8)] transition hover:brightness-110 sm:px-4 sm:text-sm"
                  >
                    {text.primary}
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-bg/40 px-3 text-xs font-medium transition hover:border-brand-violet/50 hover:bg-white/[0.04] sm:px-4 sm:text-sm"
                  >
                    <i className="devicon-github-original text-base" aria-hidden />
                    {t.projects.code}
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useI18n();
  const [openId, setOpenId] = useState<ProjectId | null>(null);

  // Clicar fora de qualquer card fecha o aberto; clicar em outro card abre o novo
  // (o estado único `openId` já fecha o anterior). ESC também fecha.
  useEffect(() => {
    if (!openId) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest("[data-project-card]")) setOpenId(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  return (
    <section id="projects" className="relative px-4 py-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          label={t.projects.label}
          title={t.projects.title}
          hint={t.projects.hint}
        />

        <div className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProjectCard
                project={p}
                open={openId === p.id}
                onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
