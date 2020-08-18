const moment = require('moment-timezone')

export default function zeitpunkte(input) {
  const [dayStartHours, dayStartMinutes] = input.day_start.split(':')
  const [dayEndHours, dayEndMinutes] = input.day_end.split(':')
  const diffMinutes =
    (dayEndHours - dayEndMinutes) * 60 + (dayEndMinutes - dayStartMinutes)

  const phaseStartMillis = moment(input.phase_start).valueOf()

  const arr = [phaseStartMillis]

  for (let i = 1; i <= diffMinutes; i++) {
    arr[i] = arr[i - 1] + 1000 * 60
  }

  return arr.map((val) => new Date(val))
}
