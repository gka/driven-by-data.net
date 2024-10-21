import { dev } from '$app/environment';

export const title = 'driven-by-data.net';
export const description =
	'Graphics portfolio of Gregor Aisch, a visual data journalist at ZEIT Online, former graphics editor at The New York Times and co-founder and former CTO of Datawrapper. Lives and works in Berlin.';
export const url = dev ? 'http://localhost:5173/' : 'https://driven-by-data.net/';

export const tags = [
	'politics',
	'elections',
	'economy',
	'climate/weather',
	'environment',
	'sports',
	'international',
	'breaking news',
	'business',
	'crime/justice',
	'sketches'
];

export const publications = ['NYT', 'zon', 'WDR', 'taz', 'others'];
export const nicePubNames = { NYT: 'The New York Times', zon: 'ZEIT ONLINE', DW: 'Deutsche Welle', vis4: 'vis4.net' };

export const longNames: {[key: string]: string;} = {
	'C. Endt': 'Christian Endt',
	'J. Tröger': 'Julius Tröger',
	'J. Stahnke': 'Julian Stahnke',
};