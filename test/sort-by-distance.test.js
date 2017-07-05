'use strict'

import sortByDistance from '../components/sort-by-distance'

const data = [{
    id: 11111,
    name: 'Наутилус',
    username: 'nautilus',
    address: 'Московская, 42',
}, {
    id: 22222,
    name: 'Штаб Навального',
    username: 'teamnavalny_kzn',
    address: 'Московская, 42',
}, {
    id: 33333,
    name: 'ТЦ Кольцо',
    username: 'koltso',
    address: 'Петербургская, 1',
}, {
    id: 44444,
    name: 'Казанский университет',
    username: 'kpfu',
    address: 'Кремлёвская, 18',
}, {
    id: 55555,
    name: 'Верховный суд',
    username: 'verhsud',
    address: 'Пушкина, 72',
}, {
    id: 66666,
    name: 'Смена',
    username: 'smena',
    address: 'Бурхана Шахиди, 7',
}]

const result = 'Наутилус @nautilus - 0.00 км.\n' +
    'Смена @smena - 0.60 км.\n' +
    'Казанский университет @kpfu - 1.20 км.\n' +
    'ТЦ Кольцо @koltso - 1.30 км.'

test('Определяем ближайшие к штабу учреждения', () => {
    expect.assertions(1)
    return expect(sortByDistance(22222, data, 4)).resolves.toBe(result)
})
