import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  resolve: {
    alias: {
      "@platform": path.resolve(__dirname, "src/platform")
    }
  }
});
