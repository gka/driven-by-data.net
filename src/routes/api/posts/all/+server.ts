import { json } from '@sveltejs/kit';
import { DEV } from '$env/static/private';
import getPosts from '$lib/getPosts.js';

export async function GET() {
	const posts = await getPosts({ tag: '', limit: 0, dev: !!DEV });
	return json(posts);
}
