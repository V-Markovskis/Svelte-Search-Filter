<script>
	import { derivedRetentionsContent } from '$lib/stores/derivedRetentionsContent.js';
	//
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
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
					</tr>
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
