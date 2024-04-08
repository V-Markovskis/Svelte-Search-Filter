<script>
	import Select from 'svelte-select';
	import { selectedGame } from '$lib/stores/stores.js';
	import { filteredGames } from '$lib/stores/derivedFilteredGames.js';
	import { onDestroy } from 'svelte';

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

<div class="container col-4">
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
