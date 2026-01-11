import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import { vite as vidstack } from 'vidstack/plugins';

export default defineConfig({
	plugins: [...enhancedImages(), sveltekit(), dynamicImport(), vidstack()]
});
