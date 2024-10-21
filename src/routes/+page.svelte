<script lang="ts">
	import type { Post } from '$lib/types';
	import { title, description, tags, publications, nicePubNames } from '$lib/config';
	import PostPreview from '$lib/PostPreview.svelte';
	import { groupBy, range } from 'es-toolkit';

	let { data }: { data: { posts: Post[] } } = $props();

	const posts = $derived(data.posts);
	let activeTag: string | null = $state(null);
	let activePublication: string | null = $state(null);

	const filteredPosts = $derived(
		data.posts
			.filter((post) =>
				typeof activeTag === 'string' ? post.meta.tags?.includes(activeTag) : true
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
		return String(year);
	}

	const allYears = $derived(
		Array.from(new Set(data.posts.map((p) => warpTime(p.date.year))))
			.toSorted()
			.toReversed()
	);

	const groupedPosts = $derived(
		typeof activeTag === 'string' || typeof activePublication === 'string'
			? [[activeTag, filteredPosts]]
			: Object.entries(
					groupBy(filteredPosts, (d: Post) => {
						return warpTime(d.date.year);
					})
				).sort((a, b) => (b[0] > a[0] ? 1 : -1))
	);

	$inspect({activeTag})
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="icon" href="/images/{posts[0].meta.image}" />
	<link rel="me" href="https://vis.social/@gka" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@driven_by_daya" />
	<meta name="twitter:title" content="driven-by-da" />
	<meta
		name="twitter:description"
		content={description}
	/>
	<meta name="twitter:image" content="https://driven-by-data.net/images/streetnames-big2.png" />
</svelte:head>



<section class="section">
	<div class="container">
		<h1 class="title is-1 mb-5">driven by data</h1>
		<h2 class="subtitle is-5 mt-1">
			Portfolio of <b>Gregor Aisch</b>, a visual data journalist at <a href="https://www.zeit.de/autoren/A/Gregor_Aisch" target="_blank">ZEIT ONLINE</a>, former
			graphics editor at 
			<a target="_blank" href="https://www.nytimes.com/by/gregor-aisch">The New York Times</a> and co-founder and former CTO of <a target="_blank" href="https://www.datawrapper.de/about-us">Datawrapper</a>. Lives and works in
			Berlin.
		</h2>

		<div class="columns tagnav">
			<!-- filter by tags -->
			<div class="column is-5-tablet is-4-desktop">
				<button
					class="has-text-grey-light"
					class:active={activeTag === null}
					onclick={(e) => {
						e.preventDefault();
						activeTag = null;
					}}>all projects</button
				>
				{#each tags as tag}
					<button
						class="has-text-grey-light"
						class:active={activeTag === tag}
						onclick={(e) => {
							e.preventDefault();
							activeTag = tag;
							activePublication = null;
						}}
					>{tag}</button
					>
				{/each}
			</div>
			<!-- filter by publication -->
			<div class="column is-3">
				<button
					class="has-text-grey-light"
					class:active={activePublication === null}
					onclick={(e) => {
						e.preventDefault();
						activePublication = null;
					}}
					>all publications</button
				>
				{#each publications as pub}
					<button
						class="has-text-grey-light"
						class:active={activePublication === pub}
						onclick={(e) => {
							e.preventDefault();
							activePublication = pub;
							activeTag = null;
						}}
						>{nicePubNames[pub] ?? pub}</button
					>
				{/each}
			</div>
			<!-- filter by year -->
			<div class="column is-3-tablet is-2-desktop ">
				{#each allYears as year, i}
					<a
						class="has-text-grey-light"
						onclick={() => {
							activeTag = null;
							activePublication = null;
						}}
						href="#{String(year).toLowerCase().replace(/W+/g, '-')}">{year}</a
					>
				{/each}
			</div>
		</div>
	</div>
</section>

{#each groupedPosts as [year, posts], i}
	<section class="section">
		<div class="container">
			<h2 class="title is-3" id={String(year).toLowerCase().replace(/W+/g, '-')}>
				{year}
			</h2>
			<div class="columns is-mobile is-multiline is-variable is-4-mobile is-5-desktop is-8-fullhd  ">
				{#each posts as post}
					<div class="column is-one-quarter-tablet is-one-fifth-widescreen is-half-mobile">
						<PostPreview path={post.permalink} meta={post.meta} />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/each}

<style lang="scss">
	h2.title[id='2024'] { display: none;}
	.tagnav button, .tagnav a {
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
