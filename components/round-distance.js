'use strict'

/**
 * Округляет расстояние в метрах до километров, возвращая полученное значение в
 * виде строки
 *
 * @param   { number } distance - Расстояние в метраx
 * @returns { string }          - Округлённое расстояние в километрах
 */
export default function roundDistance (distance) {
    distance = Number((distance / 1000).toFixed(1))

    if ((distance ^ 0) !== distance) {
        if (distance > 0.2) {
            return `${ distance }0 км.`
        } else {
            return 'Менее 100 метров'
        }
    } else {
        return `${ distance }.00 км.`
    }
}
