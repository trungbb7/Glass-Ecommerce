import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  server: {
    proxy: {
      "/products": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
