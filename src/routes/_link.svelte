<script>
	export let title = '';
	export let link = '';
</script>

<svelte:head>
	<title>{title} - driven-by-data</title>
	<meta http-equiv="refresh" content="0; url = {link}" />
</svelte:head>

<section class="section">
    <div class="container">
        <h1 class="title is-3">{title}</h1>
        <p>You are being redirected to <a href={link}>{link}</a>.</p>
    </div>
</section>
