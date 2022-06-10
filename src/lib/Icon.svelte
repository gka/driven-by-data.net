<script lang="ts">
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte';

	import chevUp from '@iconify-icons/mdi/chevron-up';
	addIcon('chevron-up', chevUp);

	export let icon: string;
	export let height: number;
	export let style = '';
	export let inline = true;
</script>

<Icon {icon} {inline} {style} {height} />
