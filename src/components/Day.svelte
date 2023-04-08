<script lang="ts">
	import dayjs from 'dayjs'
	import { daySelected, specialDaySelected, specialDays } from '@/store'
	import type { SpecialDay } from '@/types'
	import { getEffectiveWorkingHours } from '@/services/workDaysService'

	export let day: dayjs.Dayjs | null
	$: specialDay = day ? $specialDays[day.format('YYYY/MM/DD')] : null

	const getDayClass = (
		day: dayjs.Dayjs,
		specialDay: SpecialDay | null
	): string => {
		let classes = []

		if (day.format('YYYY/MM/DD') === dayjs().format('YYYY/MM/DD')) {
			classes.push('today')
		}

		if ([6, 0].includes(day.day())) {
			classes.push('weekend')
		}

		if (specialDay) {
			classes.push(specialDay.type)
		}

		return classes.join(' ')
	}

	const handleClickDay = () => {
		daySelected.set(day)
		specialDaySelected.set(specialDay)
	}
</script>

{#if day}
	<button class="day {getDayClass(day, specialDay)}" on:click={handleClickDay}>
		<span class="dayInner">{day ? day.date() : ''}</span>
		{#if specialDay && specialDay.type === 'work'}
			<div class="workDay">
				<p class="workedHours">
					{getEffectiveWorkingHours(specialDay)}
				</p>
			</div>
		{/if}
		<div />
	</button>
{:else}
	<div />
{/if}

<style>
	.day {
		display: flex;
		flex-direction: column;
		font-weight: 400;
		font-size: max(1.7vmin, 12px);
		padding: 1vmin;
		background-color: var(--light-gray);
	}

	.dayInner {
		font-weight: 700;
	}

	.today {
		border: 4px solid var(--black);
	}

	.workDay {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.weekend {
		background-color: var(--gray);
	}

	.work {
		background-color: var(--green);
	}

	.holiday {
		background-color: var(--yellow);
	}

	.public_holiday {
		background-color: var(--red);
	}

	.workedHours {
		font-size: max(1.7vmin, 12px);
		font-weight: 700;
	}
</style>
