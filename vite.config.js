import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/EYAL/', // שם הריפוזיטורי שלך בגיטהאב - חייב להיות מדויק!
})
