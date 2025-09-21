import React from 'react'
import ReactDOM from 'react-dom/client'
import { SWRConfig } from 'swr'
import App from './App.tsx'
import './index.css'

// Инициализация Telegram WebApp
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready()
  window.Telegram.WebApp.expand()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SWRConfig value={{
      // Отключаем ВСЕ автообновления - у нас один источник истины (пользователь)
      // Данные обновляются только через наши mutate() вызовы
      revalidateOnFocus: false,        // не обновлять при возврате фокуса
      revalidateOnReconnect: false,    // не обновлять при восстановлении сети
      refreshWhenOffline: false,       // не обновлять когда offline
      refreshWhenHidden: false,        // не обновлять когда вкладка скрыта
      revalidateIfStale: false,        // не обновлять старые данные при переходах
      // revalidateOnMount: true,      // ОСТАВЛЯЕМ первоначальную загрузку!
    }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
