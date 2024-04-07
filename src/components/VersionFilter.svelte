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
			let versionSums = new Map();

			$retentionData.forEach((item) => {
				if (
					(item.app_id === $selectedGame || $selectedGame === 'All') &&
					(item.country === $selectedCountry || $selectedCountry === 'All')
				) {
					let currentSum = versionSums.get(item.app_ver) || 0;
					versionSums.set(item.app_ver, currentSum + item.days[0]);
				}
			});

			return Array.from(versionSums, ([value, devices]) => ({ value, devices }));

			// const versions = $retentionData
			// 	.filter(
			// 		(item) =>
			// 			(item.app_id === $selectedGame || $selectedGame === 'All') &&
			// 			(item.country === $selectedCountry || $selectedCountry === 'All')
			// 	)
			// 	.map((item) => ({
			// 		app_ver: item.app_ver,
			// 		devices: item.days[0]
			// 	}));
			//
			// return [...new Set(versions)];
		}
	);
	let selectedValue;

	let selectItems = [];
	const unsubscribe = filteredVersions.subscribe(($filteredVersions) => {
		selectItems = $filteredVersions.map((item) => ({
			value: item.value,
			devices: item.devices
		}));
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
