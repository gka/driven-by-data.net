<script lang="ts">
	let { coauthors }: { coauthors: string | { name: string; url: string }[] } = $props();
</script>

{#if typeof coauthors === 'string'}
	{@html coauthors}
{:else}
	<ul class="co-authors">
		{#each coauthors as { name, url }}
			<li>
				{#if url}<a href={url} class="author">{name}</a>{:else}{name}{/if}
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
