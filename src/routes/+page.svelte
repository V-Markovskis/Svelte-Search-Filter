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
	{#if $gamesData.length === 0 || !$gamesData || $retentionData.length === 0 || !$retentionData}
		<div class="d-flex justify-content-center mt-2">
			<div class="spinner-border" role="status">
				<span class="sr-only"></span>
			</div>
		</div>
	{:else}
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
	{/if}
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

	@media (max-width: 600px) {
		.header {
			flex-direction: column;
		}
	}
</style>
