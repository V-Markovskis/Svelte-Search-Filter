<script>
	import { derived } from 'svelte/store';
	import {
		retentionData,
		selectedGame,
		selectedVersion,
		selectedCountry
	} from '$lib/stores/stores.js';
	import { onDestroy } from 'svelte';
	import Select from 'svelte-select';

	export const filteredCountries = derived(
		[selectedGame, selectedVersion, retentionData],
		([$selectedGame, $selectedVersion, $retentionData]) => {
			let countriesAndDevices = new Map();

			$retentionData.forEach((item) => {
				if (
					(item.app_id === $selectedGame || $selectedGame === 'All') &&
					(item.app_ver === $selectedVersion || $selectedVersion === 'All')
				) {
					let currentSum = countriesAndDevices.get(item.country) || 0;
					countriesAndDevices.set(item.country, currentSum + item.days[0]);
				}
			});

			return Array.from(countriesAndDevices, ([country, devices]) => ({ country, devices }));
		}
	);

	let selectedValue;

	let selectItems = [];
	const unsubscribe = filteredCountries.subscribe(($filteredCountries) => {
		selectItems = $filteredCountries.map((item) => ({
			value: item.country,
			label: item.country,
			devices: item.devices
		}));
	});

	$: if (selectedValue) {
		selectedCountry.set(selectedValue.value);
	} else {
		selectedCountry.set('All');
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
