import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    sourcemap: false,
  },
  server: {
    port: 3003,
  },
  plugins: [
    react(),
    // reactRefresh(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  // css: {
  //   postcss: './postcss.config.cjs',
  // },
});