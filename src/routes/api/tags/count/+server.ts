import { json } from '@sveltejs/kit';
import getPosts from '$lib/getPosts.js';

export async function GET() {
	const posts = await getPosts({ tag: '', limit: 0, dev: false });

	const tags = new Map();
	posts.forEach((post) => {
		post.meta.tags?.forEach((tag) => {
			if (!tags.has(tag)) tags.set(tag, 0);
			tags.set(tag, tags.get(tag) + 1);
		});
	});
	return json(Object.fromEntries(Array.from(tags.entries()).sort((a, b) => b[1] - a[1])));
}

export const prerender = true;
