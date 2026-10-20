"use client";

import { motion } from "framer-motion";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { TECH, type TechId } from "@/lib/tech";

/** Move o "holofote" das bordas dos cards junto com o ponteiro. */
export function onSpotMove(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      onPointerMove={onSpotMove}
      style={style}
      className={`bento spot ${className}`}
    >
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}

/** Entrada suave ao rolar. Com "reduzir movimento" ativo, só há um fade curto. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  hint,
}: {
  index: string;
  label: string;
  title: string;
  hint?: string;
}) {
  return (
    <Reveal>
      <p className="font-mono text-sm">
        <span className="text-gradient-cool">{index}</span>{" "}
        <span className="text-mute">/ {label}</span>
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:mt-3 sm:text-5xl">
        {title}
      </h2>
      {hint ? <p className="mt-3 text-mute">{hint}</p> : null}
    </Reveal>
  );
}

/** Ícone de tecnologia com nome acessível e dica ao passar o mouse. */
export function TechIcon({
  id,
  className = "text-2xl",
}: {
  id: TechId;
  className?: string;
}) {
  const tech = TECH[id];
  return (
    <span
      title={tech.name}
      className={`inline-flex items-center justify-center leading-none ${className}`}
    >
      <span className="sr-only">{tech.name}</span>
      {tech.icon}
    </span>
  );
}
