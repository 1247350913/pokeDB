import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, '../../..'),
      "@ui": path.resolve(__dirname, '../../../packages/ui/src'),
      "@app-ui": path.resolve(__dirname, '../../../packages/app-ui/src'),
      "@components": path.resolve(__dirname, '../../../packages/app-ui/src/components')
    }
  }
});
