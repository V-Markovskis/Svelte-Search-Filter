<script>
	import { filteredGames } from '$lib/stores/derivedFilteredGames.js';
	import { filteredCountries } from '$lib/stores/derivedFilteredCountries.js';
	import { filteredVersions } from '$lib/stores/derivedFilteredVersions.js';

	$: console.log('filteredGames', $filteredGames);
	$: console.log('filteredCountries', $filteredCountries);
	$: console.log('filteredVersions', $filteredVersions);
</script>

<table class="table table-responsive">
	<thead>
		<tr>
			<th scope="col">Version</th>
			<th scope="col">Country</th>
			<th scope="col">DAYS HERE</th>
			<th scope="col">DAYS HERE</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">1</th>
			<td>Mark</td>
			<td>Otto</td>
			<td>@mdo</td>
		</tr>
	</tbody>
</table>
