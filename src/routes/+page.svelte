<script>
	import { onMount } from 'svelte';
	import { getAllGames } from '../FetchData/getAllGames.js';
	import { getAllRetentions } from '../FetchData/getAllRetentions.js';
	import { gamesData, retentionData, filteredGames } from '../lib/stores/stores.js';

	onMount(async () => {
		gamesData.set(await getAllGames());
		retentionData.set(await getAllRetentions());

		gamesData.subscribe((data) => {
			filteredGames.set(data);
		});
	});
</script>

<div>
	<div class="container header">
		<h1>Search/Filter</h1>
		<input type="search" placeholder="Search..." />
	</div>
	<div class="container">
		<select id="gameFilter">
			<option value="all">All</option>
			<!-- Здесь будут опции с играми -->
		</select>

		<!-- Фильтр Версии -->
		<select id="versionFilter">
			<option value="all">All</option>
			<!-- Здесь будут опции с версиями -->
		</select>

		<!-- Фильтр Страны -->
		<select id="countryFilter">
			<option value="all">All</option>
			<!-- Здесь будут опции с странами -->
		</select>
	</div>
</div>

<style>
	.header {
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 1.5rem;
	}
</style>
