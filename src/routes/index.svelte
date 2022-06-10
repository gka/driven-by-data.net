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
	import { groupBy, uniq } from 'lodash';

	interface Post {
		path: string;
		meta: {
			date: string;
			title: string;
			image: string;
			_with: string;
			tags: string[];
		};
	}

	export let posts: Post[];

	let activeTag: string | null = null;

	$: filteredPosts = posts.filter((post) =>
		typeof activeTag === 'string' ? post.meta.tags.includes(activeTag) : true
	);

	$: allYears = uniq(posts.map((p) => p.meta.date.substring(0, 4))).slice(4);

	$: groupedPosts =
		typeof activeTag === 'string'
			? [[activeTag, filteredPosts]]
			: Object.entries(groupBy(filteredPosts, (d: Post) => { const year = +d.meta.date.substring(0, 4); if (year > 2017) return 'post 2018'; return String(year) })).reverse();

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
		'code',
		'sketches'
	];
</script>

<svelte:head>
	<title>driven by data</title>
	<meta
		name="description"
		content="Graphics portfolio of Gregor Aisch, a former graphics editor at The New York Times, now Co-Founder/CTO at Datawrapper. Lives and works in Berlin, Germany."
	/>
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title is-1 mb-5">driven by data</h1>
		<p class="subtitle is-5 mt-1">
			Graphics portfolio of <b>Gregor Aisch</b>, a former graphics editor at
			<b>The New York Times</b>
			(2014-2017), now Co-Founder/CTO at <b>Datawrapper</b>. Lives and works in Berlin, Germany.
		</p>
		<div class="columns tagnav">
			<div class="column is-3">
				{#each allYears.slice(1) as year}
					<a
						class="has-text-grey-light"
						on:click={() => {
							activeTag = null;
						}}
						href="#{year}">{year}</a
					>
				{/each}
			</div>
			<div class="column is-6">
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
						}}
						href="#{tag}">{tag}</a
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
				<h2 class="title is-3" id={year}>{year}</h2>
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
