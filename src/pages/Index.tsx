import { useEffect } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Founder } from "@/components/site/Founder";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { Careers } from "@/components/site/Careers";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";

const Index = () => {
  useEffect(() => {
    document.title = "Myers Underground Utilities | Water, Sewer & Gas Lines — Hattiesburg, MS";

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const desc =
      "Mississippi-based underground utility contractor. Water, sewer, and gas lines for commercial, industrial, and subdivision projects across MS & AL. Licensed, insured, and bonded.";
    setMeta("description", desc);
    setMeta("og:title", "Myers Underground Utilities, LLC", "property");
    setMeta("og:description", desc, "property");
    setMeta("og:type", "website", "property");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + "/";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Founder />
        <Services />
        <Projects />
        <Testimonials />
        <Careers />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
