import type dayjs from 'dayjs'

export interface WorkDay {
	type: WorkDayType
	date: dayjs.Dayjs
	startTime: string
	endTime: string
	lunchTime: number
}

export interface NoWorkDay {
	type: NoWorkDayType
	date: dayjs.Dayjs
	startTime: null
	endTime: null
	lunchTime: null
}

export interface SpecialDay {
	type: DayType
	date: dayjs.Dayjs
	startTime: string | null
	endTime: string | null
	lunchTime: number | null
}

export type WorkDayType = 'work'
export type NoWorkDayType = 'holiday' | 'public_holiday'

export type DayType = NoWorkDayType | WorkDayType
