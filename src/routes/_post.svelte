<script>
	import Icon from '$lib/Icon.svelte';

	export let title = '';
	export let link = '';
	export let summary = '';
	export let _with = '';
	export let image = '';
	export let images = [];
</script>

<svelte:head>
	<title>{title} - driven-by-data</title>
	<link rel="icon" href="/images/{image}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@driven_by_daya" />
	<meta name="twitter:title" content="{title} - driven-by-da" />
	<meta name="twitter:description" content="{summary}" />
	<meta name="twitter:image" content="https://driven-by-data.net/images/{images[0]}" />
</svelte:head>


<section class="section pb-2">
	<div class="container">
		<div class="columns">
			
				<div class="column">
					<p class="subtitle has-text-grey is-5 mt-1">
			<a class="has-text-weight-normal has-text-grey-light" href="/">driven-by-data.net</a>
		</p></div>
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
				<h3 class="title is-3">{title}</h3>
				<div class="block content">
					<slot />
				</div>

				{#if _with}
					<div class="block">
						In collaboration with {@html _with}.
					</div>
				{/if}

				{#if link}
					<div class="block">
						<a href={link}>visit</a>
					</div>
				{/if}
			</div>
			<div class="column">
				{#each images as src}
					<div class="block">
						<img class="box" src="/images/{src}" alt={title} />
					</div>
				{/each}
			</div>
		</div>
	</div>

	<style>
		a {
			font-weight: bold;
		}
	</style>
</section>
