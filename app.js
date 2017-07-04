'use strict'

import Tgfancy from 'tgfancy'
import { token } from './etc/token.js'

import { location } from './etc/config.json'

import fs from 'fs'

import * as menu from './components/navigation'
import getPointByLocation from './components/get-point-by-location'

const bot = new Tgfancy(token, {
    polling: true,
})

bot.onText(/^(\/start)$/, msg => {
    const start = fs.readFileSync(`${ __dirname }/content/start.md`)

    bot.sendMessage(msg.chat.id, start, menu.start)
})

bot.onText(/^(В главное меню)$/, msg => {
    const toMainMessage = [
        'Вуаля, главное меню',
        'Пожалуйста',
        'Выбирай что хочешь',
    ]

    const random = Math.floor(Math.random() * toMainMessage.length)

    bot.sendMessage(msg.chat.id, toMainMessage[random], menu.start)
})

bot.onText(/^(О штабе)$/, msg => {
    const info = fs.readFileSync(`${ __dirname }/content/info.md`)

    bot.sendMessage(msg.chat.id, info, menu.exit)

    getPointByLocation(location).then(response => {
        bot.sendLocation(msg.chat.id, response[0], response[1])
    })
})
