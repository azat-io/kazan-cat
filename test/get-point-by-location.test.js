'use strict'

import getPointByLocation from '../components/get-point-by-location'

import { location } from '../etc/config.json'

test('Определяем геопозицию казанского штаба', () => {
    expect.assertions(1)
    return expect(getPointByLocation(location))
        .resolves.toEqual([55.7878651, 49.109012])
})

test('Определяем геопозицию самарского штаба', () => {
    expect.assertions(1)
    return expect(getPointByLocation('Самара, ул. Некрасовская, 94'))
        .resolves.toEqual([53.1868944, 50.1051285])
})

test('Обработка ошибки получения адреса', () => {
    expect.assertions(0)
    return getPointByLocation().catch(error => {
        expect(error).toEqual(error)
    })
})
