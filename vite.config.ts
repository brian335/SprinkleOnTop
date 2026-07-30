import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `SINGLE_FILE=1 npm run build` emits one self-contained index.html for
// shareable previews. The normal build stays code-split.
const singleFile = process.env.SINGLE_FILE === '1'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ...(singleFile ? [viteSingleFile()] : [])],
  build: {
    assetsInlineLimit: singleFile ? 100_000_000 : 4096,
  },
})
