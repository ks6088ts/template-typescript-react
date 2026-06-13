import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages project site: https://ks6088ts.github.io/template-typescript-react/
  base: '/template-typescript-react/',
  plugins: [react()],
})
