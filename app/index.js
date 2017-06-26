'use strict'

import TelegramBot from 'node-telegram-bot-api'
import token from '../etc/token.js'
import { location } from '../etc/config.json'

import fs from 'fs'
import path from 'path'
import getPointByLocation from './get-point-by-location'

const bot = new TelegramBot(token, {
    polling: true,
})

bot.onText(/^(\/start|В главное меню)$/, msg => {
    const chatId = msg.chat.id
    const mainMenu = {
        reply_markup: JSON.stringify({
            keyboard: [
                ['О штабе'],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    }

    bot.sendMessage(chatId, 'Мяу', mainMenu)
})

bot.onText(/^(О штабе)$/, msg => {
    const chatId = msg.chat.id
    const statusMenu = {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            keyboard: [
                ['В главное меню'],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    }

    const info = fs.readFileSync(path.join(__dirname, './content/info.md'))

    bot.sendMessage(chatId, info, statusMenu)

    getPointByLocation(location).then(response => {
        bot.sendLocation(chatId, response[0], response[1])
    })
})
