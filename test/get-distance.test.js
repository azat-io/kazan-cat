'use strict'

import getDistance from '../components/get-distance'

const origin = 'Казань, Московская, 42'
const destinations = {
    id: 12345,
    name: 'Бургер Кинг',
    username: 'burger_king',
    address: 'Московская, 48',
}

test('Определяем расстояние от штаба до Бургер Кинга', () => {
    expect.assertions(1)
    return expect(getDistance(origin, destinations)).resolves.toEqual({
        name: 'Бургер Кинг',
        username: 'burger_king',
        distance: 93,
    })
})

test('Обработка ошибки определения расстояния', () => {
    expect.assertions(0)
    return getDistance(origin, destinations).catch(error => {
        expect(error).toEqual(error)
    })
})
