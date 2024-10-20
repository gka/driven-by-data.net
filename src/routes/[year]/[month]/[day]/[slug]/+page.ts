import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params: { year, month, day, slug } }) {
	// find slug for permalink
	const response = await fetch('/api/posts/all');
	const posts: Post[] = await response.json();
	// console.log({error})

	if (!Array.isArray(posts)) error(500, { message: posts.message });

	const postIndex = posts.findIndex(
		(post) => `${year}/${month}/${day}/${slug}` === removeTrailingSlash(post.permalink)
	);

	if (postIndex < 0) error(404, { message: `Could not find post` });

	const postMeta = posts[postIndex];
	const prevPost = posts[postIndex + 1] || null;
	const nextPost = posts[postIndex - 1] || null;

	const post = await import(`../../../../../posts/${year}/${month}/${day}/${slug}.md`);

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
}

function removeTrailingSlash(url: string) {
	return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}
