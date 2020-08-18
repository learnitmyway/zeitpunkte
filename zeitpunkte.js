const moment = require('moment-timezone')

const millisInOneMinute = 1000 * 60

export default function zeitpunkte(input) {
  const [dayStartHours, dayStartMinutes] = input.day_start.split(':')
  const [dayEndHours, dayEndMinutes] = input.day_end.split(':')

  const phaseStart = moment(input.phase_start)
  const phaseStartMillis = phaseStart.valueOf()
  const phaseStartMinutes = phaseStartMillis / millisInOneMinute
  const phaseEnd = moment(input.phase_end)
  const phaseEndMillis = phaseEnd.valueOf()
  const diffPhaseMillis = phaseEndMillis - phaseStartMillis

  const diffPhaseMinutes = diffPhaseMillis / millisInOneMinute

  const phaseStartDayStart = phaseStart
    .hours(dayStartHours)
    .minutes(dayStartMinutes)
  const phaseStartDayStartMillis = phaseStartDayStart.valueOf()
  const phaseStartDayStartMinutes = phaseStartDayStartMillis / millisInOneMinute

  const phaseEndDayEnd = phaseEnd.hours(dayEndHours).minutes(dayEndMinutes)
  const phaseEndDayEndMillis = phaseEndDayEnd.valueOf()
  const phaseEndDayEndMinutes = phaseEndDayEndMillis / millisInOneMinute

  const arr = []

  for (let i = 0; i <= diffPhaseMinutes; i++) {
    const currentMinute = i + phaseStartMinutes

    if (
      currentMinute >= phaseStartDayStartMinutes &&
      currentMinute <= phaseEndDayEndMinutes
    ) {
      if (arr.length === 0) {
        arr.push(currentMinute * millisInOneMinute)
      } else {
        arr.push(arr[arr.length - 1] + millisInOneMinute)
      }
    }
  }

  return arr.map((val) => new Date(val))
}
