import { defineConfig } from "vite";
import { aliasesForViteConfig } from "./aliases";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  resolve: {
    alias: aliasesForViteConfig,
  },
});
