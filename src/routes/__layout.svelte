<script>
	import '../app.css';
</script>

<main>
	<slot />
</main>

<footer class="container has-text-grey is-size-7 mt-6 mb-4">
	Graphics portfolio of Gregor Aisch.
	Looking for my <a class="has-text-grey" href="http://vis4.net/">rarely updated blog</a>?
</footer>

<style lang="scss">
	a { font-weight: bold;}
	// Set your brand colors
	$purple: #8a4d76;
	$pink: #fa7c91;
	$brown: #757763;
	$beige-light: #d0d1cd;
	$beige-lighter: #eff0eb;

	$family-sans-serif: 'Roboto', BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Oxygen', 'Ubuntu',
		'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

	$size-6: 0.8rem;
	$title-weight: 300;

	$link: #222;

	

	:global {
		// Import only what you need from Bulma
		@import '../node_modules/bulma/sass/utilities/_all.sass';
		@import '../node_modules/bulma/sass/base/_all.sass';
		@import '../node_modules/bulma/sass/helpers/_all.sass';
		@import '../node_modules/bulma/sass/grid/columns.sass';
		@import '../node_modules/bulma/sass/elements/box.sass';
		@import '../node_modules/bulma/sass/elements/container.sass';
		@import '../node_modules/bulma/sass/elements/icon.sass';
		@import '../node_modules/bulma/sass/elements/title.sass';
		@import '../node_modules/bulma/sass/elements/image.sass';
		@import '../node_modules/bulma/sass/elements/other.sass';
		@import '../node_modules/bulma/sass/components/card.sass';
		// @import "../node_modules/bulma/sass/form/_all.sass";
		// @import "../node_modules/bulma/sass/components/navbar.sass";
		// @import "../node_modules/bulma/sass/layout/hero.sass";
		@import '../node_modules/bulma/sass/layout/section.sass';
		@import "../node_modules/bulma-prefers-dark/bulma-prefers-dark.sass";

		a, b {
			color: black !important;
			@media (prefers-color-scheme: dark) { 
				color: #f8f8f8 !important;
			}
		}
	}
</style>
