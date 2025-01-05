import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://3000-idx-semana2-desafio360-1734205773377.cluster-fnjdffmttjhy2qqdugh3yehhs2.cloudworkstations.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
