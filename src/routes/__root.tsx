import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/site/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { FontProvider } from "@/components/theme/FontProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Page not found</h2>
        <p className="mt-2 text-sm text-white/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Strategy Engineering",
  url: "https://strategyengineering.co",
  description:
    "Engineering your success through process improvement, automation & AI, strategy, sustainability, and GTM engineering.",
  email: "contact@strategyengineering.co",
  areaServed: "Global",
  sameAs: ["https://www.linkedin.com/company/strategy-engineering/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Process Improvement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automation & AI" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategy & Transformation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sustainability & Impact" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GTM Engineering" } },
    ],
  },
});

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <FontProvider>
        <Helmet>
          <title>Strategy Engineering</title>
          <meta name="description" content="Engineering your success through process improvement, automation & AI, strategy, sustainability, and GTM engineering." />
          <meta property="og:title" content="Strategy Engineering" />
          <meta property="og:description" content="Your Ambition. Our Expertise." />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Strategy Engineering" />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{orgJsonLd}</script>
        </Helmet>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SmoothScroll />
        <ScrollProgress />
        <PageTransition>
          <div id="main-content">
            <Outlet />
          </div>
        </PageTransition>
        <Footer />
        <Toaster />
      </FontProvider>
    </ThemeProvider>
  );
}
