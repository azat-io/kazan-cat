'use strict'

import GoogleMapsAPI from 'googlemaps'
import BlueBird from 'bluebird'

/**
 * Определяет дистанцию между двумя географическими точкам, передаваемыми в
 * качестве аргумента функции
 *
 * @param   { string }  myPoint   - Адрес с указанием города, улицы, и дома
 *
 * @param   { Object }  yourPoint - Адрес, переданный в виде объекта, имеющего
 *                                  следующие свойства: id - id пользователя,
 *                                  name - имя пользователя, username - ник
 *                                  пользователя, address - адрес пользователя
 *
 * @returns { Promise }           - Переходя в состояние fulfilled, промис в
 *                                  качестве результата возвращает объект со
 *                                  следующими свойствами: name, username и
 *                                  distance - число, обозначающее количество
 *                                  метров между двумя географическими точками,
 *                                  необходимое для преодоления дистанции при
 *                                  пешей ходьбе
 *
 * @example Пример использования функции getDistance
 *
 * const station = 'Казань, пл. Привокзальная, 1 а,'
 * const stadium = {
 *     id: 12345,
 *     name: 'Центральный стадион',
 *     username: 'stadium',
 *     address: 'Казань, ул. Ташаяк, 2'
 * }
 *
 * getDistance(station, stadium).then(response => {
 *     console.log(response) // => {
 * })                        //        name: 'Центральный стадион',
 *                           //        username: 'stadium',
 *                           //        distance: 1023,
 *                           //    }
 */
export default function getDistance (myPoint, yourPoint) {
    const geo = new GoogleMapsAPI({
        key: 'AIzaSyCdDP43_gipNwmWuprW_3vBq31KWEiss6Q',
        stagger_time: 1000,
        encode_polylines: false,
        secure: true,
    })

    const params = {
        origins: `Россия, г. Казань, ${ myPoint }`,
        destinations: `Россия, г. Казань, ${ yourPoint.address }`,
        language: 'ru',
        mode: 'walking', // Пешее расстояние
    }

    return new BlueBird((resolve, reject) => {
        geo.distance(params, (error, response) => {
            /**
             * Ниже выводится пример результата вызова функции расчёта
             * расстояния между двумя географическими точками, переданными
             * в виде свойств origins и destinations объекта, являющегося
             * первым аргументом функции
             *
             * @example Результат вызова функции geo.distance()
             *
             * {
             *     destination_addresses: [
             *         'ул. Ташаяк, 2, Казань, Респ. Татарстан, Россия, 420111'
             *     ],
             *     origin_addresses: [
             *         'Привокзальная пл., 1 а, Казань, Респ. Татарстан, ' +
             *         'Россия, 420202'
             *     ],
             *     rows: [{
             *         elements: [{
             *             distance: {
             *                 text: '1,0 км',
             *                 value: 1023
             *             },
             *             duration: {
             *                 text: '13 мин.',
             *                 value: 750
             *             },
             *             status: 'OK'
             *         }]
             *     }],
             *     status: 'OK'
             * }
             */
            return resolve({
                name: yourPoint.name,
                username: yourPoint.username,
                distance: response.rows[0].elements[0].distance.value,

            })
        })
    })
}
