import { createFileRoute, Link } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/site/Header";
import { ArrowUpRight, Workflow, Cpu, Compass, Leaf, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-seedling.webp";
import { AchievementsCarousel } from "@/components/site/AchievementsCarousel";
import { ProcessStrip } from "@/components/site/ProcessStrip";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  {
    icon: Workflow,
    number: "01",
    title: "Process Improvement",
    desc: "Lean Six Sigma and Kaizen methodologies to remove bottlenecks, reduce waste, and unlock margin.",
    tags: ["Lean", "Six Sigma", "Kaizen"],
  },
  {
    icon: Cpu,
    number: "02",
    title: "Automation & AI",
    desc: "Agentic AI, automation, and autonomous workflows engineered to act, adapt, and compound.",
    tags: ["Agentic AI", "RPA", "Data Pipelines"],
    featured: true,
  },
  {
    icon: Compass,
    number: "03",
    title: "Strategy & Transformation",
    desc: "Forward-thinking strategy paired with executable roadmaps that move the business forward.",
    tags: ["Operating Model", "M&A", "Change"],
  },
  {
    icon: Leaf,
    number: "04",
    title: "Sustainability & Impact",
    desc: "ESG reporting, carbon roadmaps, and operating models that turn sustainability into advantage.",
    tags: ["ESG", "Net Zero", "Circularity"],
  },
  {
    icon: Target,
    number: "05",
    title: "GTM Engineering",
    desc: "Lead generation, automated outreach, marketing collateral systems, CRM architecture, and RevOps engineered as a system, not a campaign.",
    tags: ["Lead Gen", "RevOps", "Sales Ops"],
  },
];

const trustedBy = ["FORTUNE 500 FMCG", "UK HOME & LIVING", "NATIONAL ENERGY", "F&B GROWTH", "GLOBAL LOGISTICS", "RETAIL LEADER"];

const stats = [
  { value: 12, suffix: "+", label: "Transformations delivered", spark: [3, 5, 4, 7, 6, 9, 12] },
  { value: 2, suffix: "M", prefix: "$", label: "Operational savings", spark: [0.2, 0.4, 0.7, 1, 1.3, 1.7, 2] },
  { value: 98, suffix: "%", label: "Time saved on automated workflows", spark: [10, 25, 45, 60, 78, 90, 98] },
  { value: 4, suffix: "", label: "Industries served", spark: [1, 1, 2, 2, 3, 3, 4] },
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const w = 100;
  const h = 24;
  const step = w / (data.length - 1);
  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-6 mt-3" preserveAspectRatio="none">
      <path
        d={path}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sparkline-path"
      />
    </svg>
  );
}

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-medium text-white tracking-tight">
      {prefix}{val}{suffix}
    </span>
  );
}

