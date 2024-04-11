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

		const datasets = Object.entries(dataByVersion).map(([version, versionData]) => {
			const chartData = [];

			versionData.forEach((item) => {
				// take each days array for particular version
				item.days.forEach((day, index) => {
					if (indexes.includes(index)) {
						//x and y already known to chart.js
						chartData.push({
							x: `D${index}`,
							y: item.days[index] ? Math.round((day / item.days[0]) * 100) : 0,
							country: item.country
						});
					}
				});
			});

			return {
				label: version,
				data: chartData
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
				},
				plugins: {
					tooltip: {
						callbacks: {
							label: function (context) {
								console.log('context', context);
								let label = context.dataset.label || '';

								if (context.parsed.y !== null) {
									label += `: ${context.parsed.y}%`;
								}
								return label;
							}
						}
					},
					legend: {
						title: {
							display: true,
							text: 'Versions',
							font: {
								size: 18
							}
						}
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
