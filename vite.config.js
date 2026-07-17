import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // The Base44 plugin used to provide the "@/..." alias; we do it here now.
      '@': path.resolve(__dirname, './src'),
    },
  },
})
