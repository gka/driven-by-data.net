<script lang="ts">
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte';

	import chevUp from '@iconify-icons/mdi/chevron-up.js';

	addIcon('chevron-up', chevUp);

	let {
		icon,
		height,
		style = '',
		inline = true
	}: { icon: string; height: number; style: string; inline: boolean } = $props();
</script>

<Icon {icon} {inline} {style} {height} />
