import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    // Base path for GitHub Pages - since this is in a subfolder of the repo
    // and we'll deploy to gh-pages branch, use the repo name
    base: '/webapp/',

    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // Generate source maps for debugging
        sourcemap: false,
        // Minify for production
        minify: 'esbuild',
    },

    // Handle _locales folder (copy as-is)
    publicDir: 'public',
});
