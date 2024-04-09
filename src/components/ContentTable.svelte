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
			<table class="table">
				<thead>
					<tr class="sticky first-row">
						<th class="sticky first-col" scope="col">Version</th>
						<th class="sticky second-col" scope="col">Country</th>
						<!--eslint-disable-next-line no-unused-vars-->
						{#each $derivedRetentionsContent[0].days as _, index}
							<th>D{index}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<!--eslint-disable-next-line no-unused-vars-->
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
	:root {
		--first-col-width: 100px;
		--second-col-width: 170px;
	}

	.table-container {
		overflow: auto;
		max-height: 800px;
	}

	.sticky {
		position: sticky;
	}

	.first-row {
		top: 0;
		z-index: 1;
	}

	.first-col {
		left: 0;
		width: var(--first-col-width);
		max-width: var(--first-col-width);
		min-width: var(--first-col-width);
	}

	.second-col {
		left: var(--first-col-width);
		width: var(--second-col-width);
		max-width: var(--second-col-width);
		min-width: var(--second-col-width);
	}
</style>
