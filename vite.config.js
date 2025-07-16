import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      treeshake: true,
    }
  plugins: [react(), visualizer()],
  server: { port: 3000 },
});
