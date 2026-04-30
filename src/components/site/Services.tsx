import {
  Droplets,
  Waves,
  Flame,
  Gauge,
  CircleDot,
  Factory,
  Cog,
  Sprout,
  CloudRain,
  Construction,
  Hammer,
  TreePine,
  Drill,
} from "lucide-react";
import { SERVICES } from "@/content/site";

const ICONS = [
  Droplets, Waves, Flame, Gauge, CircleDot, Factory, Cog,
  Sprout, CloudRain, Construction, Hammer, TreePine, Drill,
];

export const Services = () => {
  return (
    <section id="services" className="section-pad bg-background">
      <div className="container-prose">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-accent font-display italic text-lg mb-3">What We Do</p>
          <h2 className="text-4xl md:text-5xl text-primary">A full range of underground capabilities.</h2>
          <div className="accent-rule w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg">
            From the first survey to final tie-in, our crews handle every phase of underground
            utility construction with the same standard of craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i] ?? CircleDot;
            return (
              <div
                key={service}
                className="group flex items-center gap-4 p-5 bg-card border border-border rounded-md hover:border-accent hover:shadow-card transition-all"
              >
                <span className="inline-flex items-center justify-center h-11 w-11 rounded-md bg-primary/5 text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-medium text-foreground leading-tight">{service}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
