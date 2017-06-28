'use strict'

import roundDistance from '../components/round-distance'

test('1234 м. округляется до 1.20 км.', () => {
    expect(roundDistance(1234)).toBe('1.20 км.')
})

test('90 м. не округляется', () => {
    expect(roundDistance(90)).toBe('Менее 100 метров')
})

test('1000 м. округляется до 1.00 км.', () => {
    expect(roundDistance(1000)).toBe('1.00 км.')
})
