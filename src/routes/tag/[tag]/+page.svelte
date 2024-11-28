<script>
	import PostList from '$lib/PostList.svelte';

	let { data } = $props();
</script>

<PostList {...data} />
