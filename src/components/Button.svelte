<script>
	export let label = 'Button';
	export let disabled = false;
	export let onClick = () => {};

	// Function to handle button clicks
	function handleClick() {
		if (!disabled) {
			onClick();
		}
	}
</script>

<button class="btn btn-primary" on:click={handleClick} {disabled}>
	{label}
</button>

<style>
	.btn-primary,
	.btn-primary:active {
		background-color: rgb(222, 191, 191) !important;
		border: 1px solid #cc8181 !important;
		color: black !important;
	}

	.btn-primary:hover {
		background-color: #d09494 !important;
	}
</style>
