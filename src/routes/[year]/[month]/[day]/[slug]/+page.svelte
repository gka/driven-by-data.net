<script>
	import CoAuthors from '$lib/CoAuthors.svelte';
	import { nicePubNames } from '$lib/config';
	import Icon from '$lib/Icon.svelte';
	import ImageSlider from '$lib/ImageSlider.svelte';
	import PostImage from '$lib/PostImage.svelte';
	import { goto } from '$app/navigation';
	let { data } = $props();

	let innerWidth = $state(500);
	const isMobile = $derived(innerWidth < 500);

	function formatDate({ year, month, day }) {
		const date = new Date(Date.UTC(year, month - 1, day));
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
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

	const groupedImages = $derived.by(() => {
		const groups = new Map();
		for (const image of images ?? []) {
			const groupId = image.group ?? image.src;
			if (!groups.has(groupId)) {
				groups.set(groupId, { id: groupId, images: [] });
			}
			groups.get(groupId).images.push(image);
		}
		return Array.from(groups.values());
	});

	function handleKeydown(event) {
		if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
			return;
		}

		const target = event.target;
		if (
			target instanceof HTMLElement &&
			(target.isContentEditable ||
				target.tagName === 'INPUT' ||
				target.tagName === 'TEXTAREA' ||
				target.tagName === 'SELECT')
		) {
			return;
		}

		if (event.key === 'ArrowLeft' && data.prevPost?.layout === 'post') {
			event.preventDefault();
			goto(`/${data.prevPost.permalink}`);
		}

		if (event.key === 'ArrowRight' && data.nextPost?.layout === 'post') {
			event.preventDefault();
			goto(`/${data.nextPost.permalink}`);
		}
	}
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

<svelte:window bind:innerWidth on:keydown={handleKeydown} />

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
					<div class="block">
						Appeared on {nicePubNames[publication] ?? publication}
						{#if data.date}
							on {formatDate(data.date)}.{/if}
					</div>
				{:else if data.date}
					<div class="block">Published {formatDate(data.date)}.</div>
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
				{#each groupedImages as group}
					<div class="block">
						{group.length}
						{#if group.images.length > 1}
							<ImageSlider images={group.images} {title} {link} {isMobile} />
						{:else}
							<PostImage image={group.images[0]} {title} {link} {isMobile} />
						{/if}
					</div>
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
