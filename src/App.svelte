<script lang="ts">
	import { swipe } from 'svelte-gestures'
	import { getMonthDaysMatrix, timeToDecimal } from '@/utils/dates'
	import Month from '@/components/Month.svelte'
	import { date, daySelected } from '@/store'
	import Modal from '@/components/Modal.svelte'
	import MonthHeader from '@/components/MonthHeader.svelte'
	import { monthWorkedHours } from './services/workDaysService'

	let monthMatrix
	let workedHours

	$: monthMatrix = getMonthDaysMatrix($date.month(), $date.year())
	$: workedHours = monthWorkedHours($date.month(), $date.year())

	const handleDaysUpdated = () => {
		workedHours = monthWorkedHours($date.month(), $date.year())
	}

	const handleSwipe = (event) => {
		const { direction } = event.detail
		if (direction === 'left') date.nextMonth()
		else if (direction === 'right') date.previousMonth()
	}
</script>

{#if $daySelected}
	<Modal on:daysUpdated={handleDaysUpdated} />
{/if}
<main
	use:swipe={{ timeframe: 600, minSwipeDistance: 60, touchAction: 'none' }}
	on:swipe={handleSwipe}>
	<MonthHeader {workedHours} />
	<Month {monthMatrix} />
</main>

<style>
	main {
		height: 100vh;
		background-color: #fdf9f0;
		display: flex;
		flex-direction: column;
	}
</style>
