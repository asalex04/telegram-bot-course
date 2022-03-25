const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token = '5256704103:AAEuFsX8LE2XZhCgvlOQoa4PEEo4vgTtYRY'

const bot = new TelegramApi(token, {polling: true})
const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Я загадал цифру от 0 до 9')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Отгадай', gameOptions)
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'start greeting'},
        {command: '/info', description: 'Get info about user'},
        {command: '/game', description: 'Game guess the number'},
    ])

    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/422/93d/42293d5f-7cd5-49f6-a8fd-939f71b06a83/8.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм-бот asalex`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.username}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, "I don\'t understand you, repeat please")
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again') {
            return startGame(chatId)
        }

        if (data == chats[chatId]) {
            chats[chatId] = null
            return bot.sendMessage(chatId, 'Верно!', againOptions)
        } else {
            return bot.sendMessage(chatId, `Не правильно, bot загадал ${chats[chatId]}`, againOptions)

        }
    })
}
start()
