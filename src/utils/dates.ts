import dayjs from 'dayjs'

export function getMonthDaysMatrix(
	month = dayjs().month(),
	year = dayjs().year()
): dayjs.Dayjs[][] {
	month = Math.floor(month)

	const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day()
	let currentMonthCount = 0 - firstDayOfTheMonth
	const daysMatrix = new Array(6).fill([]).map(() =>
		new Array(7).fill(null).map(() => {
			currentMonthCount += 1
			let day = dayjs(new Date(year, month, currentMonthCount))
			return day.month() === month ? day : null
		})
	)
	return daysMatrix
}

export function getMonthList(
	locales?: string | string[],
	format: 'long' | 'short' = 'long'
): string[] {
	const year = new Date().getFullYear()
	const monthList = [...Array(12).keys()]
	const formatter = new Intl.DateTimeFormat(locales, {
		month: format,
	})

	const getMonthName = (monthIndex: number) =>
		formatter.format(new Date(year, monthIndex))

	return monthList.map(getMonthName)
}

export function getYearList(): number[] {
	const currentYear = dayjs().year()
	return [
		currentYear - 3,
		currentYear - 2,
		currentYear - 1,
		currentYear,
		currentYear + 1,
	]
}

export function timeToDecimal(time: string): number {
	const [hours, minutes] = time.split(':')
	return parseFloat(
		(parseInt(hours, 10) + parseInt(minutes, 10) / 60).toString()
	)
}
