<script>
	import {
		selectedGame,
		retentionData,
		selectedVersion,
		selectedCountry
	} from '$lib/stores/stores.js';
	import { derived } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import Select from 'svelte-select';

	const filteredVersions = derived(
		[selectedGame, selectedCountry, retentionData],
		([$selectedGame, $selectedCountry, $retentionData]) => {
			const versions = $retentionData
				.filter(
					(item) =>
						(item.app_id === $selectedGame || $selectedGame === 'All') &&
						(item.country === $selectedCountry || $selectedCountry === 'All')
				)
				.map((item) => ({
					app_ver: item.app_ver,
					devices: item.days[0]
				}));

			return [...new Set(versions)];
		}
	);
	let selectedValue;

	let selectItems = [];
	const unsubscribe = filteredVersions.subscribe(($filteredVersions) => {
		if ($selectedGame === 'All' && $selectedCountry === 'All') {
			selectItems = [];
			$filteredVersions.forEach((item) => {
				const existingVersionIndex = selectItems.findIndex((v) => v.value === item.app_ver);
				if (existingVersionIndex !== -1) {
					selectItems[existingVersionIndex].devices += item.devices;
				} else {
					selectItems.push({
						value: item.app_ver,
						devices: item.devices
					});
				}
			});
		}
		// selectItems = $filteredVersions.map((item) => ({
		// 	value: item.app_ver,
		// 	devices: item.devices
		// }));
	});

	$: if (selectedValue) {
		selectedVersion.set(selectedValue.value);
		console.log('selectedVersion', $selectedVersion);
	} else {
		selectedVersion.set('All');
		console.log('selectedVersion', $selectedVersion);
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
