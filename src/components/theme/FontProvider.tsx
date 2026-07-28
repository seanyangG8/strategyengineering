import { createContext, useContext, useEffect, type ReactNode } from "react";

export const FONTS = ["jakarta"] as const;
export type FontPair = (typeof FONTS)[number];

export const FONT_META: Record<
  FontPair,
  { label: string; sample: string; display: string; sans: string }
> = {
  jakarta: {
    label: "Plus Jakarta Sans",
    sample: "Aa",
    sans: "'Plus Jakarta Sans', system-ui, sans-serif",
    display: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
};

const STORAGE_KEY = "se-font";

type Ctx = { font: FontPair; setFont: (f: FontPair) => void };
const FontContext = createContext<Ctx | null>(null);

function getInitial(): FontPair {
  return "jakarta";
}

export function FontProvider({ children }: { children: ReactNode }) {
  const font = getInitial();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-font", font);
    const meta = FONT_META[font];
    root.style.setProperty("--font-display", meta.display);
    root.style.setProperty("--font-sans", meta.sans);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const setFont = () => {};

  return <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>;
}

export function useFont() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error("useFont must be used within FontProvider");
  return ctx;
}

// Inline bootstrap to set font + CSS vars before hydration and prevent FOUC
export const fontBootstrapScript = `(function(){try{localStorage.removeItem('${STORAGE_KEY}');document.documentElement.setAttribute('data-font','jakarta');document.documentElement.style.setProperty('--font-display',"'Plus Jakarta Sans',system-ui,sans-serif");document.documentElement.style.setProperty('--font-sans',"'Plus Jakarta Sans',system-ui,sans-serif");}catch(e){}})();`;
