import { useEffect } from "react";
import { COMPANY, SERVICES } from "@/content/site";
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
    document.title =
      "Myers Underground Utilities | Water, Sewer & Gas Line Contractor — Hattiesburg, MS";

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
      "Licensed, insured, and bonded underground utility contractor in Hattiesburg, MS. Water, sewer, and gas lines, fire protection, pump stations, boring & site work across Mississippi & Alabama.";
    const origin = window.location.origin;
    const url = origin + "/";

    setMeta("description", desc);
    setMeta("og:title", "Myers Underground Utilities, LLC", "property");
    setMeta("og:description", desc, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", url, "property");
    setMeta("twitter:title", "Myers Underground Utilities, LLC");
    setMeta("twitter:description", desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // JSON-LD structured data
    const ldId = "ld-json-business";
    document.getElementById(ldId)?.remove();
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = ldId;
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["GeneralContractor", "LocalBusiness"],
          "@id": url + "#business",
          name: COMPANY.name,
          alternateName: COMPANY.shortName,
          url,
          telephone: COMPANY.phone,
          faxNumber: COMPANY.fax,
          email: COMPANY.email,
          image: origin + "/og-image.jpg",
          priceRange: "$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "408 Ryan Road",
            addressLocality: "Hattiesburg",
            addressRegion: "MS",
            postalCode: "39401",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 31.3271,
            longitude: -89.2903,
          },
          areaServed: [
            { "@type": "State", name: "Mississippi" },
            { "@type": "State", name: "Alabama" },
          ],
          knowsAbout: SERVICES,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Underground Utility Services",
            itemListElement: SERVICES.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s },
            })),
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "07:00",
              closes: "17:00",
            },
          ],
        },
        {
          "@type": "WebSite",
          "@id": url + "#website",
          url,
          name: COMPANY.name,
          publisher: { "@id": url + "#business" },
          inLanguage: "en-US",
        },
      ],
    });
    document.head.appendChild(ld);

    return () => {
      document.getElementById(ldId)?.remove();
    };
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
