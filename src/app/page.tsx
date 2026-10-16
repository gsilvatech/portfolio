import { About } from "@/components/About";
import { Contact, Footer } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Providers } from "@/components/Providers";
import { TechStrip } from "@/components/TechStrip";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: SITE.brand,
  url: SITE.url,
  jobTitle: "Full Stack Developer",
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.github, SITE.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Volta Redonda",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  knowsLanguage: ["pt-BR", "en"],
};

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <TechStrip />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Providers>
  );
}
