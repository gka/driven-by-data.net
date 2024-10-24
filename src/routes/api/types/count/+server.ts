import { json } from '@sveltejs/kit';
import getPosts from '$lib/getPosts.js';

export async function GET() {
	const posts = await getPosts({ tag: '', limit: 0, dev: false });

    const types:Map<string, number> = new Map();
	posts.forEach(post => {
		post.meta.type?.forEach(tag => {
			if (!types.has(tag)) types.set(tag, 0);
			types.set(tag, (types.get(tag) ?? 0) + 1);
		})
	})
	return json(Object.fromEntries(Array.from(types.entries()).sort((a,b) => b[1] - a[1])));
}

export const prerender = true;