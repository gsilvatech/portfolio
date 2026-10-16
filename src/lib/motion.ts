"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * `null` no servidor e na hidratação (evita divergência de HTML), depois
 * `true` se o usuário pediu para reduzir movimento.
 */
export function usePrefersReducedMotion(): boolean | null {
  return useSyncExternalStore<boolean | null>(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => null,
  );
}

const GLYPHS =
  "!<>-_\\/[]{}=+*^?#%&$@ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789";
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

type ScrambleOptions = {
  /** quantos "frames" o início de cada letra pode atrasar */
  spread?: number;
  /** quantos "frames" cada letra fica embaralhada antes de fixar */
  settle?: number;
  /** começa de um texto aleatório (efeito de descriptografia inicial) */
  fromNoise?: boolean;
};

/**
 * Efeito de "descriptografia": letras embaralhadas que se fixam uma a uma
 * até formar o texto final. Só altera o que é mostrado na tela.
 */
export function useScramble() {
  const [text, setText] = useState("");
  const textRef = useRef("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrambleTo = useCallback((target: string, opts: ScrambleOptions = {}) => {
    const { spread = 12, settle = 10, fromNoise = false } = opts;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    return new Promise<void>((resolve) => {
      const from = fromNoise
        ? Array.from({ length: target.length }, () => randomGlyph()).join("")
        : textRef.current;
      const length = Math.max(from.length, target.length);

      const queue = Array.from({ length }, (_, i) => {
        const start = Math.floor(Math.random() * spread);
        const end = start + settle + Math.floor(Math.random() * settle);
        const to = target[i] ?? "";
        return { from: to === " " ? " " : (from[i] ?? ""), to, start, end, glyph: "" };
      });

      const t0 = performance.now();
      const FRAME_MS = 48;

      const tick = (now: number) => {
        const frame = Math.floor((now - t0) / FRAME_MS);
        let out = "";
        let done = 0;
        for (const q of queue) {
          if (q.to === " ") {
            // espaços ficam fixos desde o início: mantém as palavras separadas
            out += " ";
            done++;
          } else if (frame >= q.end) {
            out += q.to;
            done++;
          } else if (frame >= q.start) {
            if (!q.glyph || Math.random() < 0.3) q.glyph = randomGlyph();
            out += q.glyph;
          } else {
            out += q.from;
          }
        }
        textRef.current = out;
        setText(out);
        if (done === queue.length) {
          rafRef.current = null;
          resolve();
        } else {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    });
  }, []);

  return { text, scrambleTo };
}
