import { ShieldCheck, Award, Wrench } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="section-pad bg-background">
      <div className="container-prose grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-3">
          <p className="text-accent font-display italic text-lg mb-3">About Us</p>
          <h2 className="text-4xl md:text-5xl text-primary mb-2">
            A Mississippi tradition of underground utility excellence.
          </h2>
          <div className="accent-rule w-24 my-6" />
          <div className="space-y-5 text-foreground/85 leading-relaxed text-lg">
            <p>
              Myers Underground Utilities, LLC is a Mississippi-based contractor serving clients
              from both the public and private sector. The firm is licensed, insured, and bonded
              in the state of Mississippi and has completed projects throughout Mississippi and
              Alabama.
            </p>
            <p>
              We bring extensive experience to the construction of infrastructure for roads,
              malls, subdivisions, and numerous public works projects — including water and
              sanitary sewer systems, sewage lagoons, water treatment plants, storm drainage,
              and pumping stations.
            </p>
            <p className="font-display italic text-xl text-primary border-l-2 border-accent pl-5">
              Our mission is to pursue the business of constructing underground utilities to
              enhance the safety and general well-being of the owners and surrounding communities.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <ValueCard
            icon={Award}
            title="Experienced"
            body="Infrastructure construction for hundreds of municipalities, private developers, and general contractors across the Gulf South."
          />
          <ValueCard
            icon={Wrench}
            title="Ready"
            body="Knowledge spanning every aspect of underground utilities — we evaluate, mobilize, and execute to the highest standard."
          />
          <ValueCard
            icon={ShieldCheck}
            title="Safety-First"
            body="A safety program modeled after the best in the industry, with an outstanding record of no lost-time accidents or injuries."
          />
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
}) => (
  <div className="bg-card border border-border rounded-md p-6 shadow-card">
    <div className="flex items-center gap-3 mb-2">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary/5 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="text-2xl text-primary">{title}</h3>
    </div>
    <p className="text-muted-foreground leading-relaxed">{body}</p>
  </div>
);
