// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 1. Importamos o plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. Adicionamos e configuramos o plugin da PWA
    VitePWA({
      registerType: 'autoUpdate',
      // Configuração do "manifest" do App
      manifest: {
        name: 'Otimizador FreeBitco.in',
        short_name: 'Otimizador BTC',
        description: 'Ferramentas e calculadoras para otimizar seus ganhos no FreeBitco.in.',
        theme_color: '#1a202c', // Cor de fundo da barra do app
        background_color: '#1a202c',
        icons: [
          {
            src: 'pwa-192x192.png', // Caminho para o ícone na pasta 'public'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Caminho para o ícone na pasta 'public'
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})