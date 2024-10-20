export type Post = {
	permalink: string;
	slug: string;
	date: { year: number; month: number; day: number };
	meta: {
		title: string;
		shortTitle?: string;
		description: string;
		image: string;
		coauthors: string;
		published?: boolean;
		featured?: boolean;
		tags?: string[];
	};
};
