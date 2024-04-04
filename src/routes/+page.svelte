<script>
    import { onMount } from 'svelte';
    import { getAllGames } from '../FetchData/getAllGames.js';
    import { getAllRetentions } from '../FetchData/getAllRetentions.js';

    let games = [];
    let retentionData = [];

    onMount(async () => {
        games = await getAllGames();
        retentionData = await getAllRetentions();
    });
</script>

<div class="container">
    <h1>Search/Filter</h1>
    <input type="search" placeholder="Search..." />

    {#each games as game}
        <p>{game.name}</p>
    {/each}
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
