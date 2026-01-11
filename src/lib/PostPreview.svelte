<script lang="ts">
	import CoAuthors from './CoAuthors.svelte';
	import { getEnhancedImage } from './enhancedImages';

	type Meta = {
		title: string;
		image: string;
		date: string;
		coauthors: string;
		tags: string[];
		publication?: string;
	};

	let { path, meta }: { path: string; meta: Meta } = $props();

	const url = $derived(
		meta.layout === 'link' && meta.link.startsWith('http') ? meta.link : `/${path}`
	);

	const pubDate = $derived(new Date(path.split('/').slice(0, 3).join('-')));
	const format = (d: Date) =>
		new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(d);
</script>

<div class="post">
	<a href={url}
		><figure class="image is-square">
			{#if meta.image}
				{#if meta.image?.endsWith('-light.png') || meta.image?.endsWith('-light.jpg')}
					<enhanced:img
						src={getEnhancedImage(meta.image)}
						class="hide-in-dark"
						alt={meta.title}
						loading="lazy"
						decoding="async"
					/>
					<enhanced:img
						src={getEnhancedImage(meta.image.replace('-light.', '-dark.'))}
						class="hide-in-light"
						alt={meta.title}
						loading="lazy"
						decoding="async"
					/>
				{:else}
					<enhanced:img
						src={getEnhancedImage(meta.image)}
						alt={meta.title}
						loading="lazy"
						decoding="async"
					/>
				{/if}
			{:else}
				<img src="https://placehold.co/400x400" alt={meta.title} />
			{/if}
		</figure>
	</a>
	<div class="description mt-2">
		<a href={url}
			><span class="is-size-6 has-text-weight-semibold"
				>{@html (meta.title || '').replaceAll('<br />', '')}</span
			></a
		>
		<span class="is-size-7 has-text-grey"
			>{#if meta.coauthors}with <CoAuthors coauthors={meta.coauthors} />,
			{/if}
			{format(pubDate)}{#if meta.publication}&nbsp;[{meta.publication === 'zeit'
					? 'DIE ZEIT'
					: meta.publication}]{/if}</span
		>
	</div>
</div>

<style>
	a {
		display: block;
	}
	.description {
		line-height: 1.1;
	}
</style>
