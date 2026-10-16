import type { ReactNode } from "react";
import { ChromaIcon, GeminiIcon } from "@/components/icons";

export type TechId =
  | "typescript"
  | "javascript"
  | "python"
  | "html"
  | "css"
  | "react"
  | "nextjs"
  | "nodejs"
  | "tailwind"
  | "fastapi"
  | "postgresql"
  | "supabase"
  | "mysql"
  | "clickhouse"
  | "chromadb"
  | "gemini"
  | "docker"
  | "gcp"
  | "git"
  | "github"
  | "vercel";

const dev = (cls: string, colored = true): ReactNode => (
  <i className={`${cls}${colored ? " colored" : ""}`} aria-hidden />
);

export const TECH: Record<TechId, { name: string; icon: ReactNode; docs: string }> = {
  typescript: { name: "TypeScript", icon: dev("devicon-typescript-plain"), docs: "https://www.typescriptlang.org/docs/" },
  javascript: { name: "JavaScript", icon: dev("devicon-javascript-plain"), docs: "https://developer.mozilla.org/docs/Web/JavaScript" },
  python: { name: "Python", icon: dev("devicon-python-plain"), docs: "https://docs.python.org/3/" },
  html: { name: "HTML5", icon: dev("devicon-html5-plain"), docs: "https://developer.mozilla.org/docs/Web/HTML" },
  css: { name: "CSS3", icon: dev("devicon-css3-plain"), docs: "https://developer.mozilla.org/docs/Web/CSS" },
  react: { name: "React", icon: dev("devicon-react-original"), docs: "https://react.dev/learn" },
  nextjs: { name: "Next.js", icon: dev("devicon-nextjs-plain", false), docs: "https://nextjs.org/docs" },
  nodejs: { name: "Node.js", icon: dev("devicon-nodejs-plain"), docs: "https://nodejs.org/docs/latest/api/" },
  tailwind: { name: "Tailwind CSS", icon: dev("devicon-tailwindcss-original"), docs: "https://tailwindcss.com/docs" },
  fastapi: { name: "FastAPI", icon: dev("devicon-fastapi-plain"), docs: "https://fastapi.tiangolo.com/" },
  postgresql: { name: "PostgreSQL", icon: dev("devicon-postgresql-plain"), docs: "https://www.postgresql.org/docs/" },
  supabase: { name: "Supabase", icon: dev("devicon-supabase-plain"), docs: "https://supabase.com/docs" },
  mysql: { name: "MySQL", icon: dev("devicon-mysql-plain"), docs: "https://dev.mysql.com/doc/" },
  clickhouse: { name: "ClickHouse", icon: dev("devicon-clickhouse-plain"), docs: "https://clickhouse.com/docs" },
  chromadb: { name: "ChromaDB", icon: <ChromaIcon />, docs: "https://docs.trychroma.com/" },
  gemini: { name: "Google Gemini", icon: <GeminiIcon />, docs: "https://ai.google.dev/gemini-api/docs" },
  docker: { name: "Docker", icon: dev("devicon-docker-plain"), docs: "https://docs.docker.com/" },
  gcp: { name: "Google Cloud", icon: dev("devicon-googlecloud-plain"), docs: "https://cloud.google.com/docs" },
  git: { name: "Git", icon: dev("devicon-git-plain"), docs: "https://git-scm.com/doc" },
  github: { name: "GitHub", icon: dev("devicon-github-original", false), docs: "https://docs.github.com/" },
  vercel: { name: "Vercel", icon: dev("devicon-vercel-original", false), docs: "https://vercel.com/docs" },
};

/** Tecnologias que aparecem na faixa entre "Sobre" e "Projetos". */
export const TECH_STRIP: TechId[] = [
  "typescript",
  "javascript",
  "python",
  "react",
  "nextjs",
  "nodejs",
  "tailwind",
  "html",
  "css",
  "fastapi",
  "postgresql",
  "supabase",
  "mysql",
  "clickhouse",
  "docker",
  "gcp",
  "git",
  "github",
  "vercel",
];
