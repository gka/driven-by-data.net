<script>
	import '../bulma.scss';
	let { children } = $props();
</script>

<main>
	{@render children?.()}
</main>

<footer class="container has-text-grey is-size-7 mt-6 mb-4">
	Graphics portfolio of Gregor Aisch. Looking for my <a
		class="has-text-grey"
		href="https://vis4.net/">rarely updated blog</a
	>?
</footer>

<style lang="scss">
	a {
		font-weight: bold;
	}
	// Set your brand colors
	$purple: #8a4d76;
	$pink: #fa7c91;
	$brown: #757763;
	$beige-light: #d0d1cd;
	$beige-lighter: #eff0eb;

	$family-sans-serif:
		'Roboto',
		BlinkMacSystemFont,
		-apple-system,
		'Segoe UI',
		'Oxygen',
		'Ubuntu',
		'Cantarell',
		'Fira Sans',
		'Droid Sans',
		'Helvetica Neue',
		'Helvetica',
		'Arial',
		sans-serif;

	$size-6: 0.8rem;
	$title-weight: 300;

	$link: #222;

	:root {
		@media (prefers-color-scheme: dark) {
			color: #bfbfbf;

			--bulma-title-color: #cccccc;
		}
	}

	:global {
		
		a {
			color: black !important;
			@media (prefers-color-scheme: dark) {
				color: #dfdfdf !important;
			}
		}

		b {
			color: black !important;
			@media (prefers-color-scheme: dark) {
				color: #f8f8f8 !important;
			}
		}

		.content p {
			margin-bottom: 1em;
		}
	}
</style>
