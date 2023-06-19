<script context="module" lang="ts">
	export const prerender = true;

	interface LoadOptions {
		fetch: (url: string) => Promise<{ json: any }>;
	}

	export const load = async ({ fetch }: LoadOptions) => {
		const posts = await fetch('/api/posts.json');
		const allPosts = await posts.json();

		return {
			props: {
				posts: allPosts
			}
		};
	};
</script>

<script lang="ts">
	import PostPreview from '$lib/PostPreview.svelte';
	import { groupBy, uniq, range } from 'underscore';
	import { onMount } from 'svelte';

	interface Post {
		path: string;
		meta: {
			date: string;
			title: string;
			image: string;
			summary: string;
			images: string[];
			publication?: string;
			_with: string;
			tags: string[];
		};
	}

	export let posts: Post[];

	let activeTag: string | null = null;
	let activePublication: string | null = null;

	$: filteredPosts = posts.filter((post) =>
		typeof activeTag === 'string' ? post.meta.tags.includes(activeTag) : true
	).filter((post) => typeof activePublication === 'string' ? 
		activePublication === 'others' ? post.meta.publication && !publications.includes(post.meta.publication) :
		post.meta.publication === activePublication : true);

	$: allYears = [...range(2017, 2008, -1)];

	$: groupedPosts =
		typeof activeTag === 'string' || typeof activePublication === 'string'
			? [[activeTag, filteredPosts]]
			: Object.entries(groupBy(filteredPosts, (d: Post) => { 
				const year = +d.meta.date.substring(0, 4); 
				// if (year < 2010) return '2009-10';
				if (year > 2017) return 'Since 2018'; 
				return String(year) 
			})).reverse();

	const tags = [
		'politics',
		'elections',
		'economy',
		'climate/weather',
		'environment',
		'sports',
		'international',
		'breaking news',
		'business',
		'crime/justice',
		'sketches'
	];

	const publications = ['NYT', 'zon','WDR', 'taz', 'others'];
	const nicePubNames = {NYT: 'New York Times', zon: 'ZEIT Online', DW: 'Deutsche Welle'}

	let mounted = false;
	onMount(() => {
		if (window.location.hash) {
			tags.forEach(tag => {
				if (tagToHash(tag) === window.location.hash) activeTag = tag;
			});
			publications.forEach(pub => {
				if (pubToHash(pub) === window.location.hash) activePublication = pub;
			})
		}
		mounted = true;
	});

	function tagToHash(tag:string) {
		return `#/tag/${tag.replace(/\W+/g, '-')}`
	}
	function pubToHash(pub:string) {
		return `#/publication/${pub.toLowerCase().replace(/\W+/g, '-')}`
	}

	$: {
		if (mounted) {
			window.location.hash = activeTag ? tagToHash(activeTag) : activePublication ? pubToHash(activePublication) : '';
		}
	}
</script>

<svelte:head>
	<title>driven by data</title>
	<meta
		name="description"
		content="Graphics portfolio of Gregor Aisch, a former graphics editor at The New York Times, now Co-Founder/CTO at Datawrapper. Lives and works in Berlin, Germany."
	/>
	<link rel="icon" href="/images/{posts[0].meta.image}" />
	<link rel="me" href="https://vis.social/@gka">
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@driven_by_daya" />
	<meta name="twitter:title" content="driven-by-da" />
	<meta name="twitter:description" content="Graphics portfolio of Gregor Aisch, a former graphics editor at The New York Times, now Co-Founder/CTO at Datawrapper." />
	<meta name="twitter:image" content="https://driven-by-data.net/images/streetnames-big2.png" />
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title is-1 mb-5">driven by data</h1>
		<p class="subtitle is-5 mt-1">
			Portfolio of <b>Gregor Aisch</b>, a former graphics editor at
			<b>The New York Times</b>
			(2014-2017) and co-founder of <b>Datawrapper</b>. Lives and works in Berlin.
		</p>
		<div class="columns tagnav">
		
			<div class="column is-4">
				<a
					class="has-text-grey-light"
					class:active={activeTag === null}
					on:click|preventDefault={() => {
						activeTag = null;
					}}
					href="#all">all projects</a
				>
				{#each tags as tag}
					<a
						class="has-text-grey-light"
						class:active={activeTag === tag}
						on:click|preventDefault={() => {
							activeTag = tag;
							activePublication = null;
						}}
						href="#tag/{tag}">{tag}</a
					>
				{/each}
			</div>
			<div class="column is-3">
				<a
					class="has-text-grey-light"
					class:active={activePublication === null}
					on:click|preventDefault={() => {
						activePublication = null;
					}}
					href="#all">all publications</a>
				{#each publications as pub}
					<a
						class="has-text-grey-light"
						class:active={activePublication === pub}
						on:click|preventDefault={() => {
							activePublication = pub;
							activeTag = null;
						}}
						href="#pub/{pub}">{nicePubNames[pub] ?? pub}</a
					>
				{/each}
			</div>
				<div class="column is-2">
				{#each allYears as year,i}
					<a
						class="has-text-grey-light"
						on:click={() => {
							activeTag = null;
							activePublication = null;
						}}
						href="#{String(year).toLowerCase().replace(/\W+/g, '-')}">{year}</a
					>
				{/each}
			</div>
		</div>
	</div>
</section>

{#each groupedPosts as [year, posts], i}
	<section class="section">
		<div class="container">
			{#if i}
				<h2 class="title is-3" id={String(year).toLowerCase().replace(/W+/g, '-')}>{year}</h2>
			{/if}
			<div class="columns is-multiline is-variable is-8">
				{#each posts as post}
					<div class="column is-one-fifth">
						<PostPreview {...post} />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/each}

<style lang="scss">
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
	}
</style>
