import founderImg from "@/assets/myers-father-son.png";

export const Founder = () => {
  return (
    <section className="section-pad bg-secondary/40 border-y border-border">
      <div className="container-prose grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="order-2 md:order-1">
          <p className="text-accent font-display italic text-lg mb-3">Three Generations Strong</p>
          <h2 className="text-4xl md:text-5xl text-primary leading-tight">
            Built on a foundation of safety, quality, and service.
          </h2>
          <div className="accent-rule w-24 my-6" />
          <div className="space-y-5 text-foreground/85 leading-relaxed text-lg">
            <p>
              Peyton Myers, owner and third-generation contractor, has built the company on the
              values passed down from his father, Bill Myers — a commitment to honest work, a
              skilled crew, and projects delivered on schedule.
            </p>
            <p>
              That family legacy still defines how Myers Underground operates today. Our employees
              are our most important resource, and we are committed to their safety and to the
              communities we serve.
            </p>
            <blockquote className="font-display italic text-2xl text-primary border-l-2 border-accent pl-6 mt-8">
              "Our primary objective is always the same: deliver high quality professional
              services that are result oriented."
              <footer className="not-italic font-sans text-sm text-muted-foreground mt-3 tracking-wide">
                — Peyton Myers, Owner
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="absolute -inset-4 bg-primary/5 rounded-lg -z-10" />
          <img
            src={founderImg}
            alt="Bill Myers and Peyton Myers — three generations of underground utility contractors"
            className="w-full h-auto object-contain max-h-[560px] mx-auto"
            loading="lazy"
          />
          <p className="mt-4 text-center text-sm text-muted-foreground font-display italic">
            Bill Myers &amp; Peyton Myers
          </p>
        </div>
      </div>
    </section>
  );
};
