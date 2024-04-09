<script>
	import { derivedRetentionsContent } from '$lib/stores/derivedRetentionsContent.js';

	// $: console.log('derivedRetentionsContent.days', $derivedRetentionsContent);
</script>

<div class="container">
	{#if $derivedRetentionsContent.length === 0 || !$derivedRetentionsContent}
		<div class="spinner-border" role="status">
			<span class="sr-only"></span>
		</div>
	{:else}
		<div class="table-container">
			<table class="table table-responsive">
				<thead>
					<tr>
						<th scope="col">Version</th>
						<th scope="col">Country</th>
						{#each $derivedRetentionsContent[0].days as _, index}
							<th>D{index}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each $derivedRetentionsContent as item, index}
						<tr>
							<td class="sticky first-col">{item.app_ver}</td>
							<td class="sticky second-col">{item.country}</td>
							{#each item.days as day, dayIndex (dayIndex)}
								<td>{Math.round((day / item.days[0]) * 100)}%</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.table-container {
		position: relative;
		overflow: auto;
		border: 1px solid black;
		border-radius: 10px;
		max-height: 800px;
	}
</style>
