


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      treeshake: true,
    },
  },
  plugins: [react()],
  server: { port: 3000 },
})
