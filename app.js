'use strict'

import Tgfancy from 'tgfancy'
import { token } from './etc/token.js'

import fs from 'fs'
import mau from 'mau'

import { location } from './etc/config.json'

import * as menu from './components/navigation'
import getPointByLocation from './components/get-point-by-location'
import isKazan from './components/is-kazan'
import isRegistered from './components/is-registered'
import sortByDistance from './components/sort-by-distance'
import readMD from './components/read-markdown'

const bot = new Tgfancy(token, {
    polling: true,
})

const formset = new mau.FormSet()

let mapStage = 0

bot.onText(/^(\/start)$/, msg => {
    bot.sendMessage(msg.chat.id, readMD('start'), menu.start)
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
    bot.sendMessage(msg.chat.id, readMD('info'), menu.exit)

    getPointByLocation(location).then(response => {
        bot.sendLocation(msg.chat.id, response[0], response[1])
    })
})

formset.on('query', (question, msg) => {
    const opts = {
        parse_mode: 'markdown',
    }
    return bot.sendMessage(msg.chat.id, question.text, opts)
        .catch(error => console.log(error))
})

formset.addForm('map', [{
    name: 'name',
    text: 'Для начала представься, как тебя зовут?',
    post (answer, done) {
        this.setAnswer(answer.charAt(0).toUpperCase() +
            answer.slice(1).toLowerCase())
        return done()
    },
}, {
    name: 'address',
    text: readMD('map-set-address'),
    post (answer, done) {
        isKazan(`Россия, г. Казань, ${ answer }`).then(response => {
            if (response !== 'Адрес не найден') {
                return done()
            }

            return this.retry('Адрес не найден, повтори попытку 😳', done)
        })
    },
}], {
    cb: answersCb,
})

function answersCb (answers, msg) {
    mapStage = 0

    const results = {
        id: msg.from.id,
        username: msg.from.username,
        name: answers.name,
        address: answers.address,
    }

    const map = './data/map.json'

    fs.readFile(map, (error, data) => {
        if (error) {
            console.log(error)
        }

        const json = JSON.parse(data)
        json.push(results)

        fs.writeFile(map, JSON.stringify(json), error => {
            console.log(error)
        })
    })

    return bot.sendMessage(msg.chat.id, readMD('map-success'), menu.start)
        .catch(error => console.error(error))
}

bot.on('message', msg => {
    const id = msg.chat.id

    if (msg.text === 'Карта сторонников') {
        if (msg.from.username === undefined) {
            bot.sendMessage(id, readMD('map-no-username'), menu.start)
        } else {
            if (isRegistered(id)) {
                let data = fs.readFileSync(`${ process.cwd() }/data/map.json`, {
                    encoding: 'utf8',
                })

                data = JSON.parse(data)
                const top = 3

                sortByDistance(id, data, top)
                    .then(response => {
                        bot.sendMessage(id, `Список ближайших ${ top } ` +
                        `волонтёров:\n\n${ response }`, menu.start)
                    })
            } else {
                bot.sendMessage(id, readMD('map-sign-up'), menu.yesOrNo)
                mapStage = 1
            }
        }
    }

    if (msg.text === 'Да' && mapStage === 1) {
        mapStage = 2
    }

    if (msg.text === 'Не сегодня' && mapStage === 1) {
        bot.sendMessage(id, 'Как скажешь', menu.start)
        mapStage = 0
    }

    if (mapStage === 2) {
        return formset.process(id, msg.text, msg, onProcess)
    }

    function onProcess (error) {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log('[*] triggering the map form')
                return formset.processForm('map', id, msg, onSelectFormProcess)
            }
            return console.error(error)
        }
    }

    function onSelectFormProcess (error) {
        if (error) {
            console.log(error)
        }
    }
})
