'use strict'

import TelegramBot from 'node-telegram-bot-api'
import token from './etc/token.js'

import { location } from './etc/config.json'

import fs from 'fs'

import * as menu from './components/navigation'
import getPointByLocation from './components/get-point-by-location'

const bot = new TelegramBot(token, {
    polling: true,
})

bot.onText(/^(\/start|В главное меню)$/, msg => {
    bot.sendMessage(msg.chat.id, 'Мяу', menu.start)
})

bot.onText(/^(О штабе)$/, msg => {
    const info = fs.readFileSync(`${ __dirname }/content/info.md`)

    bot.sendMessage(msg.chat.id, info, menu.exit)

    getPointByLocation(location).then(response => {
        bot.sendLocation(msg.chat.id, response[0], response[1])
    })
})
