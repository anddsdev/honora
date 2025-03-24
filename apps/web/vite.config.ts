import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routeTreeFileHeader: ['/* eslint-disable eslint-comments/no-unlimited-disable */', '/* eslint-disable */'],
      generatedRouteTree: './src/route-tree.gen.ts',
    }),
    react(),
  ],
  build: {
    outDir: '../api/public',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
