'use strict'

import Tgfancy from 'tgfancy'

import { errorToken } from '../etc/token.js'

/**
 * Телеграм бот @KazanCatErrorBot отправляет сообщения об ошибках и сбоях в
 * работе основного бота
 *
 * @param { string } message - Сообщение об ошибке
 *
 */
export default function errorMessage (message) {
    const bot = new Tgfancy(errorToken, {
        polling: false,
    })

    /*
     * Список id получателей сообщения об ошибке
     */
    const recepients = [
        '@azat_io',
    ]

    recepients.forEach(user => {
        bot.sendMessage(user, message)
    })
}
