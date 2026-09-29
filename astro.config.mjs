import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import node from '@astrojs/node';
// https://astro.build/config

export default defineConfig({
    adapter: node({ mode: 'standalone' }),
    devToolbar: {
        enabled: false
    },
    integrations: [
        react(),
        icon(),
    ],
    outDir: './dist',
    output: 'server',
    publicDir: './public',
    redirects: {},
    vite: {
        plugins: [
            tailwindcss(),
        ]
    },
});