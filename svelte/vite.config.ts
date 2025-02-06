import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    "process.env.NODE_ENV": '"production"',
  },      
  build: {
    lib: {
      entry: [
        './src/main.ts',
      ],
      formats: ['es'],
      fileName: '[name]',
    },
    rollupOptions: {
      output: {
        dir: './dist/static'
      }
    },
    emptyOutDir: false,
    copyPublicDir: false
  }
})
