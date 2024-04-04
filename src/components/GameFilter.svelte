<script>
	import { onDestroy, onMount } from 'svelte';
	import { gamesData } from '$lib/stores/stores.js';
	import { getAllGames } from '../FetchData/getAllGames.js';
	import { selectedGame } from '$lib/stores/stores.js';

	onMount(async () => {
		gamesData.set(await getAllGames());
	});

	let games = [];

	const unsubscribe = gamesData.subscribe((data) => {
		games = data;
	});

	onDestroy(unsubscribe);
</script>

<select bind:value={$selectedGame}>
	<option value="All">All</option>
	{#each games as game}
		<option value={game.app_id}>{game.name}</option>
	{/each}
</select>
<div>{$selectedGame}</div>
