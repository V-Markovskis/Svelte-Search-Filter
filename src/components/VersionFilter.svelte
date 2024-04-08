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
			let versionsAndDevices = new Map();

			$retentionData.forEach((item) => {
				if (
					(item.app_id === $selectedGame || $selectedGame === 'All') &&
					(item.country === $selectedCountry || $selectedCountry === 'All')
				) {
					let currentSum = versionsAndDevices.get(item.app_ver) || 0;
					versionsAndDevices.set(item.app_ver, currentSum + item.days[0]);
				}
			});

			return Array.from(versionsAndDevices, ([version, devices]) => ({ version, devices })).sort(
				(a, b) => parseFloat(b.version) - parseFloat(a.version)
			);
		}
	);
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
