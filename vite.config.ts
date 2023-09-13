import { defineConfig, loadEnv, splitVendorChunkPlugin, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';

const ENV_PREFIX = ['VITE_'];

export const viteConfig: UserConfig = {
  envDir: 'config',
  plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin(), eslintPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  build: {
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'config', ENV_PREFIX);

  console.log(env);

  viteConfig.server = {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        secure: true,
        changeOrigin: true,
        target: env.VITE_API_URL,
      },
    },
  };

  return viteConfig;
});
