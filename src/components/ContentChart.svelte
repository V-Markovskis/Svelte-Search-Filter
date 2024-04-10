<script>
	import { derivedRetentionsContent } from '$lib/stores/derivedRetentionsContent.js';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let chartInstance;

	const indexes = [0, 5, 10, 20, 25, 30, 60, 90];
	const labels = indexes.map((index) => `D${index}`);

	// chart config function
	function createChartConfig(dataToShow) {
		//group retentions data by version
		const dataByVersion = dataToShow.reduce((acc, item) => {
			(acc[item.app_ver] = acc[item.app_ver] || []).push(item);
			return acc;
		}, {});

		const datasets = Object.keys(dataByVersion).map((version) => {
			//calculate retention (days) for each version
			const versionData = dataByVersion[version];
			//map each version
			const retentionData = versionData.map((item) =>
				indexes.map((index) =>
					item.days[index] ? Math.round((item.days[index] / item.days[0]) * 100) : 0
				)
			);

			// if the version contains multiple arrays - calculate average value
			const aggregatedData = retentionData[0].map((_, index) => {
				// sum each day[index] for each array
				const sum = retentionData.reduce((acc, cur) => acc + cur[index], 0);
				// calculating average value for each day
				return Math.round(sum / retentionData.length);
			});

			return {
				label: version,
				data: aggregatedData
			};
		});

		return {
			type: 'bar',
			data: {
				labels,
				datasets
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						max: 100
					}
				}
			}
		};
	}

	onMount(() => {
		const ctx = document.getElementById('retentionChart').getContext('2d');
		chartInstance = new Chart(ctx, createChartConfig([]));
	});

	$: if ($derivedRetentionsContent && chartInstance) {
		chartInstance.data.datasets = createChartConfig($derivedRetentionsContent).data.datasets;
		chartInstance.update();
	}
</script>

<canvas id="retentionChart"></canvas>
