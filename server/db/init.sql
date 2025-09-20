-- SQLite база данных для Telegram Storage
-- Минималистичная схема с простыми индексами

-- ===== НАСТРОЙКИ ПРОИЗВОДИТЕЛЬНОСТИ =====
PRAGMA journal_mode = WAL;        -- Write-Ahead Logging для лучшей производительности
PRAGMA synchronous = NORMAL;      -- Компромисс между скоростью и безопасностью
PRAGMA cache_size = 1000;         -- Размер кэша страниц
PRAGMA foreign_keys = ON;         -- Включаем проверку внешних ключей

-- ===== ТАБЛИЦА ПАПОК =====
CREATE TABLE IF NOT EXISTS folders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL  -- для soft delete
);

-- ===== ТАБЛИЦА АЙТЕМОВ =====  
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  folder_id INTEGER NOT NULL,
  type TEXT NOT NULL DEFAULT 'note',
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,  -- для soft delete
  
  FOREIGN KEY (folder_id) REFERENCES folders(id)
);

-- ===== МИНИМАЛЬНЫЕ ИНДЕКСЫ =====
-- Для получения папок пользователя
CREATE INDEX IF NOT EXISTS idx_folders_user ON folders(user_id);

-- Для получения айтемов папки  
CREATE INDEX IF NOT EXISTS idx_items_folder ON items(folder_id);

-- ===== ТЕСТОВЫЕ ДАННЫЕ =====
-- Пользователь 123456789 (для разработки)
INSERT OR IGNORE INTO folders (id, user_id, name) VALUES 
  (1, 123456789, 'Личное'),
  (2, 123456789, 'Работа'), 
  (3, 123456789, 'Идеи');

INSERT OR IGNORE INTO items (id, user_id, folder_id, type, title, content) VALUES
  (1, 123456789, 1, 'note', 'Список покупок', 'Молоко\nХлеб\nЯйца\nМасло'),
  (2, 123456789, 1, 'note', 'День рождения мамы', 'Купить подарок\nЗаказать торт\nПозвонить родственникам'),
  (3, 123456789, 3, 'note', 'Идея для приложения', '{"text": "Приложение для заметок в Telegram", "tags": ["разработка", "идея"], "priority": "высокий"}');