import type { Post } from '$lib/types';

export async function load({ fetch }) {
	const response = await fetch('/api/posts/all');
	const posts: Post[] = await response.json();
	return {
		posts: posts.filter((post) => post.meta.image) // only show posts with preview image };
	}
};
