import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
   build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      treeshake: true,
    },
   },
  plugins: [react(), visualizer()],
  server: { port: 3000 },
});


