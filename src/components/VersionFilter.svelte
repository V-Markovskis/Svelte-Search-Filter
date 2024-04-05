<script>
	import {
		selectedGame,
		retentionData,
		filteredVersions,
		selectedVersion
	} from '$lib/stores/stores.js';
	import { onDestroy } from 'svelte';

	let versions = [];

	const unsubscribe = selectedGame.subscribe(($selectedGame) => {
		versions = $retentionData
			.filter((item) => item.app_id === $selectedGame || $selectedGame === 'All')
			.map((item) => item.app_ver);

		filteredVersions.set([...new Set(versions)]);
	});

	onDestroy(unsubscribe);
</script>

<select bind:value={$selectedVersion}>
	<option value="All">All</option>
	{#each $filteredVersions as version}
		<option value={version}>{version}</option>
	{/each}
</select>
