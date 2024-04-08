import { derived } from 'svelte/store';
import { retentionData, selectedCountry, selectedGame } from '$lib/stores/stores.js';

export const filteredVersions = derived(
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
