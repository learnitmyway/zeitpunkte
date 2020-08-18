const moment = require('moment-timezone')

const millisInOneMinute = 1000 * 60

export default function zeitpunkte(input) {
  const weekArr = input.week.split('')
  const [dayStartHours, dayStartMinutes] = input.day_start.split(':')
  const [dayEndHours, dayEndMinutes] = input.day_end.split(':')

  const phaseStartMillis = moment
    .tz(input.phase_start, input.time_zone)
    .valueOf()

  const phaseEndMillis = moment.tz(input.phase_end, input.time_zone).valueOf()

  const diffPhaseMinutes =
    (phaseEndMillis - phaseStartMillis) / millisInOneMinute

  const phaseStartMinutes = phaseStartMillis / millisInOneMinute

  const arr = []

  for (let i = 0; i <= diffPhaseMinutes; i++) {
    const currentMinute = i + phaseStartMinutes
    const currentMilli = currentMinute * millisInOneMinute
    const currentMoment = moment.tz(currentMilli, input.time_zone)

    const currentDayStartMinutes =
      moment(currentMoment)
        .hours(dayStartHours)
        .minutes(dayStartMinutes)
        .valueOf() / millisInOneMinute

    const currentDayEndMinutes =
      moment(currentMoment)
        .hours(dayEndHours)
        .minutes(dayEndMinutes)
        .valueOf() / millisInOneMinute

    const weekDayIsIncluded = weekArr[Number(currentMoment.day())] === '1'
    const withinCurrentDay =
      currentMinute >= currentDayStartMinutes &&
      currentMinute <= currentDayEndMinutes

    if (weekDayIsIncluded && withinCurrentDay) {
      arr.push(new Date(currentMilli))
    }
  }

  return arr
}
