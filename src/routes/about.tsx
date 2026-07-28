import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/site/PageHero";
import { Linkedin, ArrowUpRight } from "lucide-react";
import lightbulb from "@/assets/lightbulb-sky.webp";
import seanGoh from "@/assets/team-sean-goh.webp";
import nadzim from "@/assets/team-nadzim-zahari.webp";
import jonQuah from "@/assets/team-jon-quah.webp";
import seanMorais from "@/assets/team-sean-morais.webp";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/about")({
  component: About,
});

const team = [
  { name: "Sean Goh", role: "Senior Business Process Manager", edu: "MEng Electrical & Electronic Engineering", quote: "Most processes don't need transforming. They need engineering.", photo: seanGoh, linkedin: "https://www.linkedin.com/in/seanygoh/" },
  { name: "Nadzim Zahari", role: "Senior Sustainability Manager", edu: "BSc Economics & Finance", quote: "Sustainability that ignores the P&L gets ignored. Period.", photo: nadzim, linkedin: "https://www.linkedin.com/in/nadzimzahari/" },
  { name: "Jon Quah", role: "Business Development Head", edu: "BSc Civil Engineering", quote: "Build the bridge before you sell the crossing.", photo: jonQuah, linkedin: "https://www.linkedin.com/in/jonathan-q-1917b3125/" },
  { name: "Sean Morais", role: "Lead Design Engineer", edu: "MEng Astronautics Engineering", quote: "If it can't be measured, it probably can't be fixed.", photo: seanMorais, linkedin: "https://www.linkedin.com/in/smmorais/" },
];

const values = [
  { word: "Precision", def: "Every recommendation backed by data, every deliverable engineered to spec." },
  { word: "Pragmatism", def: "We ship what works in your business, not what looks good in a deck." },
  { word: "Ownership", def: "We're accountable for outcomes, not just effort or attendance." },
  { word: "Outcomes", def: "Success is measured in margin, time, and capability, never in slides." },
];

const pillars = [
  {
    n: "01",
    eyebrow: "OUR MISSION",
    title: "Built for impact.",
    body: '"We unlock the full potential of businesses with practical, sustainable, engineered solutions."',
    body2: "We bring an engineering mindset focused on precision, efficiency, and scalability to every challenge we tackle. Potential alone isn't enough. It's about transforming ambition into measurable results.",
  },
  {
    n: "02",
    eyebrow: "WHY WE'RE DIFFERENT",
    title: "Engineering solutions for real-world challenges.",
    body: "With a foundation in engineering and a deep understanding of business operations, we design solutions that are visionary, actionable, and impactful, not just slide-deck strategy.",
  },
  {
    n: "03",
    eyebrow: "WHY CHOOSE US",
    title: "Built on strong foundations.",
    body: "We're not just consultants. We're builders. With expertise in engineering, strategy, and innovation, we're uniquely equipped to tackle the toughest challenges and unlock the greatest opportunities.",
  },
];

const engagements = [
  {
    name: "Sprint",
    duration: "4–8 weeks",
    pitch: "A focused diagnostic and pilot. Best when you need clarity, a quick win, or a business case fast.",
    includes: ["Operating model audit", "One automation or process pilot", "Roadmap & business case", "Executive read-out"],
  },
  {
    name: "Embedded",
    duration: "3–6 months",
    pitch: "We sit inside your team and engineer transformation end-to-end. Best for ambitious change with real scope.",
    includes: ["Multi-workstream delivery", "Tooling, automation & AI build", "Capability transfer & playbooks", "Quarterly value reviews"],
    featured: true,
  },
];

