import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routeTreeFileHeader: ['/* eslint-disable eslint-comments/no-unlimited-disable */', '/* eslint-disable */'],
      generatedRouteTree: './src/route-tree.gen.ts',
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: '../api/public',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@/web': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
