import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/content/site";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="section-pad bg-primary text-primary-foreground relative overflow-hidden">
      <div className="container-prose relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-accent font-display italic text-lg mb-3">In Their Words</p>
          <h2 className="text-4xl md:text-5xl">What our clients say.</h2>
          <div className="accent-rule w-24 mx-auto my-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col bg-primary-foreground/5 border border-primary-foreground/10 rounded-md p-7 backdrop-blur-sm"
            >
              <Quote className="h-8 w-8 text-accent mb-4" aria-hidden />
              <blockquote className="font-display italic text-lg leading-relaxed text-primary-foreground/95 flex-1">
                {t.quote}
              </blockquote>
              <div className="accent-rule w-12 my-5" />
              <figcaption className="text-sm">
                <div className="font-semibold tracking-wide">{t.name}</div>
                <div className="text-primary-foreground/70">{t.company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
