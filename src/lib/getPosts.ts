import type { Post } from './types';

export default async function ({ tag, limit, dev }: { tag: string; limit: number; dev: boolean }) {
	let posts: Post[] = [];
	const paths = import.meta.glob(`/src/posts/**/*.md`, { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const permalink = path.split('/').slice(3).join('/').replace('.md', '');

		const [year, month, day] = permalink
			.split('/')
			.slice(0, 3)
			.map((d) => +d);

		if (file && typeof file === 'object' && 'metadata' in file && permalink) {
			const metadata = file.metadata as Omit<Post, 'slug' | 'permalink'>;
			const post = {
				permalink,
				slug: permalink.split('/').at(-1),
				date: {
					year,
					month,
					day
				},
				meta: {
					...metadata,
					tags: metadata.tags
						?.split(',')
						.map((s) => s.trim())
						.filter((d) => d),
					type: metadata.type
						?.split(',')
						.map((s) => s.trim())
						.filter((d) => d)
				}
			} satisfies Post;
			if (post.meta.published != false && (!tag || post.meta.tags?.includes(tag))) {
				posts.push(post);
			}
		}
	}

	return limit ? posts.slice(0, limit) : posts;
}
