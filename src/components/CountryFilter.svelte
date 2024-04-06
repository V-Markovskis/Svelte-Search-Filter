<script>
	import { derived } from 'svelte/store';
	import {
		retentionData,
		selectedGame,
		selectedVersion,
		selectedCountry
	} from '$lib/stores/stores.js';

	export const filteredCountries = derived(
		[selectedGame, selectedVersion, retentionData],
		([$selectedGame, $selectedVersion, $retentionData]) => {
			const countries = $retentionData
				.filter(
					(item) =>
						(item.app_id === $selectedGame || $selectedGame === 'All') &&
						(item.app_ver === $selectedVersion || $selectedVersion === 'All')
				)
				.map((item) => item.country);

			return [...new Set(countries)];
		}
	);
</script>

<div>
	<span>Country Filter</span>
	<select bind:value={$selectedCountry}>
		<option value="All">All</option>
		{#each $filteredCountries as country}
			<option value={country}>{country}</option>
		{/each}
	</select>
</div>
