import { json } from '@sveltejs/kit';
import getPosts from '$lib/getPosts.js';

export async function GET() {
	const posts = await getPosts({ tag: '', limit: 0, dev: false });
	return json(posts);
}
