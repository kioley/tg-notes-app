import { Context, InlineKeyboard } from 'grammy'

export const handleStart = async (ctx: Context): Promise<void> => {
  const keyboard = new InlineKeyboard()
    .webApp('📝 Открыть заметки')
  
  await ctx.reply(
    'Добро пожаловать в приложение заметок! 📝\n\nНажмите кнопку ниже, чтобы открыть приложение.',
    { reply_markup: keyboard }
  )
}

export const handleMessage = async (ctx: Context): Promise<void> => {
  await ctx.reply(
    'Используйте кнопку "Открыть заметки" для работы с приложением.'
  )
}