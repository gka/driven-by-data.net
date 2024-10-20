<script lang="ts">
	import { endsWith, includes } from 'es-toolkit/compat';
import CoAuthors from './CoAuthors.svelte';

	type Meta = {
		title: string;
		image: string;
		date: string;
		coauthors: string;
		tags: string[];
		publication?: string;
	};

	let { path, meta }: { path: string; meta: Meta } = $props();

	const url = $derived(meta.layout === 'link' ? meta.link : path);

	const pubDate = $derived(new Date(path.split('/').slice(0, 3).join('-')));
	const format = (d: Date) =>
		new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(d);
</script>

<div class="post">
	<a href={url}
		><figure class="image is-square">
			{#if meta.image?.endsWith('-light.png')}
			<img src="/images/{meta.image}" class="hide-in-dark" alt={meta.title} />
			<img src="/images/{meta.image.replace('-light.png', '-dark.png')}" class="hide-in-light" alt={meta.title} />
			{:else}
			<img src="/images/{meta.image}" alt={meta.title} />
			{/if}
		</figure>
	</a>
	<div class="description mt-2">
		<a href={url}
			><span class="is-size-6 has-text-weight-bold"
				>{@html (meta.title || '').replaceAll('<br />', '')}</span
			></a
		>
		<span class="is-size-7 has-text-grey"
			>{#if meta.coauthors}with <CoAuthors coauthors={meta.coauthors} />,
			{/if}
			{format(pubDate)}{#if meta.publication}&nbsp;[{meta.publication === 'zon'
					? 'ZEIT ONLINE'
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
