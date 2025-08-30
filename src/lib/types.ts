export type Post = {
	permalink: string;
	slug: string;
	date: { year: number; month: number; day: number };
	meta: {
		title: string;
		shortTitle?: string;
		description: string;
		image: string;
		images?: string[];
		layout: 'post' | 'link';
		coauthors: string;
		published?: boolean;
		featured?: boolean;
		tags?: string[];
		type?: string[];
	};
};
