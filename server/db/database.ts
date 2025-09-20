import { Database } from "bun:sqlite"
import { readFileSync } from "fs"

// Создаем подключение к SQLite базе данных
const db = new Database("storage.db")

// Проверяем, нужна ли инициализация базы данных
function needsInitialization(): boolean {
  try {
    // Проверяем наличие любой из наших таблиц
    const existingTable = db.query(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name IN ('folders', 'items')
      LIMIT 1
    `).get()
    
    // Если хоть одна из наших таблиц есть - не инициализируем
    return !existingTable
  } catch (error) {
    console.warn("⚠️  Could not check database tables:", error)
    return true // В случае ошибки лучше попробовать инициализацию
  }
}

// Инициализируем базу данных
function initDatabase() {
  if (!needsInitialization()) {
    console.log("🗄️  Database already exists, skipping initialization")
    return
  }
  
  console.log("🗄️  Initializing SQLite database...")
  
  try {
    // Читаем и выполняем SQL схему
    const schema = readFileSync("./db/init.sql", "utf8")
    db.exec(schema)
    
    console.log("✅ Database initialized successfully")
  } catch (error) {
    console.error("❌ Failed to initialize database:", error)
    throw error
  }
}

// Инициализируем базу при импорте модуля
initDatabase()

export { db }