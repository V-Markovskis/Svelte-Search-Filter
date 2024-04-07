<script>
	import {
		gamesData,
		retentionData,
		selectedCountry,
		selectedVersion
	} from '$lib/stores/stores.js';
	import { selectedGame } from '$lib/stores/stores.js';
	import { derived } from 'svelte/store';

	let isOpen = false;
	let displayGameName = 'All';

	function selectGame(game) {
		selectedGame.set(game.app_id);
		displayGameName = game.name;
		isOpen = false;
	}

	function selectAll() {
		selectedGame.set('All');
		displayGameName = 'All';
		isOpen = false;
	}

	export const filteredGames = derived(
		[selectedVersion, selectedCountry, retentionData, gamesData],
		([$selectedVersion, $selectedCountry, $retentionData, $gamesData]) => {
			const gameIds = $retentionData
				.filter(
					(item) =>
						(item.app_ver === $selectedVersion || $selectedVersion === 'All') &&
						(item.country === $selectedCountry || $selectedCountry === 'All')
				)
				.map((item) => item.app_id);

			const filteredGameNames = $gamesData.filter((item) => {
				return gameIds.includes(item.app_id);
			});

			return [...new Set(filteredGameNames)];
		}
	);
</script>

<div>
	<span>Game Filter</span>
	<select bind:value={$selectedGame}>
		<option value="All">All</option>
		{#each $filteredGames as game}
			<option value={game.app_id}>{game.name}</option>
		{/each}
	</select>
</div>

<!--<div class="dropdown" class:active={isOpen}>-->
<!--	<span>Game Filter</span>-->
<!--	<button class="dropbtn" type="button" on:click={() => (isOpen = !isOpen)}-->
<!--		>{displayGameName}</button-->
<!--	>-->

<!--	{#if isOpen}-->
<!--		<div class="dropdown-content">-->
<!--			<button type="button" on:click={selectAll}>All</button>-->
<!--			{#each $filteredGames as game}-->
<!--				<div class="single-game">-->
<!--					<button type="button" on:click={() => selectGame(game)}>-->
<!--						<img src={game.icon} alt={game.name} />-->
<!--						<span>{game.name}</span>-->
<!--					</button>-->
<!--				</div>-->
<!--			{/each}-->
<!--		</div>-->
<!--	{/if}-->
<!--</div>-->

<!--<style>-->
<!--	.dropdown {-->
<!--		position: relative;-->
<!--	}-->

<!--	.dropdown-content {-->
<!--		position: absolute;-->
<!--		border: 1px solid black;-->
<!--	}-->

<!--	.dropbtn {-->
<!--		border: 1px solid grey;-->
<!--		background: transparent;-->
<!--	}-->

<!--	.dropdown-content button {-->
<!--		display: flex;-->
<!--		align-items: center;-->
<!--		gap: 10px;-->
<!--		border: none;-->
<!--		background: transparent;-->
<!--		width: 100%;-->
<!--		padding: 10px;-->
<!--		text-align: left;-->
<!--	}-->

<!--	.dropdown-content img {-->
<!--		width: 40px;-->
<!--		height: 40px;-->
<!--	}-->

<!--	button:hover {-->
<!--		background-color: #5050cc;-->
<!--		color: white;-->
<!--	}-->
<!--</style>-->
