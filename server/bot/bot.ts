import { Bot } from 'grammy'
import * as handlers from './handlers.ts'

const bot = new Bot(process.env.BOT_TOKEN!)

// Команда /start
bot.command('start', handlers.handleStart)

// Обработка остальных сообщений
bot.on('message', handlers.handleMessage)

// Функция для запуска бота в режиме polling
export const startBot = () => {
  bot.start()
}

export { bot }