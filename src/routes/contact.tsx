import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/site/PageHero";
import { Mail, Linkedin, Calendar, ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroContact from "@/assets/hero-contact.webp";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const nextSteps = [
  { n: "01", title: "We reply", body: "Within one business day, with sharp follow-up questions." },
  { n: "02", title: "Discovery call", body: "30 minutes. We listen, scope, and tell you whether we're the fit." },
  { n: "03", title: "Tailored proposal", body: "Clear scope, timeline, and outcomes. No template decks." },
];

type FieldErrors = { name?: string; email?: string; message?: string };

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const MAX = 800;

  const validate = (values: { name: string; email: string; message: string }): FieldErrors => {
    const e: FieldErrors = {};
    const trimmedName = values.name.trim();
    if (!trimmedName) e.name = "Please enter your name.";
    else if (trimmedName.length > 100) e.name = "Name must be under 100 characters.";

    const trimmedEmail = values.email.trim();
    if (!trimmedEmail) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) e.email = "That doesn't look like a valid email.";

    const trimmedMsg = values.message.trim();
    if (!trimmedMsg) e.message = "Please share a brief message.";
    else if (trimmedMsg.length < 10) e.message = "A bit more context helps — at least 10 characters.";
    else if (trimmedMsg.length > MAX) e.message = `Message must be under ${MAX} characters.`;

    return e;
  };

  const onBlur = (field: keyof FieldErrors) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate({ name, email, message }));
  };

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("contact@strategyengineering.co");
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:contact@strategyengineering.co";
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate({ name, email, message });
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      (e.target as HTMLFormElement).reset();
      setName("");
      setEmail("");
      setWebsite("");
      setInterest("");
      setMessage("");
      setErrors({});
      setTouched({});
      toast.success("Message sent — we'll be in touch within one business day.");
      setTimeout(() => setSent(false), 6000);
    }, 700);
  };

  return (
    <main>
      <Helmet>
        <title>Contact — Strategy Engineering</title>
        <meta name="description" content="Let's re-engineer the future. Get in touch with Strategy Engineering." />
        <meta property="og:title" content="Contact — Strategy Engineering" />
        <meta property="og:description" content="Let's re-engineer the future." />
        <meta property="og:image" content={heroContact} />
        <meta name="twitter:image" content={heroContact} />
        <link rel="canonical" href="https://strategyengineering.co/contact" />
      </Helmet>
      <PageHero eyebrow="LET'S RE-ENGINEER THE FUTURE" title="Get in touch." backgroundImage={heroContact} objectPosition="center" compact />

      <section className="bg-surface text-surface-foreground py-28 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
          {/* LEFT */}
          <Reveal>
            <p className="eyebrow text-cream-foreground/60 mb-3">// CONTACT</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-8">Let's start a conversation.</h2>

            <div className="group relative rounded-2xl border border-cream-foreground/10 p-6 hover:border-primary/60 hover:bg-background hover:text-white transition-all mb-4">
              <a
                href="mailto:contact@strategyengineering.co"
                aria-label="Email contact@strategyengineering.co"
                className="absolute inset-0 rounded-2xl"
              />
              <div className="relative flex items-center justify-between gap-4 pointer-events-none">
                <div className="min-w-0">
                  <p className="eyebrow text-primary mb-2 flex items-center gap-2">
                    <Mail className="size-3.5" /> EMAIL US
                  </p>
                  <p className="font-display text-xl font-medium tracking-tight truncate">contact@strategyengineering.co</p>
                  <p className="text-xs mt-2 opacity-60">We reply within one business day.</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
                  <button
                    type="button"
                    onClick={onCopy}
                    aria-label="Copy email address"
                    className="relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full border border-cream-foreground/15 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </button>
                  <ArrowUpRight className="size-5 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                </div>
              </div>
            </div>

            <a
              href="mailto:contact@strategyengineering.co?subject=30-min%20discovery%20call"
              className="block group rounded-2xl border border-cream-foreground/10 p-6 hover:border-primary/60 hover:bg-background hover:text-white transition-all mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-primary mb-2 flex items-center gap-2">
                    <Calendar className="size-3.5" /> BOOK A CALL
                  </p>
                  <p className="font-display text-xl font-medium tracking-tight">30-min discovery call</p>
                  <p className="text-xs mt-2 opacity-60">Talk through your challenge with no obligation.</p>
                </div>
                <ArrowUpRight className="size-5 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
              </div>
            </a>

            <div className="mb-12">
              <p className="eyebrow text-cream-foreground/60 mb-3">// FOLLOW</p>
              <a
                href="https://www.linkedin.com/company/strategy-engineering-co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Strategy Engineering on LinkedIn (opens in new tab)"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-cream-foreground/15 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Linkedin className="size-5" />
              </a>
            </div>

            {/* What happens next */}
            <div className="border-t border-cream-foreground/10 pt-10">
              <p className="eyebrow text-cream-foreground/55 mb-6">// WHAT HAPPENS NEXT</p>
              <ol className="space-y-5">
                {nextSteps.map((s) => (
                  <li key={s.n} className="flex gap-5">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-primary mt-1 shrink-0">{s.n}</span>
                    <div>
                      <h4 className="font-display text-lg font-medium tracking-tight">{s.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* RIGHT — Form */}
          <Reveal delay={120}>
            <p className="eyebrow text-cream-foreground/60 mb-3">// MESSAGE</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">Tell us what you're solving.</h2>
            <p className="text-muted-foreground mb-10">We believe in understanding your unique needs before taking the next step.</p>

            <div className="relative">
              {/* Success overlay */}
              <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-surface/95 backdrop-blur-sm rounded-2xl transition-all duration-500 ${
                  sent ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {sent && (
                  <svg viewBox="0 0 80 80" className="w-20 h-20 mb-6">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="var(--primary)" strokeWidth="2" className="circle-path" />
                    <path d="M26 41 L36 51 L55 30" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-path" />
                  </svg>
                )}
                <h3 className="font-display text-2xl font-medium tracking-tight mb-2">Message sent.</h3>
                <p className="text-sm text-muted-foreground max-w-xs">We'll be in touch within one business day.</p>
              </div>

              <form onSubmit={onSubmit} noValidate className={`space-y-2 transition-opacity duration-300 ${sent ? "opacity-30" : "opacity-100"}`}>
                <div className={`float-field ${touched.name && errors.name ? "field-error" : ""}`}>
                  <input
                    id="contact-name"
                    name="name"
                    placeholder=" "
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={onBlur("name")}
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? "err-name" : undefined}
                  />
                  <label htmlFor="contact-name">Your name *</label>
                  {touched.name && errors.name && (
                    <p id="err-name" className="field-error-text" role="alert">{errors.name}</p>
                  )}
                </div>
                <div className={`float-field ${touched.email && errors.email ? "field-error" : ""}`}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder=" "
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={onBlur("email")}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? "err-email" : undefined}
                  />
                  <label htmlFor="contact-email">Email *</label>
                  {touched.email && errors.email && (
                    <p id="err-email" className="field-error-text" role="alert">{errors.email}</p>
                  )}
                </div>
                <div className="float-field">
                  <input
                    id="contact-website"
                    name="website"
                    placeholder=" "
                    autoComplete="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <label htmlFor="contact-website">Company website</label>
                </div>
                <div className="float-field float-field-select">
                  <select
                    id="contact-interest"
                    name="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className={interest ? "has-value" : ""}
                  >
                    <option value="" disabled hidden></option>
                    <option value="process">Process Improvement</option>
                    <option value="automation">Automation & AI</option>
                    <option value="strategy">Strategy & Transformation</option>
                    <option value="sustainability">Sustainability & Impact</option>
                    <option value="gtm">GTM Engineering</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                  <label htmlFor="contact-interest">I'm interested in…</label>
                  <svg
                    aria-hidden
                    viewBox="0 0 12 8"
                    className="pointer-events-none absolute right-1 bottom-3 w-3 h-2 opacity-60"
                  >
                    <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={`float-field ${touched.message && errors.message ? "field-error" : ""}`}>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder=" "
                    maxLength={MAX}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={onBlur("message")}
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? "err-message" : undefined}
                  />
                  <label htmlFor="contact-message">Your message *</label>
                  <div className="flex justify-between items-center mt-1 gap-3">
                    <span className="min-w-0 flex-1">
                      {touched.message && errors.message && (
                        <span id="err-message" className="field-error-text" role="alert">{errors.message}</span>
                      )}
                    </span>
                    <span
                      className={`font-mono text-[10px] tracking-[0.18em] uppercase transition-colors shrink-0 ${
                        message.length > MAX * 0.9 ? "text-primary" : "text-cream-foreground/40"
                      }`}
                    >
                      {message.length} / {MAX}
                    </span>
                  </div>
                </div>

                <div className="pt-6">
                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    className="group items-center gap-2 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-60 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide"
                  >
                    {submitting ? "Sending…" : "Send message"}
                    {submitting ? null : <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />}
                    {sent && <Check className="size-4" />}
                  </MagneticButton>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
