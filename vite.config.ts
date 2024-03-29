import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },

  build: {
    sourcemap: true,
  },

  define: {
    // Some external libraries still relies on `process.env` so we need to
    // redeclare alongside `import.meta.env`.
    'process.env': process.env,
  },
});
