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

  expect(zeitpunkte(input)[0]).toEqual(
    new Date('Tue Aug 03 2020 06:00 GMT+0000')
  )

  expect(zeitpunkte(input)[5]).toEqual(
    new Date('Tue Aug 03 2020 06:05 GMT+0000')
  )
})
