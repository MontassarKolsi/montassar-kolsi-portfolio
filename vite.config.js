import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from 'url';
import compression from "vite-plugin-compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'lodash': 'lodash-es',
      'lodash.debounce': 'lodash-es/debounce',
    },
    dedupe: ['three', 'react', 'react-dom'],
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only create chunks for node_modules
          if (!id.includes('node_modules')) {
            return;
          }

          // Core React - keep separate
          if (id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }

          // React Router
          if (id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run')) {
            return 'react-router';
          }

          // Three.js core
          if (id.includes('node_modules/three/build')) {
            return 'three-core';
          }

          // Three.js extras
          if (id.includes('node_modules/three/examples')) {
            return 'three-extras';
          }

          // React Three Fiber ecosystem
          if (id.includes('node_modules/@react-three')) {
            return 'react-three';
          }

          // Spline - large, keep separate
          if (id.includes('node_modules/@splinetool')) {
            return 'spline';
          }

          // GSAP
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }

          // UI Libraries
          if (id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/swiper')) {
            return 'ui-libs';
          }

          // Lodash
          if (id.includes('node_modules/lodash')) {
            return 'lodash';
          }

          // EmailJS
          if (id.includes('node_modules/@emailjs')) {
            return 'emailjs';
          }

          if (id.includes('node_modules/swiper')) {
            return 'swiper';
          }

          // Everything else
          return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 1500, // Increased to 1.5MB
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    // Add this to further optimize
    reportCompressedSize: true,
  },

  esbuild: {
    legalComments: 'none',
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Remove debugger statements
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },

  server: {
    port: 5173,
    open: true,
    cors: true,
  },

  preview: {
    port: 4173,
    open: true,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'gsap',
      'three',
      '@emailjs/browser',
      'lodash-es',
      'lodash-es/debounce',
    ],
    exclude: ['@splinetool/react-spline'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },

  css: {
    devSourcemap: false,
  },
});