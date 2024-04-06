import { derived, writable } from 'svelte/store';

export function derivedStoreCreation(
	firstStore,
	secondStore,
	retentionData,
	gamesData = writable([])
) {
	derived([firstStore, secondStore], ([$firstStore, $secondStore]) => {
		const result = retentionData
			.filter(
				(item) =>
					(item.app_id === $firstStore || $firstStore === 'All') &&
					(item.country === $secondStore || $secondStore === 'All')
			)
			.map((item) => item.app_ver);

		return [...new Set(result)];
	});
}
