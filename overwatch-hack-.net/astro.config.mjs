import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { sitemapBrowserViewPlugin } from './scripts/sitemap-browser-view.mjs'

export default defineConfig({
  site: 'https://destiny2hack.org',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    plugins: [sitemapBrowserViewPlugin()],
    server: {
      port: 5174,
      strictPort: true,
    },
    preview: {
      port: 5175,
      strictPort: true,
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      cssCodeSplit: true,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons'
            }
            // Keep heavy below-fold preview UI out of the hero chunk.
            if (
              id.includes('/components/FeaturePreview') ||
              id.includes('/components/PreviewVideoPlayer') ||
              id.includes('/components/FeatureModulesSection') ||
              id.includes('/data/feature-previews') ||
              id.includes('/data/feature-modules')
            ) {
              return 'feature-preview'
            }
          },
        },
      },
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
})
