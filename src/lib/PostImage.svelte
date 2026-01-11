<script>
	import Phone from '$lib/Phone.svelte';
	import VideoPlayer from '$lib/VideoPlayer.svelte';
	import { getEnhancedImage } from '$lib/enhancedImages';

	let { image, title, link, isMobile } = $props();

	const isVideo = (src) => src?.endsWith('.mov') || src?.endsWith('.mp4');

	const src = $derived(image?.src);
	const maxWidth = $derived(image?.maxWidth ?? 'auto');
	const alt = $derived(image?.alt ?? title);
	const caption = $derived(image?.caption ?? '');
</script>

{#if isVideo(src)}
	<VideoPlayer src="/images/{src}" />
{:else if src?.includes('-mobile') && !isMobile}
	<div class="mobile-caption-container">
		<Phone url={link}>
			<enhanced:img
				src={getEnhancedImage(src)}
				style="width: 100%;"
				{alt}
				loading="lazy"
				decoding="async"
			/>
		</Phone>
		{#if caption}
			<div class="caption is-size-6 has-text-grey mt-6">{@html caption}</div>
		{/if}
	</div>
{:else if src?.endsWith('-light.png') || src?.endsWith('-light.jpg')}
	<enhanced:img
		src={getEnhancedImage(src)}
		style:max-width={maxWidth}
		class="hide-in-dark"
		{alt}
		loading="lazy"
		decoding="async"
	/>
	<enhanced:img
		src={getEnhancedImage(src.replace('-light.', '-dark.'))}
		class="hide-in-light"
		style:max-width={maxWidth}
		{alt}
		loading="lazy"
		decoding="async"
	/>
	{#if caption}
		<div class="caption is-size-6 has-text-grey mt-4 mb-6 has-text-centered">
			{@html caption}
		</div>
	{/if}
{:else}
	<enhanced:img
		src={getEnhancedImage(src)}
		style:max-width={maxWidth}
		{alt}
		loading="lazy"
		decoding="async"
	/>
	{#if caption}
		<div class="caption is-size-6 has-text-grey mt-4 mb-6 has-text-centered">
			{@html caption}
		</div>
	{/if}
{/if}

<style lang="scss">
	@use 'bulma/sass/utilities/mixins';

	@include mixins.tablet {
		.mobile-caption-container {
			display: flex;
			gap: 1em;
		}
	}

	@include mixins.mobile {
		enhanced\:img {
			width: 100%;
		}
	}
</style>
