import { Link } from "@tanstack/react-router";
import { Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About" },
  { to: "/services" as const, label: "Services" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape, and auto-close when resizing into desktop layout
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="font-sans text-lg font-light tracking-wide text-white lowercase rounded-sm">
          strategy <span className="font-semibold">engineering</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-white/80 hover:text-white text-[13px] font-medium tracking-wide transition-colors story-link rounded-sm"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/company/strategy-engineering/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
            className="text-white/70 hover:text-primary transition-colors pl-3 ml-2 border-l border-white/10 rounded-sm"
          >
            <Linkedin className="size-[17px]" />
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-2">
        <button
          className="text-white p-2 rounded-md"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X /> : <Menu />}
        </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden bg-background/95 backdrop-blur border-t border-white/10">
          <nav aria-label="Mobile" className="px-6 py-5 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-primary text-base font-medium rounded-sm"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <a
                href="https://www.linkedin.com/company/strategy-engineering/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="ml-auto text-white/70 hover:text-primary inline-flex items-center gap-2 text-sm rounded-sm"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
