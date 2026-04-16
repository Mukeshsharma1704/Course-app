import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['react-hot-toast', 'react-icons', 'react-slick'],
          'api-vendor': ['axios'],
          'stripe-vendor': ['@stripe/react-stripe-js', '@stripe/stripe-js'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  server: {
    compress: true,
  },
})
