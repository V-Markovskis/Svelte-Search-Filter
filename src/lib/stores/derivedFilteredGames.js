import { derived } from 'svelte/store';
import { gamesData, retentionData, selectedCountry, selectedVersion } from '$lib/stores/stores.js';

export const filteredGames = derived(
	[selectedVersion, selectedCountry, retentionData, gamesData],
	([$selectedVersion, $selectedCountry, $retentionData, $gamesData]) => {
		const gameIds = $retentionData
			.filter(
				(item) =>
					(item.app_ver === $selectedVersion || $selectedVersion === 'All') &&
					(item.country === $selectedCountry || $selectedCountry === 'All')
			)
			.map((item) => item.app_id);

		return $gamesData
			.filter((item) => gameIds.includes(item.app_id))
			.sort((a, b) => a.name.localeCompare(b.name));
	}
);
