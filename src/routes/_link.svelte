<script>
	export let title = '';
	export let link = '';
</script>

<svelte:head>
	<title>{title} - driven-by-data</title>
	<meta http-equiv="refresh" content="0; url = {link}" />
</svelte:head>

You are being redirected to <a href={link}>{link}</a>.
