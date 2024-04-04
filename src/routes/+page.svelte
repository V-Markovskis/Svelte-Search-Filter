<script>
	import { onMount } from 'svelte';
	import { getAllGames } from '../FetchData/getAllGames.js';
	import { getAllRetentions } from '../FetchData/getAllRetentions.js';
	import { gamesData, retentionData } from '../lib/stores/stores.js';
	import GameFilter from '../components/GameFilter.svelte';

	onMount(async () => {
		gamesData.set(await getAllGames());
		retentionData.set(await getAllRetentions());
	});
</script>

<div class="container">
	<GameFilter />
</div>

<style>
	.container {
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 1.5rem;
	}
</style>
