import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5174,
    host: "localhost",
  },
  preview: {
    port: 4173,
    host: "localhost",
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
