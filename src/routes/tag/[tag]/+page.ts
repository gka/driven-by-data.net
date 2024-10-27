import type { Post } from '$lib/types';

export async function load({ fetch, params }) {
	const response = await fetch('/api/posts/all');
	const posts: Post[] = await response.json();
	return { posts, activeTag: params.tag.replace('-', '/') };
}