function About() {
  const railRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLSpanElement>(null);
  const [railProgress, setRailProgress] = useState(0);
  const [railHeight, setRailHeight] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const railEl = railRef.current;
      const lastDot = lastDotRef.current;
      if (!railEl || !lastDot) return;
      const railTop = railEl.getBoundingClientRect().top;
      const dotRect = lastDot.getBoundingClientRect();
      // Distance from top of rail container to centre of last dot
      const h = dotRect.top - railTop + dotRect.height / 2;
      setRailHeight(h);
    };
    const onScroll = () => {
      const el = railRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.75;
      const end = vh * 0.25;
      const total = r.height + (start - end);
      const passed = start - r.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setRailProgress(p);
    };
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measure(); onScroll(); });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main>
      <Helmet>
        <title>About | Strategy Engineering</title>
        <meta name="description" content="Where engineering meets business. Built for impact." />
        <meta property="og:title" content="About | Strategy Engineering" />
        <meta property="og:description" content="Where engineering meets business." />
        <meta property="og:image" content={lightbulb} />
        <meta name="twitter:image" content={lightbulb} />
        <link rel="canonical" href="https://strategyengineering.co/about" />
      </Helmet>
      <PageHero eyebrow="WHO WE ARE" title="Where engineering meets business." backgroundImage={lightbulb} compact objectPosition="center 65%" />

      {/* MISSION + WHY (vertical timeline) */}
      <section className="bg-surface text-surface-foreground py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] bg-grain pointer-events-none" />
        <div className="mx-auto max-w-6xl relative">
          <div className="relative" ref={railRef}>
            {/* Timeline rail bounded between first and last dot */}
            <div
              className="absolute left-[10px] md:left-[7.5rem] w-px bg-cream-foreground/10"
              aria-hidden
              style={{ top: "0.5rem", height: railHeight ? `${railHeight - 8}px` : "calc(100% - 1rem)" }}
            />
            <div
              className="absolute left-[10px] md:left-[7.5rem] w-px bg-primary origin-top"
              aria-hidden
              style={{
                top: "0.5rem",
                height: railHeight ? `${railHeight - 8}px` : "calc(100% - 1rem)",
                transform: `scaleY(${railProgress})`,
                transition: "transform 0.12s linear",
              }}
            />
            <div className="space-y-20 md:space-y-24">
              {pillars.map((p, idx) => (
                <Reveal key={p.n} delay={idx * 100}>
                  <div className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[8rem_1fr] gap-4 md:gap-12 relative">
                    <div className="flex flex-col items-start gap-2 md:gap-3 pt-1">
                      <span
                        ref={idx === pillars.length - 1 ? lastDotRef : undefined}
                        className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-surface border border-primary shrink-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] text-primary">{p.n}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow text-cream-foreground/55 mb-3">// {p.eyebrow}</p>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight mb-5 md:mb-6 leading-[1.05]">
                        {p.title}
                      </h3>
                      {idx === 0 ? (
                        <>
                          <p className="font-display text-lg sm:text-xl md:text-2xl font-light italic leading-snug mb-4 md:mb-5 text-cream-foreground/90">
                            {p.body}
                          </p>
                          <p className="text-muted-foreground leading-relaxed max-w-2xl">{p.body2}</p>
                        </>
                      ) : (
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">{p.body}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES STRIP */}
      <section className="bg-background text-white py-24 px-6 border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-primary mb-3">// VALUES</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-12 max-w-xl">
              Four words we <span className="italic font-light text-primary">actually live by.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/5 rounded-2xl overflow-hidden border border-white/5">
            {values.map((v, i) => (
              <Reveal
                key={v.word}
                delay={i * 90}
                className="bg-background p-6 sm:p-8 group cursor-default sm:min-h-[180px] flex flex-col justify-end relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-primary/30 sm:bg-primary/0 sm:group-hover:bg-primary transition-colors duration-500" />
                <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight transition-transform duration-500 sm:group-hover:-translate-y-2">
                  {v.word}<span className="text-primary">.</span>
                </h3>
                {/* Definition: always visible on mobile, hover-reveal on desktop */}
                <p className="text-sm text-white/65 mt-3 sm:hidden">
                  {v.def}
                </p>
                <p className="hidden sm:block text-sm text-white/0 group-hover:text-white/65 transition-all duration-500 mt-2 max-h-0 group-hover:max-h-32 overflow-hidden">
                  {v.def}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className="bg-surface text-surface-foreground py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="eyebrow text-cream-foreground/55 mb-3">// HOW WE ENGAGE</p>
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight max-w-xl">
                Two ways to <span className="italic font-light">work together.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Same engineering rigour. Different intensity, depending on where you are.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {engagements.map((e, i) => (
              <Reveal
                key={e.name}
                delay={i * 120}
                className={`rounded-2xl border p-9 transition-all duration-300 hover:-translate-y-1 ${
                  e.featured
                    ? "bg-primary-flow text-white border-white/10 relative overflow-hidden"
                    : "bg-cream border-cream-foreground/10"
                }`}
              >
                {e.featured && <div className="absolute inset-0 opacity-[0.05] bg-grain pointer-events-none" />}
                <div className="relative">
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className={`font-display text-3xl font-medium tracking-tight ${e.featured ? "text-white" : ""}`}>
                      {e.name}
                    </h3>
                    <span className={`font-mono text-[11px] tracking-[0.22em] uppercase ${e.featured ? "text-primary" : "text-cream-foreground/55"}`}>
                      {e.duration}
                    </span>
                  </div>
                  <p className={`leading-relaxed mb-7 ${e.featured ? "text-white/75" : "text-muted-foreground"}`}>
                    {e.pitch}
                  </p>
                  <ul className="space-y-2.5">
                    {e.includes.map((it) => (
                      <li
                        key={it}
                        className={`flex gap-3 text-sm ${e.featured ? "text-white/80" : "text-surface-foreground/80"}`}
                      >
                        <span className={`mt-2 h-px w-4 shrink-0 ${e.featured ? "bg-primary" : "bg-cream-foreground/30"}`} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-background text-white py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="eyebrow text-primary mb-3">// THE TEAM</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
                People who <span className="italic font-light text-primary">build.</span>
              </h2>
            </div>
            <p className="text-white/60 max-w-md leading-relaxed">
              Engineers and operators with a track record of turning ambition into measurable advantage.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream/5 mb-5 ring-1 ring-white/0 group-hover:ring-primary/40 transition-all duration-500">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover sm:grayscale sm:group-hover:grayscale-0 sm:group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Mobile: persistent gradient + LinkedIn. Desktop: hover overlay with quote. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-5 bottom-5 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-500">
                    <p className="hidden sm:block font-display text-sm italic text-white/90 leading-snug mb-3">"{m.quote}"</p>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn (opens in new tab)`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/40 bg-background/60 backdrop-blur-sm text-white hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Linkedin className="size-4" />
                    </a>
                  </div>
                </div>
                <h4 className="font-display text-xl font-medium">{m.name}</h4>
                <p className="text-primary text-sm mt-1">{m.role}</p>
                <p className="text-white/40 text-xs mt-1.5 font-mono">{m.edu}</p>
                <p className="sm:hidden font-display text-sm italic text-white/70 leading-snug mt-3">"{m.quote}"</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-20">
            <MagneticButton
              to="/contact"
              className="group items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide"
            >
              Work with us
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
