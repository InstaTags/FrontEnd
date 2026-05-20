import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'https://instatags.southeastasia.cloudapp.azure.com',
				changeOrigin: true,
				secure: true,
				configure: (proxy: any) => {
					proxy.on('proxyReq', (proxyReq: any) => {
						proxyReq.removeHeader('origin');
						proxyReq.removeHeader('referer');
					});
				}
			}
		}
	}
});
