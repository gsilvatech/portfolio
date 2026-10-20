/**
 * Todo o texto do site vive aqui. Para adicionar um idioma novo:
 *  1. inclua o código em `Lang` e em `LANGUAGES`;
 *  2. copie o objeto `en`, traduza e registre em `dictionaries`.
 * O TypeScript avisa se alguma chave estiver faltando.
 */
export type Lang = "en" | "pt";

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "pt", label: "Português (Brasil)", short: "PT" },
];

const en = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    resume: "Resume",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    home: "Back to top",
    skip: "Skip to content",
  },
  hero: {
    greeting: "my name is",
    roleSr: "Full Stack Developer and Software Engineer",
    tagline:
      "I build web systems that solve real operations, with solid architecture, automation and production delivery.",
    github: "GitHub",
    linkedin: "LinkedIn",
    resume: "Download resume",
  },
  about: {
    label: "About",
    title: "A bit about my path",
    summaryLabel: "My path",
    summary: [
      "I came into software from the industrial world: a Mechatronics technician with a background in quality inspection and IT support. That path taught me to find root causes, stay calm under pressure and care about systems that simply don't go down.",
      "Today I'm a Software Engineer Intern at Automate Army, a remote US team, building backend features for an internal platform — REST APIs, MCP integrations and data ingestion with TypeScript, React and Next.js on Google Cloud. On my own, I built Aliança Barber System, a multi-tenant SaaS already used by a real barbershop.",
    ],
    productionLabel: "In production",
    productionMetric: "40%",
    productionText:
      "less time to book, with no double-bookings, in Aliança Barber System — used by real clients and users.",
    englishLabel: "Beyond code",
    englishTitle: "Fluent English & simultaneous interpreter",
    englishText:
      "I use English every day at work, and since 2023 I've interpreted English/Portuguese simultaneously at international events.",
    toolboxLabel: "Technical toolbox",
    toolbox: [
      {
        name: "Backend & APIs",
        items: ["REST APIs", "MCP", "Node.js", "FastAPI", "Google Workspace API"],
      },
      {
        name: "Data",
        items: ["PostgreSQL", "Supabase (RLS, Auth)", "ClickHouse", "MySQL"],
      },
      {
        name: "Cloud & AI",
        items: ["Google Cloud", "Docker", "CI/CD", "RAG", "Gemini API"],
      },
    ],
    challengesLabel: "Challenges I like to solve",
    challenges: [
      "Designing secure multi-tenant architectures where every customer's data stays isolated.",
      "Turning messy business rules into reliable systems, like a booking engine that can't double-book.",
      "Automating repetitive operations, such as employee onboarding and offboarding.",
      "Making LLMs useful on real documents through retrieval (RAG).",
    ],
    educationLabel: "Education",
    education: [
      {
        title: "B.S. in Software Engineering",
        place: "Anhanguera University",
        meta: "6th semester · expected June 2027",
      },
      {
        title: "Technical Degree in Mechatronics",
        place: "Instituto de Cultura Técnica",
        meta: "December 2020",
      },
    ],
    locationLabel: "Based in",
    locationTitle: "Volta Redonda, RJ — Brazil",
    locationText: "Collaborating with international teams, in English.",
  },
  tech: {
    label: "Technologies I work with",
    documentation: "Open documentation for",
  },
  projects: {
    label: "Projects",
    title: "Things I've built",
    hint: "Select a card to see the details.",
    expand: "Show details",
    collapse: "Hide details",
    badges: {
      production: "In production",
      live: "Live demo",
      study: "Study project",
    },
    stackLabel: "Technologies",
    items: {
      alianca: {
        summary:
          "The management system I built for Aliança Barber Club, a barbershop in Brazil. A multi-tenant SaaS with a 4-step booking flow, CRM, financial dashboard, inventory control and subscription plans.",
        bullets: [
          "Booking engine with business-rule analysis and database RPCs: 40% less scheduling time and no double-bookings.",
          "Row Level Security and PKCE authentication in Supabase keep each business's data isolated.",
          "Delivered end to end, from requirements to deploy, with real clients and users.",
        ],
        note: "Exploring the app requires creating an account.",
        primary: "Visit website",
        alt: "Dashboard and mobile screens of the Aliança Barber System",
      },
      rag: {
        summary:
          "A document-analysis chatbot. Upload up to 3 PDFs, then ask questions and get answers grounded in their content.",
        bullets: [
          "Full RAG pipeline: chunking, embeddings and semantic retrieval over the uploaded PDFs.",
          "Python and FastAPI backend, Next.js interface, Google Gemini for generation and ChromaDB for vector search.",
          "Live on Vercel.",
        ],
        note: "The demo depends on API credits, so it may occasionally be unavailable.",
        primary: "Online demo",
        alt: "Illustration of the RAG Chatbot interface",
      },
      snake: {
        summary:
          "A classic Snake game built with vanilla JavaScript, HTML and CSS — a study project to practice game-loop logic, keyboard input, collision detection and score tracking.",
        bullets: [
          "Built without frameworks to master the fundamentals of the language and the DOM.",
          "Game loop, collision detection and high-score tracking.",
          "Playable in the browser, hosted on GitHub Pages.",
        ],
        note: "",
        primary: "Play now",
        alt: "Screenshot of the Snake game",
      },
    },
    code: "View code",
  },
  experience: {
    label: "Experience",
    title: "Where I've worked",
    current: "Current",
    items: [
      {
        company: "Automate Army",
        location: "United States (Remote)",
        role: "Software Engineer Intern",
        period: "Sep 2026 – Present",
        current: true,
        metric: "",
        bullets: [
          "Work in a fully international environment, conducting all technical communication, documentation and team collaboration in English.",
          "Develop backend features for the internal platform that the company runs on, focusing on REST API architecture, MCP (Model Context Protocol) integrations and data ingestion, using TypeScript, React.js and Next.js on Google Cloud Platform.",
          "Co-developed a time-tracking timer integrated with Plane that logs hours by ticket, replacing Clockify and reducing software costs.",
          "Build automated employee onboarding and offboarding workflows integrated with Google Workspace and Identity-Aware Proxy (IAP).",
          "Contribute to architectural decisions and structural improvements; study ClickHouse and PostgreSQL for the data layer.",
        ],
      },
      {
        company: "Cesar Garcia TI",
        location: "Volta Redonda, RJ, Brazil",
        role: "IT Technician",
        period: "Oct 2024 – Aug 2025",
        current: false,
        metric: "−25% downtime",
        bullets: [
          "Diagnosed and resolved hardware and software failures, reducing corporate client downtime by 25%.",
          "Installed and configured networks and servers, ensuring high infrastructure availability.",
        ],
      },
      {
        company: "Projeto Vida (Events)",
        location: "Volta Redonda, RJ, Brazil",
        role: "Simultaneous Interpreter (On-demand)",
        period: "Dec 2023 – Present",
        current: false,
        metric: "",
        bullets: [
          "Delivered real-time English/Portuguese interpretation at international events, communicating clearly and accurately under pressure.",
        ],
      },
    ],
  },
  contact: {
    label: "Contact",
    title: "Let’s talk",
    subtitle: "Get in touch.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
  },
  footer: {
    rights: "All rights reserved.",
  },
  resumeModal: {
    title: "Download resume",
    subtitle: "Choose the version in your language.",
    close: "Close",
    ptTitle: "Currículo PT/BR",
    ptMeta: "PDF · Português",
    enTitle: "English Resume",
    enMeta: "PDF · English",
  },
};

