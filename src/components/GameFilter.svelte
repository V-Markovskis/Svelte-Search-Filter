<script>
	import Select from 'svelte-select';
	import {
		selectedVersion,
		selectedCountry,
		retentionData,
		gamesData,
		selectedGame
	} from '$lib/stores/stores.js';
	import { derived } from 'svelte/store';
	import { onDestroy } from 'svelte';

	const filteredGames = derived(
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

	let selectedValue;

	let selectItems = [];
	const unsubscribe = filteredGames.subscribe(($filteredGames) => {
		selectItems = $filteredGames.map((game) => ({
			value: game.app_id,
			label: game.name,
			icon: game.icon
		}));
	});

	$: if (selectedValue) {
		selectedGame.set(selectedValue.value);
	} else {
		selectedGame.set('All');
	}

	onDestroy(unsubscribe);
</script>

<div class="container">
	<span>Game Filter</span>
	<Select bind:value={selectedValue} items={selectItems} placeholder="All">
		<div slot="item" let:item class="select-item">
			<img src={item.icon} alt="Icon" class="icon" />
			{item.label}
		</div>
	</Select>
</div>

<style>
	.select-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.icon {
		width: 20px;
		height: 20px;
	}
</style>