function Index() {
  return (
    <main>
      <Helmet>
        <title>Strategy Engineering</title>
        <meta name="description" content="Process, automation, and AI engineering for ambitious operators. Measurable impact, engineered." />
        <meta property="og:title" content="Strategy Engineering" />
        <meta property="og:description" content="Process, automation, and AI engineering for ambitious operators." />
        <meta property="og:image" content={heroImg} />
        <meta name="twitter:image" content={heroImg} />
        <link rel="canonical" href="https://strategyengineering.co/" />
      </Helmet>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
            style={{ objectPosition: "center center" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <Header />
        <div className="relative z-10 text-center px-6 max-w-5xl pb-32 md:pb-0">
          <p className="eyebrow hero-eyebrow mb-6 animate-fade-up">
            <span className="hero-eyebrow-accent">//</span> UNLOCKING POTENTIAL
          </p>
          <h1 className="font-display text-[40px] sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight">
            {["Your", "ambition."].map((w, i) => (
              <span key={`a-${i}`} className="word-rise-wrap mr-[0.25em]">
                <span className="word-rise" style={{ animationDelay: `${0.1 + i * 0.09}s` }}>
                  {w}
                </span>
              </span>
            ))}
            <br />
            <span className="italic font-light text-primary">
              {["Our", "expertise."].map((w, i) => (
                <span key={`b-${i}`} className="word-rise-wrap mr-[0.25em]">
                  <span className="word-rise" style={{ animationDelay: `${0.32 + i * 0.09}s` }}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-white/70 leading-relaxed animate-fade-up-delay-2">
            We're the engineers behind the strategy, turning bold ambitions into systems that scale, automate, and outperform.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up-delay-3">
            <MagneticButton
              to="/contact"
              className="group items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide"
            >
              Book a discovery call
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </MagneticButton>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white/80 hover:text-white transition-colors story-link"
            >
              Why we're different
            </Link>
          </div>
        </div>

        {/* Scroll indicator hidden on compact screens to avoid hero/trusted-by overlap */}
        <button
          type="button"
          aria-label="Scroll to next section"
          onClick={() => {
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number | string | HTMLElement, o?: { offset?: number }) => void } }).__lenis;
            const target = document.getElementById("stats");
            if (target && lenis) lenis.scrollTo(target, { offset: -40 });
            else if (target) target.scrollIntoView({ behavior: "smooth" });
            else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
          className="hidden lg:flex [@media(max-height:780px)]:hidden absolute left-1/2 -translate-x-1/2 bottom-28 z-10 flex-col items-center gap-2 text-white/55 hover:text-primary transition-colors animate-fade-up-delay-3 group rounded-full"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="relative block w-[22px] h-[36px] rounded-full border border-white/30 group-hover:border-primary/70 transition-colors">
            <span className="absolute left-1/2 top-2 -translate-x-1/2 w-[3px] h-[6px] rounded-full bg-current animate-scroll-dot" />
          </span>
        </button>

        {/* Trusted-by hairline grid */}
        <div id="trusted" className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background/50 backdrop-blur-md">
          {/* Mobile: horizontal scroll, single row, no wrapping */}
          <div className="md:hidden px-6 py-3">
            <span className="eyebrow text-white/45 block mb-2">// TRUSTED BY</span>
            <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6">
              {trustedBy.map((name, i) => (
                <span key={name} className="flex items-center">
                  <span className="whitespace-nowrap pb-1.5 font-mono text-[10px] tracking-[0.22em] text-white/55">
                    {name}
                  </span>
                  {i < trustedBy.length - 1 && (
                    <span aria-hidden className="mx-4 h-4 w-px shrink-0 bg-primary/20" />
                  )}
                </span>
              ))}
            </div>
          </div>
          {/* Desktop: hairline grid */}
          <div className="hidden md:block max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-6">
              <span className="eyebrow text-white/45 whitespace-nowrap shrink-0">// TRUSTED BY</span>
              <div className="flex-1 grid grid-cols-6 divide-x divide-white/10 border-x border-white/10">
                {trustedBy.map((name) => (
                  <div
                    key={name}
                    className="px-4 py-2 flex items-center justify-center text-center font-mono text-[10px] tracking-[0.22em] text-white/45 hover:text-white/85 transition-colors"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section id="stats" className="bg-background border-y border-white/5 py-20 px-6 scroll-mt-20">
        <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="text-center md:text-left">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              <Sparkline data={s.spark} />
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/50 font-medium">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS STRIP */}
      <ProcessStrip />

      {/* Services bento */}
      <section className="bg-surface text-surface-foreground py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow text-cream-foreground/60 mb-3">// WHAT WE DO</p>
              <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-2xl">
                Engineering your <span className="italic font-light">success.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              One engineering mindset applied across process, automation, strategy, sustainability, and growth.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  key={s.title}
                  delay={i * 90}
                  className={s.featured ? "sm:col-span-2 lg:col-span-2" : ""}
                >
                  <TiltCard
                    max={4}
                    className={`h-full rounded-2xl border overflow-hidden ${
                      s.featured
                        ? "border-white/10"
                        : "border-cream-foreground/10 hover:border-cream-foreground/40 transition-colors"
                    }`}
                  >
                    <Link
                      to="/services"
                      className={`relative block h-full p-8 group ${
                        s.featured ? "bg-primary-flow text-white" : "bg-cream"
                      }`}
                    >
                      {s.featured && (
                        <div className="absolute inset-0 opacity-[0.06] bg-grain pointer-events-none" />
                      )}
                      {s.featured && (
                        <div
                          className="absolute -inset-x-20 -top-1/2 h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                            transform: "translateX(-30%)",
                          }}
                        />
                      )}
                      <div className="relative">
                        <div className="flex items-start justify-between mb-12">
                          <span
                            className={`font-mono text-xs tracking-widest ${
                              s.featured ? "text-primary" : "text-cream-foreground/50"
                            }`}
                          >
                            {s.number}
                          </span>
                          <Icon
                            className={`size-6 ${s.featured ? "text-primary" : "text-cream-foreground/80"}`}
                            strokeWidth={1.5}
                          />
                        </div>
                        <h3 className={`font-display text-2xl md:text-3xl font-medium mb-3 ${s.featured ? "text-white" : ""}`}>
                          {s.title}
                        </h3>
                        <p className={`text-sm leading-relaxed mb-5 ${s.featured ? "text-white/70" : "text-muted-foreground"}`}>
                          {s.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {s.tags.map((t) => (
                            <span
                              key={t}
                              className={`font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border ${
                                s.featured
                                  ? "border-white/15 text-white/60"
                                  : "border-cream-foreground/10 text-cream-foreground/65"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-wider ${
                            s.featured ? "text-primary" : "text-cream-foreground/70"
                          }`}
                        >
                          LEARN MORE
                          <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <TestimonialCarousel />

      {/* ACHIEVEMENTS */}
      <section className="bg-background text-white py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-14">
            <p className="eyebrow text-primary mb-3">// PROOF</p>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-5">
              Outcomes, not <span className="italic font-light text-primary">opinions.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/65 leading-relaxed">
              A selection of past engagements where we unlocked latent potential. Client names omitted for privacy.
            </p>
          </Reveal>
          <AchievementsCarousel />
          <div className="text-center">
            <MagneticButton
              to="/services"
              className="group items-center gap-2 mt-12 rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide"
            >
              See how we work
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
