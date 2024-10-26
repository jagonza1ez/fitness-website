import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Set this to match the port Vite is using (5174 as seen in your logs)
    hmr: {
      port: 5174, // Ensure the HMR WebSocket also uses port 5174
    },
  },
});
