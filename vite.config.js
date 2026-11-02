import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        agro: fileURLToPath(new URL('./index.html', import.meta.url)),
        resort: fileURLToPath(new URL('./resort/index.html', import.meta.url)),
      },
    },
  },
});