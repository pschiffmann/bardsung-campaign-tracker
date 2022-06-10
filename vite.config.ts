import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    hmr: false,
  },
  optimizeDeps: {
    // Workaround for https://github.com/vitejs/vite/issues/6215
    include: ["react/jsx-runtime"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // https://github.com/vitejs/vite/issues/905#issuecomment-708523523
        includePaths: ["../"],
      },
    },
  },
});
