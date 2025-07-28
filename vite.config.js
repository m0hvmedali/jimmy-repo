import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { 
      '@': path.resolve(__dirname, './src'),

    },
  },
  optimizeDeps: {
    include: ['leaflet.locatecontrol']
  },
  theme: {
    extend: {
      keyframes: {
        drop: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      animation: {
        'drop-fast': 'drop 1s linear forwards',
      },
    },
  },

  
  

});
