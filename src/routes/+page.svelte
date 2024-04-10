<script>
	import { onMount } from 'svelte';
	import { getAllGames } from '../FetchData/getAllGames.js';
	import { getAllRetentions } from '../FetchData/getAllRetentions.js';
	import { gamesData, retentionData } from '../lib/stores/stores.js';
	import GameFilter from '../components/GameFilter.svelte';
	import VersionFilter from '../components/VersionFilter.svelte';
	import CountryFilter from '../components/CountryFilter.svelte';
	import ContentChart from '../components/ContentChart.svelte';
	import ContentTable from '../components/ContentTable.svelte';
	import Button from '../components/Button.svelte';

	onMount(async () => {
		gamesData.set(await getAllGames());
		retentionData.set(await getAllRetentions());
	});
	let displayTable = true;
</script>

<div class="container">
	<div class="header">
		<GameFilter />
		<VersionFilter />
		<CountryFilter />
	</div>
	<div class="container button-container d-flex gap-3">
		<Button
			label="Table View"
			disabled={displayTable}
			onClick={() => {
				displayTable = true;
			}}
		/>
		<Button
			label="Chart View"
			disabled={!displayTable}
			onClick={() => {
				displayTable = false;
			}}
		/>
	</div>
	<div>
		{#if displayTable}
			<ContentTable />
		{:else}
			<ContentChart />
		{/if}
	</div>
</div>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
	}

	.button-container {
		padding-bottom: 1.5rem;
	}
</style>
