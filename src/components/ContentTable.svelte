<script>
	import { derivedRetentionsContent } from '$lib/stores/derivedRetentionsContent.js';

	let sortedDataToShow;

	$: {
		let copiedArray = [...$derivedRetentionsContent];
		//sort by version
		sortedDataToShow = copiedArray.sort((a, b) => {
			return parseFloat(b.app_ver) - parseFloat(a.app_ver);
		});
	}
</script>

<div class="container">
	{#if $derivedRetentionsContent.length === 0 || !$derivedRetentionsContent}
		<div class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="sr-only"></span>
			</div>
		</div>
	{:else}
		<div class="table-container">
			<table class="table">
				<thead>
					<tr class="sticky first-row">
						<th class="sticky first-col" scope="col">Version</th>
						<th class="sticky second-col" scope="col">Country</th>
						<!--eslint-disable-next-line no-unused-vars-->
						{#each sortedDataToShow[0].days as _, index}
							<th class="days-row">D{index}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<!--eslint-disable-next-line no-unused-vars-->
					{#each sortedDataToShow as item, index}
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
		border-radius: 10px;
	}

	.sticky {
		position: sticky;
	}

	.first-row {
		top: 0;
		z-index: 1;
		background: rgb(222, 191, 191);
		box-shadow: 0 0 10px 1px #755e4a;
	}

	.first-col {
		left: 0;
		width: var(--first-col-width);
		max-width: var(--first-col-width);
		min-width: var(--first-col-width);
		background: rgb(222, 191, 191);
	}

	.second-col {
		left: var(--first-col-width);
		width: var(--second-col-width);
		max-width: var(--second-col-width);
		min-width: var(--second-col-width);
		background: rgb(222, 191, 191);
	}

	.days-row {
		background: rgb(222, 191, 191);
	}

	::-webkit-scrollbar {
		-webkit-appearance: none;
		background-color: #e3e3e3;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	::-webkit-scrollbar:vertical {
		width: 10px;
	}

	::-webkit-scrollbar:horizontal {
		height: 10px;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		border: 2px solid #e3e3e3;
		background-color: #999;
	}

	::-webkit-resizer {
		display: none;
	}
</style>
