<script>
	import { selectedVersion } from '$lib/stores/stores.js';
	import { filteredVersions } from '$lib/stores/derivedFilteredVersions.js';
	import { onDestroy } from 'svelte';
	import Select from 'svelte-select';

	let selectedValue;

	let selectItems = [];
	const unsubscribe = filteredVersions.subscribe(($filteredVersions) => {
		selectItems = $filteredVersions.map((item) => ({
			value: item.version,
			label: item.version,
			devices: item.devices
		}));
	});

	$: if (selectedValue) {
		selectedVersion.set(selectedValue.value);
	} else {
		selectedVersion.set('All');
	}

	onDestroy(unsubscribe);
</script>

<div class="container">
	<span>Version Filter</span>
	<Select bind:value={selectedValue} items={selectItems} placeholder="All">
		<div slot="item" let:item>
			<span>{item.value}</span>
			<span>({item.devices})</span>
		</div>
	</Select>
</div>
