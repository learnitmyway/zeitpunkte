import zeitpunkte from './zeitpunkte'

test('one day, 5 minutes, same phase as day, Europe/Berlin', () => {
  const input = {
    day_end: '08:05',
    day_start: '08:00',
    phase_end: '2020-08-03T08:05',
    phase_start: '2020-08-03T08:00',
    week: '0010000',
    time_zone: 'Europe/Berlin',
  }

  const actual = zeitpunkte(input)

  expect(actual[0]).toEqual(new Date('Tue Aug 03 2020 06:00 GMT+0000'))
  expect(actual[5]).toEqual(new Date('Tue Aug 03 2020 06:05 GMT+0000'))
})

test('one day, 5 minutes, phase start before day start, Europe/Berlin', () => {
  const input = {
    day_end: '08:05',
    day_start: '08:00',
    phase_end: '2020-08-03T08:05',
    phase_start: '2020-08-03T07:00',
    week: '0010000',
    time_zone: 'Europe/Berlin',
  }

  const actual = zeitpunkte(input)

  expect(actual.length).toBe(6)
  expect(actual[0]).toEqual(new Date('Tue Aug 03 2020 06:00 GMT+0000'))
  expect(actual[5]).toEqual(new Date('Tue Aug 03 2020 06:05 GMT+0000'))
})
