import { dev } from '$app/environment';

export const title = 'driven-by-data.net';
export const description =
	'Graphics portfolio of Gregor Aisch, a former graphics editor at The New York Times, now Co-Founder/CTO at Datawrapper. Lives and works in Berlin, Germany.';
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
export const nicePubNames = { NYT: 'New York Times', zon: 'ZEIT Online', DW: 'Deutsche Welle' };
