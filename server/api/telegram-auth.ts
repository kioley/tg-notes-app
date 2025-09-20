import { Context } from 'hono'
import { validate, parse } from '@telegram-apps/init-data-node'

// Получение userId в режиме разработки (заглушка)
function getTelegramUserIdDev(c: Context): number {
  console.log('🔧 Development mode: using test user ID')
  return 123456789 // Тестовый Telegram ID
}

// Получение userId в продакшене (полная валидация)
function getTelegramUserIdProd(c: Context): number {
  const initData = c.req.header('X-Telegram-Init-Data')
  
  if (!initData) {
    throw new Error('Telegram authentication required')
  }
  
  const botToken = process.env.BOT_TOKEN
  if (!botToken) {
    throw new Error('Bot token not configured')
  }
  
  try {
    // Валидация подписи
    validate(initData, botToken, {
      expiresIn: 24 * 60 * 60 // 24 часа
    })
    
    // Парсинг данных
    const data = parse(initData)
    
    if (!data.user) {
      throw new Error('User data not found')
    }
    
    return data.user.id
  } catch (error) {
    console.error('Telegram auth failed:', error)
    throw new Error('Invalid Telegram authentication')
  }
}

// Основная функция - выбирает режим автоматически
export function getTelegramUserId(c: Context): number {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  return isDevelopment 
    ? getTelegramUserIdDev(c)
    : getTelegramUserIdProd(c)
}

// Middleware для Hono
export async function telegramAuthMiddleware(c: Context, next: Function) {
  try {
    const userId = getTelegramUserId(c)
    c.set('userId', userId)
    
    await next()
  } catch (error) {
    console.error('Auth error:', error)
    return c.json({ 
      error: 'Authentication failed'
    }, 401)
  }
}