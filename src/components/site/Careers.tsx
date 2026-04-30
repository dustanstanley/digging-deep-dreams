import { Briefcase, ArrowRight } from "lucide-react";
import { COMPANY } from "@/content/site";

export const Careers = () => {
  return (
    <section id="careers" className="section-pad bg-background">
      <div className="container-prose">
        <div className="bg-card border border-border rounded-md shadow-card overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 bg-primary text-primary-foreground p-10 md:p-12 flex flex-col justify-center">
              <Briefcase className="h-9 w-9 text-accent mb-5" />
              <p className="text-accent font-display italic text-base mb-2">Join Our Team</p>
              <h2 className="text-4xl md:text-5xl leading-tight">
                Careers at Myers Underground.
              </h2>
            </div>
            <div className="md:col-span-3 p-10 md:p-12 flex flex-col justify-center">
              <p className="text-foreground/85 text-lg leading-relaxed mb-5">
                Myers Underground employs dynamic professionals and provides them with the latest
                tools and the work/life flexibility to succeed.
              </p>
              <p className="text-foreground/85 text-lg leading-relaxed mb-8">
                Our people-first culture will allow you to apply your knowledge to real-world
                solutions, where your work makes a difference.
              </p>
              <a
                href={`mailto:${COMPANY.email}?subject=Careers%20Inquiry`}
                className="inline-flex items-center gap-2 self-start px-7 py-3.5 rounded-md bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition shadow-card"
              >
                Email Us About Opportunities
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
