import { Hono } from 'hono'
import { cors } from 'hono/cors'
import apiRoutes from './api/routes.ts'
import { startBot } from './bot/bot.ts'

const app = new Hono()

app.use('*', cors())

// Подключаем API роуты
app.route('/api', apiRoutes)

// Запускаем бота в режиме polling для разработки
if (process.env.NODE_ENV !== 'production') {
  startBot()
  console.log('Бот запущен в режиме polling')
}

export default {
  port: 3001,
  fetch: app.fetch
}