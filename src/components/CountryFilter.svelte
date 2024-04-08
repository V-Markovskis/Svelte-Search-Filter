<script>
	import { selectedCountry } from '$lib/stores/stores.js';
	import { filteredCountries } from '$lib/stores/derivedFilteredCountries.js';
	import { onDestroy } from 'svelte';
	import Select from 'svelte-select';

	let selectedValue;

	let selectItems = [];
	const unsubscribe = filteredCountries.subscribe(($filteredCountries) => {
		selectItems = $filteredCountries.map((item) => ({
			value: item.country,
			label: item.country,
			devices: item.devices
		}));
	});

	$: if (selectedValue) {
		selectedCountry.set(selectedValue.value);
	} else {
		selectedCountry.set('All');
	}

	onDestroy(unsubscribe);
</script>

<div class="container col-4">
	<span>Country Filter</span>
	<Select bind:value={selectedValue} items={selectItems} placeholder="All">
		<div slot="item" let:item class="select-item">
			<span title={item.value} class="trimmed-text">{item.value}</span>
			<span>({item.devices})</span>
		</div>
	</Select>
</div>

<style>
	.trimmed-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 150px;
		display: inline-block;
	}

	.select-item {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
