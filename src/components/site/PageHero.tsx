import { Header } from "./Header";

export function PageHero({
  eyebrow,
  title,
  backgroundImage,
  objectPosition,
  compact,
}: {
  eyebrow?: string;
  title: string;
  backgroundImage?: string;
  objectPosition?: string;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative ${compact ? "min-h-[55vh]" : "min-h-[68vh]"} flex items-center justify-center overflow-hidden`}
    >
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: objectPosition ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/45 to-background" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,var(--primary)_0%,transparent_55%)]" />
        </>
      )}
      <Header />
      <div className="relative z-10 text-center px-6 pt-24 max-w-4xl">
        {eyebrow && (
          <p className="eyebrow text-white/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)] mb-5 animate-fade-up">
            <span className="text-primary">//</span> {eyebrow}
          </p>
        )}
        <h1 className="font-display text-5xl md:text-7xl font-medium text-white tracking-tight leading-[0.95] animate-fade-up-delay-1">
          {title}
        </h1>
      </div>
    </section>
  );
}
