/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

// GitHub Pages project site path. Keep aligned with the existing deployment
// (https://domenicotatone.github.io/webapp/) so this can replace the old app.
const BASE = '/webapp/'

export default defineConfig({
  base: BASE,
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'og-image.png'],
      manifest: {
        name: 'DeepLink Pro — Affiliate Link Generator',
        short_name: 'DeepLink Pro',
        description:
          'Genera deep link affiliati per Booking, Tradedoubler, GetYourGuide, Civitatis e noleggio auto.',
        lang: 'it',
        theme_color: '#0d9488',
        background_color: '#f8fafc',
        display: 'standalone',
        start_url: BASE,
        scope: BASE,
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    // Dev-only proxy so Booking data can be fetched without hitting S3 CORS
    // from localhost. In production we fetch the S3 URL directly (CORS allowed).
    proxy: {
      '/booking-data': {
        target: 'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/booking-data/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
