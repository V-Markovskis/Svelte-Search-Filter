<script>
	import { onMount } from 'svelte';
	import { getAllGames } from '../FetchData/getAllGames.js';
	import { getAllRetentions } from '../FetchData/getAllRetentions.js';
	import { gamesData, retentionData } from '../lib/stores/stores.js';
	import GameFilter from '../components/GameFilter.svelte';
	import VersionFilter from '../components/VersionFilter.svelte';
	import CountryFilter from '../components/CountryFilter.svelte';
	import ContentTable from '../components/ContentTable.svelte';

	onMount(async () => {
		gamesData.set(await getAllGames());
		retentionData.set(await getAllRetentions());
	});
</script>

<div class="container">
	<GameFilter />
	<VersionFilter />
	<CountryFilter />
</div>

<div class="container">
	<ContentTable />
</div>

<style>
	.container {
		margin-inline: auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-top: 1.5rem;
		gap: 20px;
	}
</style>
