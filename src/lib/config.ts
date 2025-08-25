import { dev } from '$app/environment';

export const title = 'driven-by-data.net';
export const description =
	'Graphics portfolio of Gregor Aisch, a visual data journalist at DIE ZEIT, former graphics editor at The New York Times and co-founder and former CTO of Datawrapper. Lives and works in Berlin.';
export const url = dev ? 'https://localhost:5173/' : 'https://driven-by-data.net/';

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

export const publications = ['NYT', 'zeit', 'WDR', 'taz', 'others'];
export const nicePubNames = {
	NYT: 'The New York Times',
	zeit: 'DIE ZEIT',
	others: 'other media',
	DW: 'Deutsche Welle',
	vis4: 'vis4.net',
	Datawrapper: 'Datawrapper Blog'
};

export const pubToPublication = { nyt: 'NYT', wdr: 'WDR' };

export const longNames: { [key: string]: string } = {
	'C. Endt': 'Christian Endt',
	'J. Tröger': 'Julius Tröger',
	'J. Stahnke': 'Julian Stahnke'
};

const niceTypes = {
	map: 'Maps',
	chart: 'Charts',
	table: 'Tables',
	dashboard: 'Dashboards',
	interactive: 'Interactive visualizations',
	static: 'Static visualizations',
	choropleth: 'Choropleth maps',
	animated: 'Animated visualizations',
	'live-data': 'Visualizations with live data',
	'small-multiple': 'Small multiples',
	stackedbars: 'Stacked bar charts',
	scatter: 'Scatter plots',
	linechart: 'Line charts',
	areachart: 'Area charts',
	barchart: 'Bar charts',
	heatmap: 'Heatmaps',
	treemap: 'Treemaps',
	network: 'Network diagrams',
	scrolly: 'Scrolly articles',
	locatormap: 'Locator Maps',
	waffle: 'Waffle charts',
	cartogram: 'Cartograms',
	stackedcolumns: 'Stacked column charts',
	// chro
}

export const niceTypeName = (type) => {
	return niceTypes[type] || `Projects tagged with ${type}`;
}
