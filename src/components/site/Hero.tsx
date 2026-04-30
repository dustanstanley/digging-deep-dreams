import { Phone } from "lucide-react";
import heroImg from "@/assets/home-office.png";
import { COMPANY } from "@/content/site";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Myers Underground Utilities home office"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      <div className="relative container-prose text-primary-foreground py-32 md:py-40">
        <p className="fade-up font-display italic text-accent text-lg md:text-xl mb-4 tracking-wide">
          Serving {COMPANY.serviceArea}
        </p>
        <h1 className="fade-up font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl">
          Water, Sewer<br />and Gas Lines.
        </h1>
        <div className="fade-up mt-6 max-w-2xl space-y-1 text-lg md:text-xl text-primary-foreground/85">
          <p>Commercial · Industrial · Subdivisions</p>
          <p>Sitework · Road Bores · Concrete</p>
        </div>
        <div className="fade-up mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3.5 rounded-md bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition shadow-elegant"
          >
            Request a Quote
          </a>
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-primary-foreground/40 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition"
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phone}
          </a>
        </div>
        <p className="fade-up mt-12 text-sm text-primary-foreground/70 tracking-wider uppercase">
          Licensed · Insured · Bonded in Mississippi
        </p>
      </div>
    </section>
  );
};
