import adapter from '@sveltejs/adapter-static';
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
		trailingSlash: 'never',

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
		prerender: {
			default: true,
			onError: ({ status, path, referrer, referenceType }) => {
				// if (path.startsWith('/blog')) throw new Error('Missing a blog page!');
				console.warn(`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`);
			}
		}
	},

	extensions: ['.svelte', '.md']
};

export default config;
