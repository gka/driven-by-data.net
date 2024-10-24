import { json, text } from '@sveltejs/kit';
import getPosts from '$lib/getPosts.js';

export async function GET() {
	const posts = await getPosts({ tag: '', limit: 0, dev: false });

    const allTags:Set<string> = new Set();
    posts.forEach(post => post.meta.type?.forEach(tag => allTags.add(tag)));

    const types: Map<number, Map<string, number>> = new Map();
	posts.forEach(post => {
        const { year } = post.date;
        if (!types.has(year)) types.set(year, new Map(Array.from(allTags.values()).map(t => [t,0])));
        const yearMap = types.get(year) as Map<string, number>;
		post.meta.type?.forEach(tag => {
			if (!yearMap.has(tag)) yearMap.set(tag, 0);
			yearMap.set(tag, (yearMap.get(tag) ?? 0) + 1);
		})
	});
    const flatList = [];
    for (const [year, m] of types.entries()) {
        for (const [tag, count] of m.entries()) {
            flatList.push({ year, tag, count });
        }
    }
	// return json(flatList);
    return text('year,tag,count\n'+flatList.map(({ year, tag, count}) => `${year},${tag},${count}`).join('\n'))
}

export const prerender = true;