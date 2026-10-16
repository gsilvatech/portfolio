import type { TechId } from "./tech";

export type ProjectId = "alianca" | "rag" | "snake";

export type Project = {
  id: ProjectId;
  title: string;
  status: "production" | "live" | "study";
  stack: TechId[];
  links: { primary: string; repo: string };
};

export const PROJECTS: Project[] = [
  {
    id: "alianca",
    title: "Aliança Barber System",
    status: "production",
    stack: ["typescript", "nextjs", "tailwind", "postgresql", "supabase"],
    links: {
      primary: "https://www.aliancabarberclub.com.br/",
      repo: "https://github.com/gsilvatech/alianca-barber-system",
    },
  },
  {
    id: "rag",
    title: "RAG Chatbot",
    status: "live",
    stack: ["python", "fastapi", "nextjs", "tailwind", "gemini", "chromadb"],
    links: {
      primary: "https://rag-chatbot-mocha-omega.vercel.app/",
      repo: "https://github.com/gsilvatech/RAG-Chatbot",
    },
  },
  {
    id: "snake",
    title: "Snake Game",
    status: "study",
    stack: ["javascript", "html", "css"],
    links: {
      primary: "https://gsilvatech.github.io/snake-game/",
      repo: "https://github.com/gsilvatech/snake-game",
    },
  },
];
