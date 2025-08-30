<script>
	import CoAuthors from '$lib/CoAuthors.svelte';
	import { nicePubNames } from '$lib/config';
	import Icon from '$lib/Icon.svelte';
	import Phone from '$lib/Phone.svelte';
	import VideoPlayer from '$lib/VideoPlayer.svelte';
	let { data } = $props();

	let innerWidth = $state(500);
	const isMobile = $derived(innerWidth < 500);

	function isVideo(src) {
		return src.endsWith('.mov') || src.endsWith('.mp4');
	}

	const {
		title,
		link,
		summary,
		coauthors,
		image,
		images,
		publication,
		type: types
	} = $derived(data.meta);

	$inspect({ images });
</script>

<svelte:head>
	<title>{title} - driven-by-data</title>
	<link rel="icon" href="/images/{image}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@driven_by_daya" />
	<meta name="twitter:title" content="{title} - driven-by-data.net" />
	<meta name="twitter:description" content={summary} />
	<meta name="twitter:image" content="https://driven-by-data.net/images/{images?.[0].src}" />
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
				<h3 class="title is-3">{@html title}</h3>

				<div class="block content">
					<svelte:component this={data.content} />
				</div>

				{#if coauthors}
					<div class="block">
						In collaboration with
						<CoAuthors {coauthors} shortNames={false} />.
					</div>
				{/if}

				{#if publication}
					<div class="block">Appeared on {nicePubNames[publication] ?? publication}</div>
				{/if}

				{#if link}
					<div class="block">
						<a target="_blank" href={link}>visit</a>
					</div>
				{/if}

				<div class="post-tags">
					<ul class="is-size-7 is-flex is-flex-wrap-wrap">
						{#each (types ?? '')
							.split(',')
							.map((t) => t.toUpperCase().trim())
							.filter((t) => t) as t}
							<li><a href="/type/{t.toLowerCase()}" class="tag">{t}</a></li>
						{/each}
					</ul>
				</div>
				<nav class="nav-links">
					{#if data.prevPost && data.prevPost.layout === 'post'}
						<a
							href="/{data.prevPost.permalink}"
							title="Next project: {data.prevPost.title}"
						>
							<Icon height={30} icon="chevron-left" />
						</a>
					{/if}
					<a href="/" title="Back to overview">
						<Icon height={30} icon="chevron-up" />
					</a>
					{#if data.nextPost && data.nextPost.layout === 'post'}
						<a
							href="/{data.nextPost.permalink}"
							title="Previous project: {data.nextPost.title}"
						>
							<Icon height={30} icon="chevron-right" />
						</a>
					{/if}
				</nav>
			</div>
			<div class="column images">
				{#each images as { src, maxWidth = 'auto', alt = title }}
					{#if isVideo(src)}
						<VideoPlayer src="/images/{src}" />
					{:else if src.includes('-mobile') && !isMobile}
						<Phone url={link}>
							<img width="100%" src="/images/{src}" {alt} />
						</Phone>
					{:else}
						<div class="block">
							{#if src?.endsWith('-light.png') || src?.endsWith('-light.jpg')}
								<img
									src="/images/{src}"
									style:max-width={maxWidth}
									class="hide-in-dark"
									{alt}
								/>
								<img
									src="/images/{src.replace('-light.', '-dark.')}"
									class="hide-in-light"
									style:max-width={maxWidth}
									alt={title}
								/>
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
	nav.nav-links {
		display: flex;
		font-size: 15px;
		a {
			opacity: 0.3;
		}
		a:hover,
		a:focus {
			opacity: 1;
		}
	}
	.post-tags {
		opacity: 0.6;
		margin-bottom: 1rem;
		&:hover {
			opacity: 1;
		}
		ul {
			gap: 5px;
		}

		li {
			display: inline;
			a.tag {
				font-size: 10px;
				font-weight: 500;
			}

			& + li::before {
				content: ' ';
			}
		}
	}
</style>