export type Dict = typeof en;

const pt: Dict = {
  nav: {
    about: "Sobre",
    projects: "Projetos",
    experience: "Experiência",
    contact: "Contato",
    resume: "Currículo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
    home: "Voltar ao topo",
    skip: "Pular para o conteúdo",
  },
  hero: {
    greeting: "meu nome é",
    roleSr: "Desenvolvedor Fullstack e Engenheiro de Software",
    tagline:
      "Construo sistemas web que resolvem operações reais, com arquitetura sólida, automação e entrega em produção.",
    github: "GitHub",
    linkedin: "LinkedIn",
    resume: "Baixar currículo",
  },
  about: {
    label: "Sobre",
    title: "Um pouco da minha trajetória",
    summaryLabel: "Minha trajetória",
    summary: [
      "Cheguei ao software vindo do mundo industrial: sou técnico em Mecatrônica, com experiência em inspeção de qualidade e suporte de TI. Esse caminho me ensinou a encontrar a causa raiz dos problemas, manter a calma sob pressão e me importar com sistemas que simplesmente não caem.",
      "Hoje sou Estagiário de Engenharia de Software na Automate Army, uma equipe remota dos Estados Unidos, desenvolvendo funcionalidades backend de uma plataforma interna — APIs REST, integrações MCP e ingestão de dados com TypeScript, React e Next.js no Google Cloud. Por conta própria, criei o Aliança Barber System, um SaaS multitenancy que já é usado por uma barbearia real.",
    ],
    productionLabel: "Em produção",
    productionMetric: "40%",
    productionText:
      "menos tempo para agendar, sem conflitos de horário, no Aliança Barber System — usado por clientes e usuários reais.",
    englishLabel: "Além do código",
    englishTitle: "Inglês fluente e intérprete simultâneo",
    englishText:
      "Uso inglês todos os dias no trabalho e, desde 2023, faço interpretação simultânea inglês/português em eventos internacionais.",
    toolboxLabel: "Bagagem técnica",
    toolbox: [
      {
        name: "Backend e APIs",
        items: ["REST APIs", "MCP", "Node.js", "FastAPI", "Google Workspace API"],
      },
      {
        name: "Dados",
        items: ["PostgreSQL", "Supabase (RLS, Auth)", "ClickHouse", "MySQL"],
      },
      {
        name: "Cloud e IA",
        items: ["Google Cloud", "Docker", "CI/CD", "RAG", "Gemini API"],
      },
    ],
    challengesLabel: "Desafios que gosto de resolver",
    challenges: [
      "Projetar arquiteturas multitenancy seguras, em que os dados de cada cliente ficam isolados.",
      "Transformar regras de negócio confusas em sistemas confiáveis, como um motor de reservas que não permite conflito de horário.",
      "Automatizar operações repetitivas, como o onboarding e o offboarding de colaboradores.",
      "Tornar LLMs úteis em documentos reais por meio de recuperação de contexto (RAG).",
    ],
    educationLabel: "Formação",
    education: [
      {
        title: "Bacharelado em Engenharia de Software",
        place: "Universidade Anhanguera",
        meta: "6º semestre · previsão: junho de 2027",
      },
      {
        title: "Técnico em Mecatrônica",
        place: "Instituto de Cultura Técnica",
        meta: "Dezembro de 2020",
      },
    ],
    locationLabel: "Baseado em",
    locationTitle: "Volta Redonda, RJ — Brasil",
    locationText: "Colaborando com times internacionais, em inglês.",
  },
  tech: {
    label: "Tecnologias com as quais trabalho",
    documentation: "Abrir documentação de",
  },
  projects: {
    label: "Projetos",
    title: "O que eu já construí",
    hint: "Selecione um card para ver os detalhes.",
    expand: "Ver detalhes",
    collapse: "Ocultar detalhes",
    badges: {
      production: "Em produção",
      live: "Demo online",
      study: "Projeto de estudo",
    },
    stackLabel: "Tecnologias",
    items: {
      alianca: {
        summary:
          "O sistema de gestão que desenvolvi para a Aliança Barber Club, uma barbearia no Brasil. Um SaaS multitenancy com agendamento em 4 passos, CRM, painel financeiro, controle de estoque e planos de assinatura.",
        bullets: [
          "Motor de reservas com análise de regras de negócio e RPCs no banco: 40% menos tempo de agendamento e sem conflitos de horário.",
          "Row Level Security e autenticação PKCE no Supabase mantêm os dados de cada negócio isolados.",
          "Entregue ponta a ponta, do levantamento de requisitos ao deploy, com clientes e usuários reais.",
        ],
        note: "Para explorar o app é necessário criar uma conta.",
        primary: "Visitar o site",
        alt: "Painel e telas mobile do Aliança Barber System",
      },
      rag: {
        summary:
          "Um chatbot de análise de documentos. Envie até 3 PDFs, faça perguntas e receba respostas baseadas no conteúdo deles.",
        bullets: [
          "Pipeline RAG completo: chunking, embeddings e recuperação semântica sobre os PDFs enviados.",
          "Backend em Python e FastAPI, interface em Next.js, Google Gemini para geração e ChromaDB para busca vetorial.",
          "Em produção na Vercel.",
        ],
        note: "A demo depende de créditos de API, então pode ficar indisponível ocasionalmente.",
        primary: "Demo online",
        alt: "Ilustração da interface do RAG Chatbot",
      },
      snake: {
        summary:
          "Um jogo da cobrinha (Snake) clássico em JavaScript, HTML e CSS puros — um projeto de estudo para praticar lógica de game loop, entrada de teclado, detecção de colisão e contagem de pontos.",
        bullets: [
          "Feito sem frameworks para dominar os fundamentos da linguagem e do DOM.",
          "Game loop, detecção de colisão e recorde de pontuação.",
          "Jogável no navegador, hospedado no GitHub Pages.",
        ],
        note: "",
        primary: "Jogar agora",
        alt: "Captura de tela do jogo Snake",
      },
    },
    code: "Ver código",
  },
  experience: {
    label: "Experiência",
    title: "Por onde passei",
    current: "Atual",
    items: [
      {
        company: "Automate Army",
        location: "Estados Unidos (Remoto)",
        role: "Estagiário de Engenharia de Software",
        period: "Set 2026 – Atual",
        current: true,
        metric: "",
        bullets: [
          "Atuo em ambiente totalmente internacional, com toda a comunicação técnica, documentação e colaboração em equipe em inglês.",
          "Desenvolvo funcionalidades backend da plataforma interna em torno da qual toda a empresa opera, com foco em arquitetura de APIs REST, integrações MCP (Model Context Protocol) e ingestão de dados, usando TypeScript, React.js e Next.js no Google Cloud Platform.",
          "Co-desenvolvi um timer integrado ao Plane que contabiliza as horas por ticket, substituindo o Clockify e reduzindo custos com software.",
          "Construo fluxos automatizados de onboarding e offboarding de colaboradores, integrados ao Google Workspace e ao Identity-Aware Proxy (IAP).",
          "Contribuo em decisões de arquitetura e melhorias estruturais; estudo ClickHouse e PostgreSQL para a camada de dados.",
        ],
      },
      {
        company: "Cesar Garcia TI",
        location: "Volta Redonda, RJ",
        role: "Técnico de Informática",
        period: "Out 2024 – Ago 2025",
        current: false,
        metric: "−25% de downtime",
        bullets: [
          "Diagnostiquei e resolvi falhas de hardware e software, reduzindo em 25% o downtime dos sistemas de clientes corporativos.",
          "Instalei e configurei redes e servidores, garantindo alta disponibilidade da infraestrutura.",
        ],
      },
      {
        company: "Projeto Vida (Eventos)",
        location: "Volta Redonda, RJ",
        role: "Intérprete Simultâneo (Sob demanda)",
        period: "Dez 2023 – Atual",
        current: false,
        metric: "",
        bullets: [
          "Realizei interpretação simultânea inglês/português em eventos internacionais, com comunicação clara e precisa sob pressão.",
        ],
      },
    ],
  },
  contact: {
    label: "Contato",
    title: "Vamos conversar?",
    subtitle: "Entre em contato.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "E-mail",
  },
  footer: {
    rights: "Todos os direitos reservados",
  },
  resumeModal: {
    title: "Baixar currículo",
    subtitle: "Escolha a versão no seu idioma.",
    close: "Fechar",
    ptTitle: "Currículo PT/BR",
    ptMeta: "PDF · Português",
    enTitle: "English Resume",
    enMeta: "PDF · English",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, pt };

/** Títulos que alternam no hero (sempre em português e inglês, como no briefing). */
export const ROTATING_TITLES = [
  "Full Stack Developer",
  "Software Engineer",
  "Backend & Automation",
  "LLM & IA",
];
