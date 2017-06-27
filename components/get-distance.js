'use strict'

import GoogleMapsAPI from 'googlemaps'
import BlueBird from 'bluebird'

/**
 * Определяет дистанцию между двумя географическими точкам, передаваемыми в
 * качестве аргумента функции
 *
 * @param   { string }  myPoint   - Адрес с указанием города, улицы, и дома
 *
 * @param   { string }  yourPoint - Второй адрес
 *
 * @returns { Promise }           - Переходя в состояние fulfilled, промис в
 *                                  качестве результата получает число, которое
 *                                  обозначает количество метров между двумя
 *                                  географическими точками при необходимое для
 *                                  преодаления при пешей ходьбе
 *
 * @example
 *
 * getDistance('Казань', 'Москва').then(response => {
 *     console.log(response) // => 790209
 * })
 */
export default function getDistance (myPoint, yourPoint) {
    const geo = new GoogleMapsAPI({
        key: 'AIzaSyCdDP43_gipNwmWuprW_3vBq31KWEiss6Q',
        stagger_time: 1000,
        encode_polylines: false,
        secure: true,
    })

    const params = {
        origins: myPoint,
        destinations: yourPoint,
        language: 'ru',
        mode: 'walking',
    }

    return new BlueBird((resolve, reject) => {
        geo.distance(params, (error, response) => {
            if (error) {
                return reject(error)
            }

            return resolve(response.rows[0].elements[0].distance.value)
        })
    })
}
