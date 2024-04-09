import { derived } from 'svelte/store';
import {
	retentionData,
	selectedCountry,
	selectedGame,
	selectedVersion
} from '$lib/stores/stores.js';

export const derivedRetentionsContent = derived(
	[selectedVersion, selectedCountry, selectedGame, retentionData],
	([$selectedVersion, $selectedCountry, $selectedGame, $retentionData]) => {
		if ($selectedVersion === 'All' && $selectedCountry === 'All' && $selectedGame === 'All') {
			return $retentionData;
		} else {
			return $retentionData.filter(
				(item) =>
					(item.app_ver === $selectedVersion || $selectedVersion === 'All') &&
					(item.country === $selectedCountry || $selectedCountry === 'All') &&
					(item.app_id === $selectedGame || $selectedGame === 'All')
			);
		}
	}
);
