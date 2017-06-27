'use strict'

import getDistance from '../components/get-distance'

test('Определяем расстояние от штаба до исполкома', () => {
    const origin = 'Казань, Московская, 42'
    const destinations = 'Казань, Кремлёвская, 1'

    expect.assertions(1)
    return expect(getDistance(origin, destinations)).resolves.toBe(1191)
})

test('Обработка ошибки определения расстояния', () => {
    expect.assertions(1)
    return getDistance().catch(error => {
        expect(error).toEqual(error)
    })
})
