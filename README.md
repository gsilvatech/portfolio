# GSILVATECH — Portfólio de Gabriel Ferreira

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion. Fontes Geist Sans / Geist Mono, ícones Devicon (empacotados localmente).

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Onde mexer

| O quê | Onde |
| --- | --- |
| Todos os textos (EN e PT) | `src/lib/content.ts` |
| Links, e-mail, nome da marca, domínio | `src/lib/site.ts` |
| Projetos (links, stack, status) | `src/lib/projects.ts` (+ texto em `content.ts`) |
| Ícones de tecnologia | `src/lib/tech.tsx` |
| Currículos (PDF) | `public/resume/` (mantenha os mesmos nomes de arquivo, ou ajuste em `site.ts`) |
| Imagens dos projetos | `public/projects/` (`alianca.jpg`, `snake.png`); a capa do RAG é um componente em `src/components/covers.tsx` |
| Cores / gradientes | `src/app/globals.css` (bloco `@theme`) |

## Adicionar um idioma

1. Em `src/lib/content.ts`, inclua o código em `Lang` e em `LANGUAGES`.
2. Copie o objeto `en`, traduza e registre em `dictionaries`. O TypeScript avisa se faltar alguma chave.
3. (Opcional) Em `src/lib/site.ts`, adicione o currículo desse idioma e uma opção em `ResumeModal.tsx`.

O seletor da navbar já é um menu e aceita quantos idiomas forem registrados.

## Domínio e deploy

- Defina `NEXT_PUBLIC_SITE_URL` (ex.: `https://gsilvatech.dev`) nas variáveis de ambiente da hospedagem; isso ajusta canonical, Open Graph, sitemap e robots.
- Vercel: importe o repositório do GitHub e faça o deploy; depois adicione o domínio em Settings → Domains.
- A imagem de compartilhamento (`/opengraph-image`) e o favicon (`/icon`) são gerados automaticamente.

## Acessibilidade

- O HTML guarda "Gabriel Ferreira" e o título fixos; a animação de descriptografia é só visual (`aria-hidden`).
- `prefers-reduced-motion`: sem embaralhar texto, sem troca animada de títulos, faixa de tecnologias estática.
- Modal de currículo com foco preso, ESC para fechar e retorno do foco; navegação por teclado nos cards.
