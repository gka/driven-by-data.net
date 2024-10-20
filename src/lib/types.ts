export type Post = {
	permalink: string;
	slug: string;
	date: { year: number; month: number; day: number };
	meta: {
		title: string;
		shortTitle?: string;
		description: string;
		image: string;
		_with: string;
		published?: boolean;
		featured?: boolean;
		tags?: string[];
	};
};
