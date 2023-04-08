import { specialDays } from '@/store'
import type { DayType, SpecialDay, WorkDay } from '@/types'
import { timeToDecimal } from '@/utils/dates'
import dayjs from 'dayjs'
import { get } from 'svelte/store'

function monthSpecialDays(
	month: number,
	year: number,
	type: DayType
): SpecialDay[] {
	const monthToCheck = dayjs(new Date(year, month)).format('YYYY/MM')
	return Object.values(get(specialDays)).filter(
		(specialDay) =>
			dayjs(specialDay.date).format('YYYY/MM') === monthToCheck &&
			specialDay.type === type
	)
}

export function getEffectiveWorkingHours(workDay: SpecialDay): number {
	return (
		Math.round(
			(Math.abs(
				timeToDecimal(workDay.endTime) - timeToDecimal(workDay.startTime)
			) -
				workDay.lunchTime / 60) *
				10
		) / 10
	)
}

export function monthWorkedHours(month: number, year: number): number {
	return monthSpecialDays(month, year, 'work').reduce(
		(acc, workDay) => acc + getEffectiveWorkingHours(workDay as WorkDay),
		0
	)
}
