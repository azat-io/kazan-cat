'use strict'

import isKazan from '../components/is-kazan'

test('Адрес верен и находится в Казани', () => {
    expect.assertions(1)
    return expect(isKazan('Казань, ул. Московская, 42'))
        .resolves.toBe(true)
})

test('Адрес верен, но находится не в Казани', () => {
    expect.assertions(1)
    return expect(isKazan('Набережные Челны, пр. Чулман, 4'))
        .resolves.toBe(false)
})

test('Адрес не найден', () => {
    expect.assertions(1)
    return expect(isKazan('Казань, ул. Бла-бла-бла'))
        .resolves.toBe('Адрес не найден')
})
