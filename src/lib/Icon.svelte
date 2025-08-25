<script lang="ts">
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte';

	import chevUp from '@iconify-icons/mdi/chevron-up.js';
	import chevLeft from '@iconify-icons/mdi/chevron-left.js';
	import chevRight from '@iconify-icons/mdi/chevron-right.js';
	import cellular from '@iconify-icons/ion/cellular.js';
	import wifi from '@iconify-icons/ion/wifi.js';

	addIcon('chevron-up', chevUp);
	addIcon('chevron-left', chevLeft);
	addIcon('chevron-right', chevRight);
	addIcon('wifi', wifi);
	addIcon('cellular', cellular);

	let {
		icon,
		height,
		style = '',
		inline = true
	}: { icon: string; height: number; style?: string; inline?: boolean } = $props();
</script>

<Icon {icon} {inline} {style} {height} />
