'use strict'

import Promise from 'bluebird'
import getDistance from './get-distance'
import roundDistance from './round-distance'

/**
 * Сортирует пользователей "Карты сторонников", возвращая список ближайших
 * соседей
 *
 * @param   { number } userId - ID пользователя Телеграм, который запрашивает
 *                              информацию из "Карты сторонников"
 *
 * @param   { Array }  data   - База данных пользователей, представляет собой
 *                              JSON массив, состоящий из объектов, имеющих
 *                              свойства: id - ID пользователя Телеграм, name -
 *                              имя пользователя, username - ник пользователя и
 *                              address - адрес пользователя без указания страны
 *                              и города
 *
 * @param   { number } top    - Количество соседей, которое должно возвращаться
 *
 * @returns { string }        - Список соседей
 */
export default function sortByDistance (userId, data, top) {
    let identifier

    /*
     * Определяем порядковый номер пользователя, запрашивающего информацию для
     * того, чтобы удалить его из массива данных и получить информацию о его
     * месте жительства
     */
    for (let i = 0, max = data.length; i < max; i++) {
        if (userId === data[i].id) {
            userId = data[i]
            identifier = i
            break
        }
    }

    const point = data[identifier]

    data.splice(identifier, 1)

    /*
     * Вспомогательная функция для сортировки массива, состоящего из объектов,
     * по ключу distance
     */
    function compareDistance (prev, next) {
        return prev.distance - next.distance
    }

    return Promise.all(data.map(item => getDistance(point.address, item)))
        .then(response => {
            response.sort(compareDistance)

            return response.slice(0, top).map(item => {
                let rounded = roundDistance(item.distance)
                return `${ item.name } @${ item.username } - ${ rounded }`
            }).join('\n')
        })
}
