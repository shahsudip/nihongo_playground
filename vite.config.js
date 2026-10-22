import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const localServer = {
  host: '127.0.0.1',
  port: 5174,
  strictPort: true
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nihongo_playground/', // must match your repo name
  server: localServer,
  preview: localServer,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/analytics']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})

