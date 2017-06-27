'use strict'

import NodeGeocoder from 'node-geocoder'

/**
 * Определяет географические координаты по адресу, передаваемому в качестве
 * аргумента функции
 *
 * @param   { (Object|string) } loc - Адрес с указанием города, улицы и номера
 *                                    дома. Если в качестве параметра передать
 *                                    объект, он может иметь следующие свойства:
 *                                    address, city, country, zipcode
 *
 * @returns { Promise }             - Переходя в состояние fulfilled, промис в
 *                                    качестве результата получает массив из
 *                                    двух чисел, обозначающих широту и долготу
 *                                    объекта
 *
 * @example
 *
 * getPointByLocation('Казань, ул. Гвардейская, 31').then(response => {
 *     console.log(response) // => [55.7858861, 49.1714244]
 * })
 */
export default function getPointByLocation (loc) {
    const geocoder = NodeGeocoder({
        provider: 'google',
        language: 'ru',
    })

    const point = geocoder.geocode(loc)

    return point.then(response => {
        return [response[0].latitude, response[0].longitude]
    }).catch(error => error)
}
