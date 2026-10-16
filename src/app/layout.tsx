import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "devicon/devicon.min.css";
import "./globals.css";
import { SITE } from "@/lib/site";

const description =
  "Gabriel Ferreira (GSILVATECH) — Full Stack Developer and Software Engineer. I build web systems for real operations, focusing on reliable architecture, automation and production delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Gabriel Ferreira — Full Stack Developer & Software Engineer",
    template: "%s | GSILVATECH",
  },
  description,
  applicationName: "GSILVATECH",
  authors: [{ name: SITE.name, url: SITE.url }],
  keywords: [
    "Gabriel Ferreira",
    "GSILVATECH",
    "Full Stack Developer",
    "Software Engineer",
    "Desenvolvedor Fullstack",
    "Engenheiro de Software",
    "Next.js",
    "TypeScript",
    "React",
    "Python",
    "Supabase",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "GSILVATECH",
    title: "Gabriel Ferreira — Full Stack Developer & Software Engineer",
    description,
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Ferreira — Full Stack Developer & Software Engineer",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#121214",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
