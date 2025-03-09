import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            "/backend": {
                target: "http://localhost:5173",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/backend/, ""),
            },
        }
    },
    plugins: [
      react(),
      tailwindcss()
    ],

})
