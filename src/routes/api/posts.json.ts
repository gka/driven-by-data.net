// posts.json.js
export const get = async () => {
	const allPostFiles = import.meta.glob('../20*/**/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.slice(2, -3);

			return {
				meta: {
					...metadata,
					date: postPath.split('/').slice(1, 4).join('-'),
					tags: (metadata?.tags || '')
						.split(',')
						.map((d: string) => d.trim())
						.filter((d: string) => d)
				},
				path: postPath+'.html'
			};
		})
	);

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return {
		body: sortedPosts
	};
};
