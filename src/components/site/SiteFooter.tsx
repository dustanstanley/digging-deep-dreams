import logo from "@/assets/myers-logo.png";
import { COMPANY, NAV_LINKS } from "@/content/site";

export const SiteFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container-prose">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-primary-foreground/15">
          <div>
            <img
              src={logo}
              alt={COMPANY.name}
              className="h-20 w-auto bg-primary-foreground/95 rounded-md p-3 mb-5"
            />
            <p className="text-primary-foreground/80 leading-relaxed text-sm max-w-xs">
              Mississippi-based underground utility contractor serving public and private clients
              across the Gulf South.
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-accent mb-4 font-sans font-semibold">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-primary-foreground/85 hover:text-accent transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-accent mb-4 font-sans font-semibold">
              Contact
            </h3>
            <ul className="space-y-2.5 text-primary-foreground/85">
              <li><a href={COMPANY.phoneHref} className="hover:text-accent">{COMPANY.phone}</a></li>
              <li>Fax: {COMPANY.fax}</li>
              <li><a href={COMPANY.emailHref} className="hover:text-accent break-all">{COMPANY.email}</a></li>
              <li className="pt-2">{COMPANY.address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p className="tracking-wider uppercase">Licensed · Insured · Bonded</p>
        </div>
      </div>
    </footer>
  );
};
