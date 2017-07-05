'use strict'

export const start = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['Карта сторонников'],
            ['Штаб', 'О боте'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }),
}

export const yesOrNo = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['Да', 'Не сегодня'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }),
}

export const about = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['Наши планы', 'Как помочь'],
            ['В главное меню'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }),
}

export const plans = {
    parse_mode: 'markdown',
    reply_markup: JSON.stringify({
        keyboard: [
            ['Как помочь', 'В главное меню'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }),
}

export const help = {
    parse_mode: 'markdown',
    disable_web_page_preview: true,
    reply_markup: JSON.stringify({
        keyboard: [
            ['Наши планы', 'В главное меню'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }),
}

export const exit = {
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
