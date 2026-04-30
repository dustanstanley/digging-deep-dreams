import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Printer, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { COMPANY } from "@/content/site";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  projectType: z.string().min(1, "Select a project type"),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

const PROJECT_TYPES = [
  "Water / Sewer Main",
  "Fire Protection",
  "Pump Station / Force Main",
  "Storm Drainage",
  "Site Work / Road Building",
  "Boring & Tunneling",
  "Other",
];

export const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectType, setProjectType] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      projectType,
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErr: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fieldErr[String(i.path[0])] = i.message; });
      setErrors(fieldErr);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Open user's email client with prefilled details (no backend required yet)
    const subject = `Project Inquiry — ${parsed.data.projectType}`;
    const body =
      `Name: ${parsed.data.name}\n` +
      (parsed.data.company ? `Company: ${parsed.data.company}\n` : "") +
      `Email: ${parsed.data.email}\n` +
      `Phone: ${parsed.data.phone}\n` +
      `Project Type: ${parsed.data.projectType}\n\n` +
      `${parsed.data.message}\n`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast({
      title: "Opening your email",
      description: "Your inquiry has been prepared. Please send it from your mail app.",
    });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="section-pad bg-secondary/40 border-t border-border">
      <div className="container-prose">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-accent font-display italic text-lg mb-3">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl text-primary">Let's discuss your project.</h2>
          <div className="accent-rule w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg">
            Reach out by phone, email, or send us a few details about your project below.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact details */}
          <div className="lg:col-span-2 space-y-6">
            <ContactRow icon={Phone} label="Office" value={COMPANY.phone} href={COMPANY.phoneHref} />
            <ContactRow icon={Printer} label="Fax" value={COMPANY.fax} />
            <ContactRow icon={Mail} label="Email" value={COMPANY.email} href={COMPANY.emailHref} />
            <ContactRow icon={MapPin} label="Office" value={COMPANY.addressShort} />

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${COMPANY.mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md overflow-hidden border border-border shadow-card group"
              aria-label="Open address in Google Maps"
            >
              <iframe
                title="Map of Myers Underground Utilities"
                src={`https://www.google.com/maps?q=${COMPANY.mapQuery}&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-card border border-border rounded-md p-8 md:p-10 shadow-card space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" name="name" error={errors.name} required />
              <Field label="Company" name="company" error={errors.company} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Email" name="email" type="email" error={errors.email} required />
              <Field label="Phone" name="phone" type="tel" error={errors.phone} required />
            </div>
            <div>
              <Label htmlFor="projectType" className="text-foreground">Project Type <span className="text-accent">*</span></Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger id="projectType" className="mt-1.5">
                  <SelectValue placeholder="Select a project type" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType && <p className="text-sm text-destructive mt-1">{errors.projectType}</p>}
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground">Project Details <span className="text-accent">*</span></Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1.5"
                placeholder="Briefly describe scope, location, and timeline."
                maxLength={2000}
              />
              {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition shadow-card disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Sending…" : "Send Inquiry"}
            </button>
            <p className="text-xs text-muted-foreground">
              Or call us directly at{" "}
              <a className="text-accent font-medium" href={COMPANY.phoneHref}>{COMPANY.phone}</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label, name, type = "text", error, required,
}: { label: string; name: string; type?: string; error?: string; required?: boolean }) => (
  <div>
    <Label htmlFor={name} className="text-foreground">
      {label} {required && <span className="text-accent">*</span>}
    </Label>
    <Input id={name} name={name} type={type} className="mt-1.5" maxLength={255} />
    {error && <p className="text-sm text-destructive mt-1">{error}</p>}
  </div>
);

const ContactRow = ({
  icon: Icon, label, value, href,
}: { icon: typeof Phone; label: string; value: string; href?: string }) => (
  <div className="flex items-start gap-4">
    <span className="inline-flex items-center justify-center h-11 w-11 rounded-md bg-primary text-primary-foreground flex-shrink-0">
      <Icon className="h-5 w-5" />
    </span>
    <div className="pt-1">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{label}</div>
      {href ? (
        <a href={href} className="text-lg text-foreground hover:text-accent font-medium transition-colors">{value}</a>
      ) : (
        <div className="text-lg text-foreground font-medium">{value}</div>
      )}
    </div>
  </div>
);
