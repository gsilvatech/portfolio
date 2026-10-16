export const SITE = {
  name: "Gabriel Ferreira",
  brand: "GSILVATECH",
  // Troque pela variável de ambiente NEXT_PUBLIC_SITE_URL quando o domínio estiver registrado.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gsilvatech.dev",
  github: "https://github.com/gsilvatech",
  linkedin: "https://www.linkedin.com/in/sougabrieloficial",
  email: "gabriel_210203@hotmail.com",
  resumes: {
    pt: {
      href: "/resume/Curriculo-Gabriel-Ferreira.pdf",
      file: "Curriculo-Gabriel-Ferreira.pdf",
    },
    en: {
      href: "/resume/Resume-Gabriel-Ferreira.pdf",
      file: "Resume-Gabriel-Ferreira.pdf",
    },
  },
} as const;
