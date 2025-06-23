import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { aliasesForViteConfig } from "./aliases";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: aliasesForViteConfig,
  },
});
