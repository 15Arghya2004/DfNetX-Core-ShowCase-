import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project from https://<owner>.github.io/<repo>/
// so the base path must match the repository name.
export default defineConfig({
  plugins: [react()],
  base: '/DfNetX-Core-ShowCase-/',
})
