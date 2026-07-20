import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  build: {
    target: ["es2020", "safari14", "chrome90", "firefox90"],
    cssTarget: ["safari14", "chrome90", "firefox90"],
  },
  css: {
    transformer: "lightningcss",
  },
});
