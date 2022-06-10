import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			extensions: ['.svelte']
		}),
		mdsvex({
			extension: '.md',
			layout: {
				post: 'src/routes/_post.svelte',
				link: 'src/routes/_link.svelte'
			}
		})
	],

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	},

	extensions: ['.svelte', '.md']
};

export default config;
