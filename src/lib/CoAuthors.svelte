<script lang="ts">
	import { longNames } from './config';
	let {
		coauthors,
		shortNames = true
	}: { shortNames: boolean; coauthors: string | { name: string; url: string }[] } = $props();
</script>

{#if typeof coauthors === 'string'}
	{@html coauthors}
{:else}
	<ul class="co-authors">
		{#each coauthors as { name, url }}
			{@const name2 = !shortNames && longNames[name] ? longNames[name] : name}
			<li>
				{#if url}<a href={url} class="author">{name2}</a>{:else}{name2}{/if}
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	.co-authors {
		display: inline;

		li {
			display: inline;
		}
		li + li::before {
			content: ', ';
		}
		li + li:last-child::before {
			content: ' & ';
		}
	}
</style>
