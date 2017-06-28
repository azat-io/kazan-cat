'use strict'

import NodeGeocoder from 'node-geocoder'
import { location } from '../etc/config.json'

/**
 * Определяет относится ли адрес, передаваемый в качестве аргумента функции
 * к городу Казань
 *
 * @param   { string } address - Адрес с указанием города, улицы и номера дома
 *
 * @returns { Promise }        - В состоянии fulfilled промис возвращает true,
 *                               если переданный в качестве аргумента адрес
 *                               действительно существует и относится к Казани,
 *                               либо возвращает false, если нет. В состоянии
 *                               rejected промис возвращает строку "Адрес не
 *                               найден"
 */
export default function isKazan (address) {
    const geocoder = NodeGeocoder({
        provider: 'google',
        language: 'ru',
    })

    return geocoder.geocode(address)
        .then(response => {
            const city = response[0].city

            if (city === location.city) {
                return true
            } else {
                return false
            }
        }).catch(() => {
            return 'Адрес не найден'
        })
}
