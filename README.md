# Telegram Notes App

Приложение для заметок в Telegram Mini App.

## Структура проекта

- `frontend/` - React приложение (Vite + Tailwind + SWR)
- `server/` - API сервер + Telegram бот (Hono + grammy + TypeScript)

## Запуск локально

### Фронтенд
```bash
cd frontend
npm install
npm run dev
```
Запустится на http://localhost:3000

### Сервер
```bash
cd server
cp .env.example .env
# Добавь BOT_TOKEN в .env
bun install
bun run dev
```
Запустится на http://localhost:3001

## Деплой

### Фронтенд → GitHub Pages
```bash
cd frontend
npm run deploy
```

### Сервер → Railway/Render
Деплой серверной части на облачный хостинг с переменными окружения.

## Разработка

Фронтенд настроен на проксирование API запросов на сервер. Запускайте оба процесса для полной функциональности.