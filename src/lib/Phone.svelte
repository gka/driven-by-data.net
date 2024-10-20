<script>
	import Icon from "@iconify/svelte";

	let { url, children } = $props();
</script>

<div class="device device-iphone-x">
	<div class="device-frame">
		<div class="ios">
			<div class="header">
				<div class="clock">
					00:00	
				</div>
				<div class="widgets">
					<div class="cell"><Icon icon="ion:cellular" /></div>
					<div class="wifi"><Icon icon="ion:wifi" /></div>
					<div class="battery"><Icon icon="ion:battery-half" /></div>
				</div>
			</div>
			<div class="browser">
				<div class="address-bar">
					<Icon icon="ion:lock-closed-outline" />
					<div class="url">
						{url.replace('https://www.', '').replace('https://', '').replace('http://')}
					</div>
					<Icon icon="ion:reload" />
				</div>
				{@render children?.()}
			</div>
		</div>
		
	</div>
	<div class="device-stripe"></div>
	<div class="device-header"></div>
	<div class="device-sensors"></div>
	<div class="device-btns"></div>
	<div class="device-power"></div>
	<div class="device-home"></div>
</div>

<style lang="scss">
	@import '$lib/devices.css/devices.scss';

	.browser {
		background: #fff;

		.address-bar {
			pointer-events: none;
			margin: 10px;
			padding: 4px 8px;
			border-radius: 5px;
			display: flex;
			align-items: center;
			background: #f0eff4;
			gap: 6px;
			.url {
				flex: 0 1 100%;
				flex-grow: 1;
				height: 27px;
				opacity: 0.5;
				padding: 0 5px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	.clock {
		font-size: 15px;
		font-weight: bold;
	}
	.ios {
		font-family: Roboto;
		background: #f9f9fb;
		height: 100%;
		border-radius: 30px;
		
	}
	.ios .header {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		.widgets {
			display: flex;
			gap: 5px;
		}
	}
</style>
