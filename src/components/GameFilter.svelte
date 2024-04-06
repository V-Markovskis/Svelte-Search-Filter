<script>
	import {
		gamesData,
		retentionData,
		selectedCountry,
		selectedVersion
	} from '$lib/stores/stores.js';
	import { selectedGame } from '$lib/stores/stores.js';
	import { derived } from 'svelte/store';

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

			const filteredGameNames = $gamesData.filter((item) => {
				return gameIds.includes(item.app_id);
			});

			return [...new Set(filteredGameNames)];
		}
	);
</script>

<div>
	<span>Game Filter</span>
	<select bind:value={$selectedGame}>
		<option value="All">All</option>
		{#each $filteredGames as game}
			<option value={game.app_id}>{game.name}</option>
		{/each}
	</select>
</div>
