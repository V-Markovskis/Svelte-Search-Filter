<script>
	import {
		selectedGame,
		retentionData,
		selectedVersion,
		selectedCountry
	} from '$lib/stores/stores.js';
	import { derived } from 'svelte/store';

	let versions = [];

	export const filteredVersions = derived(
		[selectedGame, selectedCountry, retentionData],
		([$selectedGame, $selectedCountry, $retentionData]) => {
			versions = $retentionData
				.filter(
					(item) =>
						(item.app_id === $selectedGame || $selectedGame === 'All') &&
						(item.country === $selectedCountry || $selectedCountry === 'All')
				)
				.map((item) => item.app_ver);

			return [...new Set(versions)];
		}
	);
</script>

<div>
	<span>Version Filter</span>
	<select bind:value={$selectedVersion}>
		<option value="All">All</option>
		{#each $filteredVersions as version}
			<option value={version}>{version}</option>
		{/each}
	</select>
</div>
