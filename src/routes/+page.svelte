<script>
	import PostList from '$lib/PostList.svelte';

	let { data } = $props();
</script>

<PostList posts={data.posts} activeTag={null} activeType={null} activePublication={null} />
