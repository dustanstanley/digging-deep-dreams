import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_CATEGORIES, ALL_PROJECTS } from "@/content/site";
import { cn } from "@/lib/utils";

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="section-pad bg-secondary/40 border-y border-border">
      <div className="container-prose">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-accent font-display italic text-lg mb-3">Selected Projects</p>
          <h2 className="text-4xl md:text-5xl text-primary">Decades of work across the Gulf South.</h2>
          <div className="accent-rule w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg">
            A sample of projects completed for municipalities, developers, hospitals, schools,
            and industrial clients throughout Mississippi and Alabama.
          </p>
        </div>

        <Tabs defaultValue={PROJECT_CATEGORIES[0].id} className="w-full">
          <TabsList className="flex flex-wrap h-auto justify-center bg-transparent gap-2 mb-8">
            {PROJECT_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2.5 rounded-md border border-border bg-card text-foreground text-sm font-medium"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {PROJECT_CATEGORIES.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="bg-card border border-border rounded-md p-8 md:p-10 shadow-card">
                <p className="text-muted-foreground text-lg mb-6 max-w-3xl">{cat.blurb}</p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {cat.highlights.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0 sm:[&:nth-last-child(2)]:border-0"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition"
            aria-expanded={showAll}
          >
            {showAll ? "Hide full project list" : `View all ${ALL_PROJECTS.length} projects`}
            <ChevronDown className={cn("h-4 w-4 transition-transform", showAll && "rotate-180")} />
          </button>

          {showAll && (
            <div className="fade-up mt-8 bg-card border border-border rounded-md p-8 md:p-10 text-left shadow-card">
              <h3 className="text-2xl text-primary mb-6">Complete Project List</h3>
              <ul className="columns-1 md:columns-2 gap-x-10 space-y-2.5">
                {ALL_PROJECTS.map((p) => (
                  <li key={p} className="break-inside-avoid text-foreground/85 leading-snug pl-4 relative">
                    <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
