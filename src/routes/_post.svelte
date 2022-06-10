<script>
	import Icon from '$lib/Icon.svelte';

	export let title = '';
	export let link = '';
	export let images = [];
</script>

<svelte:head>
	<title>{title} - driven-by-data</title>
</svelte:head>

<section class="section">
	<div class="container">
		<div class="columns">
			<div class="column is-one-third">
				<a href="/">
					<Icon icon="chevron-up" height={36} />
				</a>
				<h3 class="title is-3">{title}</h3>
				<div class="block">
					<slot />
				</div>

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
