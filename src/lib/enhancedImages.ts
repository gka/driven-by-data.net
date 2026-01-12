import type { Picture } from 'vite-imagetools';

const enhancedModules = import.meta.glob(
	'/static/images/**/*.{png,jpg,jpeg,webp,gif}',
	{
		eager: true,
		import: 'default',
		query: '?enhanced&url'
	}
) as Record<string, Picture>;

const enhancedImages = new Map(
	Object.entries(enhancedModules).map(([path, picture]) => [
		path.replace('/static/images/', ''),
		picture
	])
);

const enhancedModulesSmall = import.meta.glob(
	'/static/images/**/*.{png,jpg,jpeg,webp,gif}',
	{
		eager: true,
		import: 'default',
		query: {
			enhanced: true,
			url: true,
			w: 500
		}
	}
) as Record<string, Picture>;

const enhancedImagesSmall = new Map(
	Object.entries(enhancedModulesSmall).map(([path, picture]) => [
		path.replace('/static/images/', ''),
		picture
	])
);

export function getEnhancedImage(path?: string | null, small: boolean = false): string | Picture | undefined {
	if (!path) return path ?? undefined;
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path;
	}

	let normalized = path.replace(/^\/+/, '');
	if (normalized.startsWith('static/images/')) {
		normalized = normalized.slice('static/images/'.length);
	} else if (normalized.startsWith('images/')) {
		normalized = normalized.slice('images/'.length);
	}

	return (small ? enhancedImagesSmall : enhancedImages).get(normalized) ?? `/images/${normalized}`;
}
