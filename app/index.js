import TelegramBot from 'node-telegram-bot-api'
import { token } from '../etc/config.json'

const bot = new TelegramBot(token, {
    polling: true,
})

bot.on('message', msg => {
    const chatId = msg.chat.id
    console.log(msg)

    bot.sendMessage(chatId, 'Мяу!')
})
