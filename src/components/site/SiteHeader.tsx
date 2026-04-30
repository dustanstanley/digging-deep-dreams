import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoLight from "@/assets/myers-logo-light.png";
import logoDark from "@/assets/myers-logo-dark.png";
import { NAV_LINKS, COMPANY } from "@/content/site";
import { cn } from "@/lib/utils";

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/95 backdrop-blur border-b border-border shadow-card"
          : "bg-transparent"
      )}
    >
      <div className="container-prose flex items-center justify-between h-20">
        <a href="#top" className="relative flex items-center gap-3" aria-label={COMPANY.name}>
          <div className="relative h-12 md:h-14 w-[140px] md:w-[160px]">
            <img
              src={logoLight}
              alt={`${COMPANY.shortName} logo`}
              className={cn(
                "absolute inset-0 h-full w-auto transition-opacity duration-200",
                scrolled || open ? "opacity-0" : "opacity-100"
              )}
            />
            <img
              src={logoDark}
              alt=""
              aria-hidden="true"
              className={cn(
                "absolute inset-0 h-full w-auto transition-opacity duration-200",
                scrolled || open ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                scrolled
                  ? "text-foreground hover:text-accent"
                  : "text-primary-foreground hover:text-accent"
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition"
          >
            {COMPANY.phone}
          </a>
        </nav>

        <button
          className={cn(
            "lg:hidden p-2 rounded-md transition-colors",
            scrolled || open ? "text-foreground" : "text-primary-foreground"
          )}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-prose py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground hover:text-accent py-2 border-b border-border/50"
              >
                {l.label}
              </a>
            ))}
            <a
              href={COMPANY.phoneHref}
              className="mt-2 inline-flex justify-center items-center px-5 py-3 rounded-md bg-accent text-accent-foreground font-medium"
            >
              Call {COMPANY.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
