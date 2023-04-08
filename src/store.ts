import dayjs, { Dayjs } from 'dayjs'
import { writable, type Writable } from 'svelte/store'
import type { SpecialDay } from './types'

function createDate() {
	const initialState = dayjs()
	const { subscribe, set, update } = writable(initialState)

	return {
		subscribe,
		nextMonth: () => update((date: dayjs.Dayjs) => date.add(1, 'M')),
		previousMonth: () => update((date: dayjs.Dayjs) => date.subtract(1, 'M')),
		setDate: (date: dayjs.Dayjs) => set(date),
		reset: () => set(initialState),
	}
}

export const date = createDate()

export const daySelected: Writable<Dayjs | null> = writable(null)
export const specialDaySelected: Writable<SpecialDay | null> = writable(null)

function createSpecialDays(initialState) {
	const { subscribe, update } = writable(initialState)

	return {
		subscribe,
		addSpecialDay: (specialDay: SpecialDay) =>
			update((specialDays) => {
				specialDays[dayjs(specialDay.date).format('YYYY/MM/DD')] = specialDay
				return specialDays
			}),
		removeSpecialDay: (day: Dayjs) =>
			update((specialDays) => {
				delete specialDays[day.format('YYYY/MM/DD')]
				return specialDays
			}),
	}
}

const storedSpecialDays = localStorage.specialDays

export const specialDays = createSpecialDays(
	storedSpecialDays ? JSON.parse(storedSpecialDays) : {}
)
specialDays.subscribe((value) => {
	localStorage.specialDays = JSON.stringify(value)
})

// const initialState = {
//   '2023/04/04': {
//     type: 'work',
//     date: dayjs(),
//     startTime: '08:00',
//     endTime: '16:30',
//     lunchTime: 30,
//   },
//   '2023/04/05': {
//     type: 'work',
//     date: dayjs(),
//     startTime: '08:00',
//     endTime: '17:00',
//     lunchTime: 30,
//   },
//   '2023/04/07': {
//     type: 'public_holiday',
//     date: dayjs(),
//     startTime: null,
//     endTime: null,
//     lunchTime: null,
//   },
//   '2023/04/10': {
//     type: 'holiday',
//     date: dayjs(),
//     startTime: null,
//     endTime: null,
//     lunchTime: null,
//   },
// }
