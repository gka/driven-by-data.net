<script lang="ts">
	import type { Post } from '$lib/types';
	import {
		title,
		description,
		tags,
		publications,
		nicePubNames,
		niceTypeName
	} from '$lib/config';
	import PostPreview from '$lib/PostPreview.svelte';
	import Icon from '$lib/Icon.svelte';
	import { groupBy, range } from 'es-toolkit';

	let {
		posts,
		activeTag = null,
		activePublication = null,
		activeType = null
	}: {
		posts: Post[];
		activeTag: string | null;
		activePublication: string | null;
		activeType: string | null;
	} = $props();

	const filteredPosts = $derived(
		posts
			.filter((post) =>
				typeof activeTag === 'string' ? post.meta.tags?.includes(activeTag) : true
			)
			.filter((post) =>
				typeof activeType === 'string' ? post.meta.type?.includes(activeType) : true
			)
			.filter((post) =>
				typeof activePublication === 'string'
					? activePublication === 'others'
						? post.meta.publication && !publications.includes(post.meta.publication)
						: post.meta.publication === activePublication
					: true
			)
			.toReversed()
	);

	function warpTime(year: number) {
		if (year > 2017 && year < 2024) return "2018-'23";
		if (year <= 2010) return "2009-'10";
		return String(year);
	}

	const allYears = $derived(
		Array.from(new Set(posts.map((p) => warpTime(p.date.year))))
			.toSorted()
			.toReversed()
	);

	const groupedPosts = $derived(
		typeof activeTag === 'string'
			? [[activeTag, filteredPosts]]
			: typeof activeType === 'string'
				? [[niceTypeName(activeType), filteredPosts]]
				: typeof activePublication === 'string'
					? [
							[
								`Published at ${nicePubNames[activePublication] || activePublication}`,
								filteredPosts
							]
						]
					: Object.entries(
							groupBy(filteredPosts, (d: Post) => {
								return warpTime(d.date.year);
							})
						).sort((a, b) => (b[0] > a[0] ? 1 : -1))
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="icon" href="/images/{posts[0].meta.image}" />
	<link rel="me" href="https://vis.social/@gka" />
	<link rel="icon" href={`/images/${groupedPosts[0][1][0].meta.image}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@driven_by_daya" />
	<meta name="twitter:title" content="driven-by-da" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://driven-by-data.net/images/streetnames-big2.png" />
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title is-1 mb-5">driven by data</h1>
		<h2 class="subtitle is-5 mt-1">
			Portfolio of <b>Gregor Aisch</b>, a visual data journalist at
			<a href="https://www.zeit.de/autoren/A/Gregor_Aisch" target="_blank">DIE ZEIT</a>,
			former graphics editor at
			<a target="_blank" href="https://www.nytimes.com/by/gregor-aisch">The New York Times</a>
			and co-founder and former CTO of
			<a target="_blank" href="https://www.datawrapper.de/about-us">Datawrapper</a>. Lives and
			works in Berlin.
		</h2>

		{#if !activeType}
			<div class="columns tagnav">
				<!-- filter by tags -->
				<div class="column is-5-tablet is-4-desktop">
					<a class="has-text-grey-light" class:active={activeTag === null} href="/"
						>all projects</a
					>
					{#each tags as tag}
						<a
							class="has-text-grey-light"
							class:active={activeTag === tag}
							href="/tag/{tag.replace('/', '-')}">{tag}</a
						>
					{/each}
				</div>
				<!-- filter by publication -->
				<div class="column is-3">
					<a
						class="has-text-grey-light"
						class:active={activePublication === null}
						href="/">all publications</a
					>
					{#each publications as pub}
						<a
							class="has-text-grey-light"
							class:active={activePublication === pub}
							href="/publication/{pub.toLowerCase()}">{nicePubNames[pub] ?? pub}</a
						>
					{/each}
				</div>
				<!-- filter by year -->
				<div class="column is-3-tablet is-2-widescreen">
					{#each allYears as year, i}
						<a
							class="has-text-grey-light"
							href="/#{String(year).toLowerCase().replace(/W+/g, '-')}">{year}</a
						>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

{#each groupedPosts as [year, posts], i}
	<section class="section">
		<div class="container">
			{#if activeType}
				<a href="/" style="display:flex;margin-bottom:1ex"
					><Icon height={20} icon="chevron-left" /> return to all projects</a
				>
			{/if}
			<h2 class="title is-3" id={String(year).toLowerCase().replace(/W+/g, '-')}>
				{year}
			</h2>
			<div
				class="columns is-mobile is-multiline is-variable is-4-mobile is-5-desktop is-8-fullhd"
			>
				{#each posts as post (post.permalink)}
					<div
						class="column is-one-quarter-tablet is-one-fifth-widescreen is-half-mobile"
					>
						<PostPreview path={post.permalink} meta={post.meta} />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/each}

<style lang="scss">
	h1.title {
		font-weight: 250;
	}
	h2.title[id='2025'] {
		display: none;
	}
	.tagnav button,
	.tagnav a {
		display: inline-block;
		margin-right: 1ex;
		margin-bottom: 0ex;
		font-weight: 500;

		&.active {
			color: black !important;
			@media (prefers-color-scheme: dark) {
				color: #fff !important;
			}
		}
	}

	h1.title {
		font-weight: 300;
		letter-spacing: -1px;
		font-size: 2.4rem;
	}
	.subtitle {
		max-width: 40em;
		a {
			font-weight: bold;
		}
	}
</style>
