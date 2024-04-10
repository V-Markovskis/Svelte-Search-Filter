<script>
	import { onMount } from 'svelte';
	import { getAllGames } from '../FetchData/getAllGames.js';
	import { getAllRetentions } from '../FetchData/getAllRetentions.js';
	import { gamesData, retentionData } from '../lib/stores/stores.js';
	import GameFilter from '../components/GameFilter.svelte';
	import VersionFilter from '../components/VersionFilter.svelte';
	import CountryFilter from '../components/CountryFilter.svelte';
	import ContentTable from '../components/ContentTable.svelte';
	import ContentChart from '../components/ContentChart.svelte';

	onMount(async () => {
		gamesData.set(await getAllGames());
		retentionData.set(await getAllRetentions());
	});
</script>

<div class="container">
	<div class="header">
		<GameFilter />
		<VersionFilter />
		<CountryFilter />
	</div>
	<!--	<div>-->
	<!--		<ContentTable />-->
	<!--	</div>-->
	<div>
		<ContentChart />
	</div>
</div>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-top: 1.5rem;
		padding-bottom: 3rem;
	}
</style>
