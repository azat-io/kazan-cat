'use strict'

import fs from 'fs'

/**
 * Проверяет, зарегистрирован ли пользователь в "Карте сторонников"
 *
 * @param   { number } userId - ID пользователя в Телеграме
 *
 * @returns { boolean }       - Если пользователь зарегистрирован, возвращается
 *                              true, если нет - false
 */
export default function isRegistered (userId) {
    /*
     * Считываем базу каждый раз, при обращении к функции, по причине того, что
     * импортированные модули кэшируются
     */
    let myData = fs.readFileSync(`${ process.cwd() }/data/map.json`, {
        encoding: 'utf8',
    })

    myData = JSON.parse(myData)

    for (let i = 0, max = myData.length; i < max; i++) {
        if (myData[i].id === userId) {
            return true
        }
    }

    return false
}
