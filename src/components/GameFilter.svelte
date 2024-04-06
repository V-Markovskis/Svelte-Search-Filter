<script>
	import { onDestroy } from 'svelte';
	import { gamesData } from '$lib/stores/stores.js';
	import { selectedGame } from '$lib/stores/stores.js';

	let games = [];

	const unsubscribe = gamesData.subscribe((data) => {
		games = data;
	});

	onDestroy(unsubscribe);
</script>

<div>
	<span>Game Filter</span>
	<select bind:value={$selectedGame}>
		<option value="All">All</option>
		{#each games as game}
			<option value={game.app_id}>{game.name}</option>
		{/each}
	</select>
</div>
