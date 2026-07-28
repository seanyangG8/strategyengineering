import { Linkedin, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Footer() {
  return (
    <footer className="bg-background text-white/70 pt-24 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] bg-grain pointer-events-none" />

      {/* CTA band */}
      <div className="mx-auto max-w-7xl mb-20 relative">
        <div className="rounded-3xl border border-white/10 bg-primary-flow p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] bg-grain pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="eyebrow text-primary mb-3 inline-flex items-center gap-2">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                // CURRENTLY ACCEPTING 2 NEW ENGAGEMENTS · Q1
              </p>
              <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white max-w-xl leading-[1.05]">
                Let's engineer your <span className="italic font-light">next chapter.</span>
              </h3>
            </div>
            <MagneticButton
              to="/contact"
              className="group items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-8 py-4 text-sm font-semibold text-primary-foreground tracking-wide shrink-0"
            >
              Claim a slot
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-12 relative">
        <div className="md:col-span-5">
          <Link to="/" className="font-sans text-lg font-light tracking-wide text-white lowercase">
            strategy <span className="font-semibold">engineering</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
            Engineering the systems, automation, and AI that turn ambition into operating advantage.
          </p>
          <a
            href="mailto:contact@strategyengineering.co"
            className="inline-flex items-center gap-2 mt-6 text-sm text-white hover:text-primary transition-colors story-link"
          ><Mail className="size-4" /><span>contact@strategyengineering.co</span></a>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-primary mb-4">Sitemap</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors story-link">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors story-link">About</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors story-link">Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors story-link">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-primary mb-4">Disciplines</p>
          <ul className="space-y-2.5 text-sm text-white/55">
            <li><Link to="/services" hash="service-01" className="hover:text-primary transition-colors story-link">Process Improvement</Link></li>
            <li><Link to="/services" hash="service-02" className="hover:text-primary transition-colors story-link">Automation & AI</Link></li>
            <li><Link to="/services" hash="service-03" className="hover:text-primary transition-colors story-link">Strategy & Transformation</Link></li>
            <li><Link to="/services" hash="service-04" className="hover:text-primary transition-colors story-link">Sustainability & Impact</Link></li>
            <li><Link to="/services" hash="service-05" className="hover:text-primary transition-colors story-link">Go-to-Market</Link></li>
          </ul>
          <a
            href="https://www.linkedin.com/company/strategy-engineering-co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Strategy Engineering on LinkedIn (opens in new tab)"
            className="inline-flex items-center justify-center w-10 h-10 mt-6 rounded-full border border-white/15 text-white/70 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Linkedin className="size-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-white/40 relative">
        <span>© {new Date().getFullYear()} Strategy Engineering. All rights reserved.</span>
        <span className="font-mono">// Built for impact</span>
      </div>
    </footer>
  );
}
