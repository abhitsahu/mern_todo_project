import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Required for Render
    port: process.env.PORT || 5173, // Use Render's assigned port or default to 5173
    strictPort: true,  // Prevent Vite from switching to another port
  },
  preview: {
    port: process.env.PORT || 4173, // Ensure preview mode uses the correct port
    host: '0.0.0.0',
  }
})
