<script lang="ts">
	type Meta = {
		title: string;
		image: string;
		date: string;
		_with: string;
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
			<img src="/images/{meta.image}" alt={meta.title} />
		</figure>
	</a>
	<div class="description mt-2">
		<a href={url}
			><span class="is-size-6 has-text-weight-bold"
				>{@html (meta.title || '').replaceAll('<br />', '')}</span
			></a
		>
		<span class="is-size-7 has-text-grey"
			>{#if meta._with}with {@html meta._with},
			{/if}{format(pubDate)}{#if meta.publication}&nbsp;[{meta.publication === 'zon'
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
