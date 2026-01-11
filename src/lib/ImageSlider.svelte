<script>
	import PostImage from '$lib/PostImage.svelte';

	let { images = [], title, link, isMobile, intervalMs = 3000 } = $props();
	const fadeMs = 600;

	let activeIndex = $state(0);
	let previousIndex = $state(null);
	let isPaused = $state(false);
	let fadeTimeout;

	$effect(() => {
		if (activeIndex >= images.length) {
			activeIndex = 0;
		}
	});

	$effect(() => {
		if (images.length <= 1 || isPaused) return;
		const interval = setInterval(() => {
			const nextIndex = (activeIndex + 1) % images.length;
			setActive(nextIndex);
		}, intervalMs);

		return () => clearInterval(interval);
	});

	function setActive(index, { pause = false } = {}) {
		if (index === activeIndex) return;
		previousIndex = activeIndex;
		activeIndex = index;
		if (pause) {
			isPaused = true;
		}
		if (fadeTimeout) {
			clearTimeout(fadeTimeout);
		}
		fadeTimeout = setTimeout(() => {
			previousIndex = null;
		}, fadeMs);
	}

	function handleDotClick(index) {
		setActive(index, { pause: true });
	}

	function handlePrev() {
		const prevIndex = (activeIndex - 1 + images.length) % images.length;
		setActive(prevIndex, { pause: true });
	}

	function handleNext() {
		const nextIndex = (activeIndex + 1) % images.length;
		setActive(nextIndex, { pause: true });
	}
</script>

<div class="slider" aria-live={isPaused ? 'off' : 'polite'} style={`--fade-ms: ${fadeMs}ms`}>
	{#each images as image, index}
		<div
			class="slide"
			class:active={index === activeIndex}
			class:previous={index === previousIndex}
			aria-hidden={index !== activeIndex}
		>
			<PostImage {image} {title} {link} {isMobile} />
		</div>
	{/each}
	{#if images.length > 1}
		<button type="button" class="nav prev" aria-label="Show previous image" onclick={handlePrev}
		></button>
		<button type="button" class="nav next" aria-label="Show next image" onclick={handleNext}
		></button>
	{/if}
</div>

{#if images.length > 1}
	<div class="dots" role="tablist" aria-label="Image slideshow pagination">
		{#each images as _, index}
			<button
				type="button"
				class:active={index === activeIndex}
				aria-label={`Show image ${index + 1}`}
				onclick={() => handleDotClick(index)}
			></button>
		{/each}
	</div>
{/if}

<style lang="scss">
	.slider {
		display: grid;
		justify-items: center;
		align-items: center;
		position: relative;
	}
	.slide {
		grid-area: 1 / 1;
		opacity: 0;
		transition: opacity var(--fade-ms) ease;
		pointer-events: none;
		z-index: 0;
	}
	.slide.active {
		opacity: 1;
		pointer-events: auto;
		z-index: 2;
	}
	.slide.previous {
		opacity: 1;
		z-index: 1;
	}
	.nav {
		grid-area: 1 / 1;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 50%;
		border: none;
		background: transparent;
		cursor: pointer;
		opacity: 0;
		z-index: 3;
	}
	.nav:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: -4px;
		opacity: 0.2;
	}
	.nav.prev {
		left: 0;
		cursor: w-resize;
	}
	.nav.next {
		right: 0;
		cursor: e-resize;
	}
	.dots {
		display: flex;
		justify-content: center;
		gap: 0.4rem;
		margin-top: 0.5rem;
	}
	.dots button {
		width: 8px;
		height: 8px;
		border: none;
		border-radius: 50%;
		background: currentColor;
		opacity: 0.35;
		cursor: pointer;
		transition:
			opacity 200ms ease,
			transform 200ms ease;
	}
	.dots button.active {
		opacity: 0.8;
		transform: scale(1.15);
	}
	.dots button:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
	}
	@media (prefers-reduced-motion: reduce) {
		.slide {
			transition: none;
		}
		.dots button {
			transition: none;
		}
	}
</style>
