import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "They didn't just hand us a strategy deck. They shipped the automation, trained our team, and we kept the gains.",
    role: "Operations Director",
    org: "Global FMCG",
  },
  {
    text: "Every consultant promises transformation. Strategy Engineering is the only one that engineered it end-to-end.",
    role: "Chief Operating Officer",
    org: "UK Home & Living",
  },
  {
    text: "We expected a roadmap. We got a working AI workflow live in five weeks, with a 38% reduction in cycle time.",
    role: "Head of Transformation",
    org: "National Energy",
  },
];

export function TestimonialCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-label="Client testimonials"
      aria-roledescription="carousel"
      className="bg-surface text-surface-foreground py-28 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-grain pointer-events-none" />
      <div className="mx-auto max-w-5xl text-center relative">
        <p className="eyebrow text-cream-foreground/55 mb-8">// IN THEIR WORDS</p>
        <Quote className="size-10 text-primary mx-auto mb-8 opacity-80" strokeWidth={1.2} />
        <div className="relative min-h-[200px] md:min-h-[180px]" aria-live="polite">
          {quotes.map((q, idx) => (
            <blockquote
              key={idx}
              aria-hidden={i !== idx}
              className="absolute inset-0 transition-all duration-700 ease-out px-2"
              style={{
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? "translateY(0)" : "translateY(12px)",
                pointerEvents: i === idx ? "auto" : "none",
              }}
            >
              <p className="font-display text-2xl md:text-4xl font-light italic leading-snug tracking-tight max-w-4xl mx-auto">
                "{q.text}"
              </p>
              <footer className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-cream-foreground/60">
                {q.role} <span className="text-primary">·</span> {q.org}
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-12 relative">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to testimonial ${idx + 1} of ${quotes.length}`}
              aria-current={i === idx ? "true" : undefined}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-10 bg-primary" : "w-2 bg-cream-foreground/15 hover:bg-cream-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
