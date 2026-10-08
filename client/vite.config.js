import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiProxyTarget = process.env.DOCKER_API_TARGET || 'http://localhost:5050';

const proxyConfig = {
  '/api': {
    target: apiProxyTarget,
    changeOrigin: true,
  },
  '/socket.io': {
    target: apiProxyTarget,
    ws: true,
  },
};

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'SOCKET_', 'CLIENT_'],
  server: {
    host: true,
    port: 5173,
    proxy: proxyConfig,
  },
  preview: {
    host: true,
    port: 5173,
    proxy: proxyConfig,
  },
});
