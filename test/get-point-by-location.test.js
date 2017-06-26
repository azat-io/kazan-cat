'use strict'

import getPointByLocation from '../app/get-point-by-location'

import { location } from '../etc/config.json'

test('Определяем геопозицию казанского штаба', () => {
    expect.assertions(1)
    return expect(getPointByLocation(location))
        .resolves.toEqual([55.7878651, 49.109012])
})

test('Определяем геопозицию московского штаба', () => {
    expect.assertions(1)
    return expect(getPointByLocation(location))
        .resolves.toEqual([55.7878651, 49.109012])
})
