import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// SPA build for GitHub Pages. The custom domain serves the app from the root,
// so the deploy workflow passes VITE_BASE="/". Locally it also defaults to "/".
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE ?? "/",
  plugins: [
    tsconfigPaths(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: false,
  },
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  build: {
    sourcemap: mode === "development",
  },
}));
