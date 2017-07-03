'use strict'

import TelegramBot from 'node-telegram-bot-api'

import { errorToken } from '../etc/token.js'

/**
 * Телеграм бот @KazanCatErrorBot отправляет сообщения об ошибках и сбоях в
 * работе основного бота
 *
 * @param { string } message - Сообщение об ошибке
 *
 */
export default function errorMessage (message) {
    const bot = new TelegramBot(errorToken, {
        polling: false,
    })

    /*
     * Список id получателей сообщения об ошибке
     */
    const recepients = [
        109470339, // @azat_io
    ]

    recepients.forEach(user => {
        bot.sendMessage(user, message)
    })
}
