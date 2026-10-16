import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Moldura comum das três capas: fundo escuro com brilho roxo/rosa e uma
 * "janela" com borda e glow, para os cards ficarem consistentes.
 */
export function CoverFrame({
  children,
  windowClass = "w-full",
}: {
  children: ReactNode;
  windowClass?: string;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#16161a]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 15%, rgba(139,92,246,0.38), transparent 55%), radial-gradient(ellipse at 85% 95%, rgba(236,72,153,0.30), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div
          className={`overflow-hidden rounded-xl border border-white/10 shadow-[0_0_70px_-12px_rgba(139,92,246,0.65)] transition-transform duration-500 group-hover:scale-[1.03] ${windowClass}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function AliancaCover({ alt }: { alt: string }) {
  return (
    <CoverFrame>
      <Image
        src="/projects/alianca.jpg"
        alt={alt}
        width={1024}
        height={572}
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 92vw"
        className="block h-auto w-full"
      />
    </CoverFrame>
  );
}

export function SnakeCover({ alt }: { alt: string }) {
  return (
    <CoverFrame windowClass="h-full aspect-[645/694] w-auto">
      <Image
        src="/projects/snake.png"
        alt={alt}
        width={645}
        height={694}
        sizes="220px"
        className="block h-full w-full object-cover"
      />
    </CoverFrame>
  );
}

/**
 * Recriação (ilustração) da interface do RAG Chatbot no tema escuro do site.
 * Usa unidades `em` sobre um container query, então escala com o card.
 */
export function RagCover({ alt }: { alt: string }) {
  return (
    <CoverFrame>
      <div
        role="img"
        aria-label={alt}
        style={{ containerType: "inline-size" }}
        className="w-full"
      >
        <div
          className="flex aspect-[16/9] w-full select-none overflow-hidden bg-[#121214] text-[#e4e4e7]"
          style={{ fontSize: "2.45cqw" }}
        >
          {/* sidebar */}
          <div className="flex w-[31%] flex-col gap-[0.55em] border-r border-white/10 bg-[#17171b] p-[0.9em]">
            <div>
              <p className="font-semibold text-[1.35em] leading-tight text-white">RAG Chatbot</p>
              <p className="mt-[0.2em] text-[0.95em] text-zinc-400">AI document analysis</p>
            </div>
            <p className="text-[0.8em] font-semibold tracking-wider text-zinc-400">
              KNOWLEDGE BASE (1/3)
            </p>
            <div className="grid place-items-center rounded-[0.7em] border border-dashed border-zinc-500/70 py-[0.9em] text-center text-[0.9em] text-zinc-300">
              Click to attach a PDF
            </div>
            <div className="rounded-[0.6em] bg-white/5 py-[0.5em] text-center text-[0.9em] text-zinc-500">
              Add to Memory
            </div>
            <p className="text-[0.8em] font-semibold tracking-wider text-zinc-400">IN MEMORY:</p>
            <div className="flex items-center gap-[0.6em] rounded-[0.6em] border border-emerald-400/25 bg-emerald-400/10 px-[0.7em] py-[0.5em] text-[0.9em] text-emerald-300">
              <span className="inline-block h-[1.1em] w-[0.85em] rounded-[0.15em] bg-emerald-300/70" />
              arte-da-guerra.pdf
            </div>
            <div className="mt-auto rounded-[0.6em] bg-white/5 py-[0.5em] text-center text-[0.9em] text-zinc-300">
              New Chat
            </div>
          </div>

          {/* chat */}
          <div className="flex min-w-0 flex-1 flex-col gap-[0.7em] p-[1.1em]">
            <div className="w-[78%] rounded-[0.9em] border border-white/10 bg-[#1e1e24] px-[1em] py-[0.8em] text-[0.95em] leading-snug">
              Hello! Upload up to 3 PDF documents and ask me anything about them.
            </div>
            <div className="ml-auto w-[62%] rounded-[0.9em] bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] px-[1em] py-[0.8em] text-[0.95em] leading-snug text-white">
              What does it say about knowing your enemy?
            </div>
            <div className="w-[82%] rounded-[0.9em] border border-white/10 bg-[#1e1e24] px-[1em] py-[0.8em] text-[0.95em] leading-snug">
              Knowing both yourself and your enemy, you need not fear the result of a hundred battles.
              <span className="mt-[0.5em] block text-[0.85em] text-violet-300">
                ↳ arte-da-guerra.pdf
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between rounded-full border border-white/10 bg-[#1e1e24] py-[0.5em] pl-[1.2em] pr-[0.5em] text-[0.9em] text-zinc-500">
              Ask a question...
              <span className="rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] px-[1.1em] py-[0.5em] text-white">
                Send
              </span>
            </div>
          </div>
        </div>
      </div>
    </CoverFrame>
  );
}
