import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🔹 Important: tells Vite where to serve assets for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/react-employee-management/',
})