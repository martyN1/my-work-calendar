<script lang="ts">
	import HomeIcon from 'svelte-icons/fa/FaHome.svelte'
	import { date } from '@/store'
	import { getMonthList, getYearList } from '@/utils/dates'
	import dayjs from 'dayjs'
	import { onMount } from 'svelte'

	export let workedHours

	let selectedMonth
	let selectedYear

	date.subscribe((value) => {
		selectedMonth = value.month()
		selectedYear = value.year()
	})

	onMount(() => {
		selectedMonth = $date.month()
		selectedYear = $date.year()
	})

	const handleSelect = () => {
		date.setDate(dayjs(new Date(selectedYear, selectedMonth)))
	}

	const handleClickHome = () => {
		date.setDate(dayjs())
	}
</script>

<header>
	<button class="homeButton" on:click={handleClickHome}>
		<HomeIcon />
	</button>
	<div class="yearMonth">
		<select
			class="year"
			name="year"
			id="year"
			bind:value={selectedYear}
			on:change={handleSelect}>
			{#each getYearList() as year}
				<option value={year}>{year}</option>
			{/each}
		</select>

		<select
			class="month"
			name="month"
			id="month"
			bind:value={selectedMonth}
			on:change={handleSelect}>
			{#each getMonthList() as month, i}
				<option value={i}>{month}</option>
			{/each}
		</select>
	</div>

	<p class="hours">Worked hours: {workedHours}</p>
</header>

<style>
	header {
		font-size: max(2.5vmin, 14px);
		padding: 12px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.homeButton {
		width: max(2.8vmin, 16px);
		height: max(2.8vmin, 16px);
	}

	.yearMonth {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.year {
		font-weight: 700;
	}

	.month {
		font-weight: 300;
	}
</style>
