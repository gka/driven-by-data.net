import { pubToPublication } from '$lib/config.js';
import type { Post } from '$lib/types';

export async function load({ fetch, params }) {
	const response = await fetch('/api/posts/all');
	const posts: Post[] = await response.json();
    
	return { posts, activePublication: pubToPublication[params.pub] ?? params.pub };
}
