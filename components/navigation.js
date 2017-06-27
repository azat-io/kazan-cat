'use strict'

export const start = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['О штабе'],
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
