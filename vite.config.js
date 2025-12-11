import { defineConfig } from 'vite';
import apiRouter from './src/server/api.js';

export default defineConfig({
    server: {
        port: 5173,
        open: true,
        host: true,
        proxy: {
            '/api/polymarket': {
                target: 'https://gamma-api.polymarket.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/polymarket/, ''),
            },
        },
        // Enable custom middleware for our own API routes
        middlewareMode: true,
        configureServer: (app) => {
            // Vite's dev server uses Connect under the hood
            app.use('/api', apiRouter);
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'wallet-evm': ['@rainbow-me/rainbowkit', 'wagmi', 'viem'],
                    'wallet-solana': ['@solana/wallet-adapter-react', '@solana/wallet-adapter-wallets', '@solana/web3.js'],
                    'vendor': ['ethers'],
                },
            },
        },
    },
    optimizeDeps: {
        include: ['@rainbow-me/rainbowkit', 'wagmi', '@solana/wallet-adapter-react'],
    },
});
