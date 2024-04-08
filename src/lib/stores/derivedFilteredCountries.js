import { derived } from 'svelte/store';
import { retentionData, selectedGame, selectedVersion } from '$lib/stores/stores.js';

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

		return Array.from(countriesAndDevices, ([country, devices]) => ({ country, devices })).sort(
			(a, b) => parseInt(b.devices) - parseInt(a.devices)
		);
	}
);
