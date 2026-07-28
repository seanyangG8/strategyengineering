import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Diagnose",
    body: "Embed with your team, map the value stream, and quantify where margin and time are leaking.",
  },
  {
    n: "02",
    title: "Design",
    body: "Engineer the target operating model across process, technology, and accountability for a measurable outcome.",
  },
  {
    n: "03",
    title: "Deploy",
    body: "Build, automate, and integrate. Pilot in weeks, scale in months, with your team owning the lift.",
  },
  {
    n: "04",
    title: "Defend",
    body: "Hand-over with playbooks, dashboards, and guard-rails so gains compound long after we leave.",
  },
];

export function ProcessStrip() {
  return (
    <section id="process" className="bg-background text-white py-28 px-6 border-t border-white/5 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow text-primary mb-3">// HOW WE WORK</p>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-2xl">
              Four steps. <span className="italic font-light text-primary">Compounding outcomes.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md leading-relaxed">
            A disciplined engineering loop applied to operations, automation, and strategy alike.
          </p>
        </Reveal>

        <div className="relative grid md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 120}
              className="bg-background p-8 md:p-9 relative group hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between mb-10">
                <span className="font-mono text-xs tracking-[0.25em] text-primary">{s.n}</span>
                <span className="h-px w-10 bg-white/15 mt-2 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-3">{s.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
