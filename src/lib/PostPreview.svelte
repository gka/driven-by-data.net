<script lang="ts">
	import dayjs from 'dayjs';

	export let path: string;
	export let meta: { title: string; image: string; date: string; _with: string; tags: string[], publication?:string };

	const format = (d: string) => dayjs(new Date(d)).format('MMM YYYY');
</script>

<a href={path}>
	<figure class="image is-square">
		<img src="/images/{meta.image}" alt={meta.title} />
	</figure>

	<div class="description mt-2">
		<span class="is-size-6 has-text-weight-bold"
			>{@html (meta.title || '').replaceAll('<br />', '')}</span
		>
		<span class="is-size-7 has-text-grey"
			>{#if meta._with}with {@html meta._with}, {/if}{format(meta.date)}{#if meta.publication}&nbsp;[{meta.publication}]{/if}</span
		>
	</div>
</a>

<style>
	a {
		display: block;
	}
	.description {
		line-height: 1.1;
	}
</style>
