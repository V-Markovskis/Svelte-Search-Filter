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
				.map((item) => item.app_ver);

			return [...new Set(versions)];
		}
	);
	let selectedValue;

	let selectItems = [];
	const unsubscribe = filteredVersions.subscribe(($filteredVersions) => {
		selectItems = $filteredVersions;
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
	<Select bind:value={selectedValue} items={selectItems} placeholder="All" />
</div>
