<script>
	import CoAuthors from '$lib/CoAuthors.svelte';
	import Icon from '$lib/Icon.svelte';
	import Phone from '$lib/Phone.svelte';
	import { includes } from 'es-toolkit/compat';
	let { data } = $props();

	let innerWidth = $state(500);
	const isMobile = $derived(innerWidth < 500);

	const { title, link, summary, coauthors, image, images, layout } = $derived(data.meta);
</script>

<svelte:head>
	<title>{title} - driven-by-data</title>
	<link rel="icon" href="/images/{image}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@driven_by_daya" />
	<meta name="twitter:title" content="{title} - driven-by-data.net" />
	<meta name="twitter:description" content={summary} />
	<meta name="twitter:image" content="https://driven-by-data.net/images/{images[0]}" />
</svelte:head>

<svelte:window bind:innerWidth />

<section class="section pb-2">
	<div class="container">
		<div class="columns">
			<div class="column">
				<p class="subtitle has-text-grey is-5 mt-1">
					<a class="has-text-weight-normal has-text-grey-light" href="/"
						>driven-by-data.net</a
					>
				</p>
			</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="columns">
			<div class="column is-one-third">
				<a href="/">
					<Icon icon="chevron-up" height={36} />
				</a>
				<h3 class="title is-3">{@html title}</h3>

				<div class="block content">
					<svelte:component this={data.content} />
				</div>

				{#if coauthors}
					<div class="block">
						In collaboration with
						<CoAuthors {coauthors} />.
					</div>
				{/if}

				{#if link}
					<div class="block">
						<a href={link}>visit</a>
					</div>
				{/if}
			</div>
			<div class="column images">
				{#each images as src}
					{#if src.includes('-mobile') && !isMobile}
						<Phone url={link}>
							<img width="100%" src="/images/{src}" alt={title} />
						</Phone>
					{:else}
						<div class="block">
							{#if src?.endsWith('-light.png')}
								<img src="/images/{src}" class="hide-in-dark" alt={title} />
								<img src="/images/{src.replace('-light.png', '-dark.png')}" class="hide-in-light" alt={title} />
							{:else}
								<img src="/images/{src}" alt={title} />
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section :global(a) {
		font-weight: bold;
	}
	.images {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}
</style>
