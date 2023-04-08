import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/my-work-calendar',
	plugins: [svelte()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
