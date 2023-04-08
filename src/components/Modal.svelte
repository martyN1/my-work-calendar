<script lang="ts">
	import TrashIcon from 'svelte-icons/fa/FaTrash.svelte'
	import { getEffectiveWorkingHours } from '@/services/workDaysService'
	import { daySelected, specialDaySelected, specialDays } from '@/store'
	import dayjs from 'dayjs'
	import { createEventDispatcher, onMount } from 'svelte'

	const dispatch = createEventDispatcher()

	$: day = $daySelected
	$: specialDay = $specialDaySelected

	let typeFormOptions = [
		{ key: 'work', value: 'Work' },
		{ key: 'holiday', value: 'Holidays' },
		{ key: 'public_holiday', value: 'Public Holidays' },
	]

	let workedHours
	let type
	let start
	let end
	let lunchTime

	$: if (type === 'work') {
		workedHours = getEffectiveWorkingHours({
			type: 'work',
			date: dayjs(),
			startTime: start,
			endTime: end,
			lunchTime,
		})
	}

	onMount(() => {
		type = specialDay ? specialDay.type : 'work'
		start = specialDay ? specialDay.startTime : '08:00'
		end = specialDay ? specialDay.endTime : '16:30'
		lunchTime = specialDay ? specialDay.lunchTime : 30
	})

	const handleSubmit = () => {
		specialDays.addSpecialDay({
			type,
			date: day,
			startTime: start,
			endTime: end,
			lunchTime,
		})

		daySelected.set(null)
		specialDaySelected.set(null)
		dispatch('daysUpdated')
	}

	const handleDelete = () => {
		specialDays.removeSpecialDay(day)

		daySelected.set(null)
		specialDaySelected.set(null)
		dispatch('daysUpdated')
	}
</script>

<button
	class="background"
	on:click|stopPropagation={() => daySelected.set(null)}>
	<button class="modal" on:click|stopPropagation={() => {}}>
		<div class="modalBody">
			<h1>{day ? day.format('DD/MM/YYYY') : ''}</h1>

			<form on:submit|preventDefault={handleSubmit}>
				<div class="type">
					<label for="type">Day type:</label>
					<select name="type" id="type" bind:value={type}>
						{#each typeFormOptions as option}
							<option
								value={option.key}
								on:click={(e) => console.log('option click', e.target)}
								>{option.value}</option>
						{/each}
					</select>
				</div>
				{#if type === 'work'}
					<div class="period">
						<input name="start" type="time" bind:value={start} />
						<span>-</span>
						<input name="end" type="time" bind:value={end} />
					</div>

					<div class="break">
						<label for="lunchTime">Break time</label>
						<input
							name="lunchTime"
							type="number"
							min="0"
							bind:value={lunchTime} />
						<span>m</span>
					</div>
					<div class="workedHours">
						Worked hours: <span class="workedHoursNumber">{workedHours}</span>
					</div>
				{/if}

				<div class="buttons">
					<button class="button submitButton" type="submit">Confirm</button>
					{#if specialDay}
						<button type="button" class="removeButton" on:click={handleDelete}
							><TrashIcon /></button>
					{/if}
				</div>
			</form>
		</div>
	</button>
</button>

<style>
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		backdrop-filter: blur(2px);
	}

	.modal {
		border-radius: 10px;
		padding: 24px;
		background-color: #fdf9f0;
		z-index: 15;
	}

	h1 {
		font-weight: 700;
		margin-bottom: 12px;
	}

	input,
	select {
		text-align: center;
		color: #6b6658;
		border-bottom: 1px solid #6b6658;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.modalBody {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.period {
		display: flex;
		flex-direction: row;
		gap: 5px;
	}

	.break > input {
		width: 40px;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 12px;
		gap: 8px;
	}

	.buttons button {
		cursor: pointer;
	}

	.button {
		text-align: center;
		padding: 4px;
		border-radius: 5px;
	}

	.submitButton {
		flex: 1;
		border: 1px solid #4c4637;
	}

	.removeButton {
		width: 24px;
		height: 24px;
		color: #bf5846;
	}

	.workedHours {
		margin-top: 8px;
	}

	.workedHoursNumber {
		font-weight: 700;
		margin-left: 8px;
	}
</style>
