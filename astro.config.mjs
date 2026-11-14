import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const excludedFromSitemap = ['/404', '/kontakt/dziekujemy'];

export default defineConfig({
  site: 'https://stajniazlotapodkowa.pl',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [
    sitemap({
      filter: (page) => !excludedFromSitemap.some((path) => new URL(page).pathname.startsWith(path)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // The CSP in public/.htaccess forbids inline scripts, so Vite must always emit them as files.
    build: { assetsInlineLimit: 0 },
  },
});
