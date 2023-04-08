<script lang="ts">
	import type dayjs from 'dayjs'
	import Day from './Day.svelte'

	export let monthMatrix: dayjs.Dayjs[][]
</script>

<div class="month">
	{#each monthMatrix as week}
		{#each week as day}
			<Day {day} />
		{/each}
	{/each}
</div>

<style>
	.month {
		width: 100%;
		height: 100%;
		flex-grow: 1;
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		grid-template-rows: repeat(6, minmax(0, 1fr));
		gap: 2px 2px;
	}
</style>
