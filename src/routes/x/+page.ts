import type { Post } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	try {
		// find slug for permalink
		const response = await fetch('/api/posts/all');
		const posts: Post[] = await response.json();

		if (!Array.isArray(posts)) throw error(500, posts.message);

		const postIndex = posts.findIndex(
			(post) => removeTrailingSlash(params.permalink) === removeTrailingSlash(post.permalink)
		);

		if (postIndex < 0) throw error(404, `Could not find ${params.permalink}`);

		const postMeta = posts[postIndex];
		const prevPost = posts[postIndex + 1] || null;
		const nextPost = posts[postIndex - 1] || null;
		const { permalink } = postMeta;

		// const post = await import(`../../../posts/${permalink}.md`);
		const post = import.meta.glob(`../../../posts/${permalink}.md`);

		return {
			content: post.default,
			meta: { ...post.metadata, slug },
			prevPost: prevPost
				? { permalink: prevPost.permalink, title: prevPost.shortTitle ?? prevPost.title }
				: null,
			nextPost: nextPost
				? { permalink: nextPost.permalink, title: nextPost.shortTitle ?? nextPost.title }
				: null
		};
	} catch (e) {
		console.log(e);
		throw error(404, `Could not find ${params.permalink}`);
	}
}

function removeTrailingSlash(url: string) {
	return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}
