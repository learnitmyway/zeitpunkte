import zeitpunkte from './zeitpunkte'

test('one day, 5 minutes, same phase as day, Europe/Berlin', () => {
  const input = {
    day_end: '08:05',
    day_start: '08:00',
    phase_end: '2020-08-03T08:05',
    phase_start: '2020-08-03T08:00',
    week: '0100000',
    time_zone: 'Europe/Berlin',
  }

  const actual = zeitpunkte(input)

  expect(actual[0]).toEqual(new Date('Aug 03 2020 06:00 GMT+0000'))
  expect(actual[5]).toEqual(new Date('Aug 03 2020 06:05 GMT+0000'))
})

test('one day, 5 minutes, phase start before day start, Europe/Berlin', () => {
  const input = {
    day_end: '08:05',
    day_start: '08:00',
    phase_end: '2020-08-03T08:05',
    phase_start: '2020-08-03T07:00',
    week: '0100000',
    time_zone: 'Europe/Berlin',
  }

  const actual = zeitpunkte(input)

  expect(actual.length).toBe(6)
  expect(actual[0]).toEqual(new Date('Aug 03 2020 06:00 GMT+0000'))
  expect(actual[5]).toEqual(new Date('Aug 03 2020 06:05 GMT+0000'))
})

test('one day, 5 minutes, phase end after day end, Europe/Berlin', () => {
  const input = {
    day_end: '08:05',
    day_start: '08:00',
    phase_end: '2020-08-03T09:05',
    phase_start: '2020-08-03T08:00',
    week: '0100000',
    time_zone: 'Europe/Berlin',
  }

  const actual = zeitpunkte(input)

  expect(actual.length).toBe(6)
  expect(actual[0]).toEqual(new Date('Aug 03 2020 06:00 GMT+0000'))
  expect(actual[5]).toEqual(new Date('Aug 03 2020 06:05 GMT+0000'))
})

test('one day, 5 minutes, phase start before day start, phase end after day end, Portugal', () => {
  const input = {
    day_end: '08:05',
    day_start: '08:00',
    phase_end: '2020-08-03T09:05',
    phase_start: '2020-08-03T08:00',
    week: '0100000',
    time_zone: 'Portugal',
  }

  const actual = zeitpunkte(input)

  expect(actual.length).toBe(6)
  expect(actual[0]).toEqual(new Date('Aug 03 2020 07:00 GMT+0000'))
  expect(actual[5]).toEqual(new Date('Aug 03 2020 07:05 GMT+0000'))
})

test('one day, 5 minutes, phase start before day start, phase end after day end, GMT+0', () => {
  const input = {
    day_end: '08:05',
    day_start: '08:00',
    phase_end: '2020-08-03T09:05',
    phase_start: '2020-08-03T08:00',
    week: '0100000',
    time_zone: 'Iceland',
  }

  const actual = zeitpunkte(input)

  expect(actual.length).toBe(6)
  expect(actual[0]).toEqual(new Date('Aug 03 2020 08:00 GMT+0000'))
  expect(actual[5]).toEqual(new Date('Aug 03 2020 08:05 GMT+0000'))
})

test('1 minute for 2 days, phase start before day start, phase end after day end, GMT+0', () => {
  const input = {
    day_end: '08:01',
    day_start: '08:00',
    phase_end: '2020-08-04T09:05',
    phase_start: '2020-08-03T07:00',
    week: '0110000',
    time_zone: 'Iceland',
  }

  const actual = zeitpunkte(input)

  expect(actual).toEqual([
    new Date('Aug 03 2020 08:00 GMT+0000'),
    new Date('Aug 03 2020 08:01 GMT+0000'),
    new Date('Aug 04 2020 08:00 GMT+0000'),
    new Date('Aug 04 2020 08:01 GMT+0000'),
  ])
})

test('1 minute for 2 days, phase start before day start, phase end after day end, GMT-12', () => {
  const input = {
    day_end: '08:01',
    day_start: '08:00',
    phase_end: '2020-08-04T09:05',
    phase_start: '2020-08-03T07:00',
    week: '0110000',
    time_zone: 'Etc/GMT-12',
  }

  const actual = zeitpunkte(input)

  expect(actual).toEqual([
    new Date('Aug 02 2020 20:00 GMT+0000'),
    new Date('Aug 02 2020 20:01 GMT+0000'),
    new Date('Aug 03 2020 20:00 GMT+0000'),
    new Date('Aug 03 2020 20:01 GMT+0000'),
  ])
})

test('1 minute Mo and We, phase start before day start, phase end after day end, GMT+0', () => {
  const input = {
    day_end: '08:01',
    day_start: '08:00',
    phase_end: '2020-08-06T09:05',
    phase_start: '2020-08-02T07:00',
    week: '0101000',
    time_zone: 'Etc/GMT+0',
  }

  const actual = zeitpunkte(input)

  expect(actual).toEqual([
    new Date('Aug 03 2020 08:00 GMT+0000'),
    new Date('Aug 03 2020 08:01 GMT+0000'),
    new Date('Aug 05 2020 08:00 GMT+0000'),
    new Date('Aug 05 2020 08:01 GMT+0000'),
  ])
})
