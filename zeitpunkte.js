const moment = require('moment-timezone')

const millisInOneMinute = 1000 * 60

export default function zeitpunkte(input) {
  const [dayStartHours, dayStartMinutes] = input.day_start.split(':')
  const [dayEndHours, dayEndMinutes] = input.day_end.split(':')

  const phaseStart = moment.tz(input.phase_start, input.time_zone)
  const phaseStartMillis = phaseStart.valueOf()
  const phaseStartMinutes = phaseStartMillis / millisInOneMinute
  const current = moment.tz(input.phase_end, input.time_zone)
  const phaseEndMillis = current.valueOf()
  const diffPhaseMillis = phaseEndMillis - phaseStartMillis

  const diffPhaseMinutes = diffPhaseMillis / millisInOneMinute

  const arr = []

  for (let i = 0; i <= diffPhaseMinutes; i++) {
    const currentMinute = i + phaseStartMinutes
    const currentMilli = currentMinute * millisInOneMinute
    const current = moment.tz(currentMilli, input.time_zone)
    const currentDayStart = moment(current)
      .hours(dayStartHours)
      .minutes(dayStartMinutes)
    const currentDayStartMinutes = currentDayStart.valueOf() / millisInOneMinute

    const currentDayEnd = moment(current)
      .hours(dayEndHours)
      .minutes(dayEndMinutes)
    const currentDayEndMinutes = currentDayEnd.valueOf() / millisInOneMinute

    if (
      currentMinute >= currentDayStartMinutes &&
      currentMinute <= currentDayEndMinutes
    ) {
      if (arr.length === 0) {
        arr.push(currentMinute * millisInOneMinute)
      } else {
        const lastSlot = arr[arr.length - 1]
        const potentialSlot = lastSlot + millisInOneMinute
        if (
          moment
            .tz(currentMilli, input.time_zone)
            .isSame(moment.tz(potentialSlot, input.time_zone), 'day')
        ) {
          arr.push(arr[arr.length - 1] + millisInOneMinute)
        } else {
          arr.push(currentMilli)
        }
      }
    }
  }

  return arr.map((val) => new Date(val))
}
