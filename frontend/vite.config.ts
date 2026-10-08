import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("@radix-ui") ||
              id.includes("lucide-react") ||
              id.includes("@tabler/icons-react")
            ) {
              return "ui-vendor";
            }
            if (
              id.includes("katex") ||
              id.includes("remark") ||
              id.includes("rehype") ||
              id.includes("react-markdown")
            ) {
              return "markdown-vendor";
            }
            if (id.includes("@tiptap")) {
              return "editor-vendor";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
