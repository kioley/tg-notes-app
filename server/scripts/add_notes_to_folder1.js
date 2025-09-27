/* Script to add 10 notes to folder 1 via API /api/items on local server */

const endpoint = "http://localhost:3001/api/items";

async function post(note) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  console.log(`[${res.status}]`, data);
}

const payloads = [
  {
    title: "Короткая заметка 1",
    content: "Короткий текст",
    folderId: 1,
    type: "note",
  },
  {
    title: "Короткая заметка 2",
    content: "Ещё один короткий текст",
    folderId: 1,
    type: "note",
  },
  { title: "Короткая заметка 3", content: "", folderId: 1, type: "note" },
  {
    title: "Средняя заметка 4",
    content:
      "Средний текст заметки. Это демонстрирует среднюю длинну контента. Средний текст заметки. Это демонстрирует среднюю длинну контента.",
    folderId: 1,
    type: "note",
  },
  {
    title: "Средняя заметка 5",
    content: "Контент с несколькими словами и пробелами для теста.",
    folderId: 1,
    type: "note",
  },
  {
    title: "Средняя заметка 6",
    content: "Несколько абзацев\\nВторая строка.\\nТретья строка.",
    folderId: 1,
    type: "note",
  },
  {
    title: "Длинная заметка 7",
    content:
      "Это очень длинный текст заметки, который содержит множество предложений, запятые, переносы строк и прочие элементы форматирования. Цель — проверить устойчивость к длинным входным данным.",
    folderId: 1,
    type: "note",
  },
  {
    title: "Длинная заметка 8",
    content:
      "Подробнее о тестировании. Добавляю еще контент для длинной заметки и тестирую сохранение.",
    folderId: 1,
    type: "note",
  },
  {
    title: "Длинная заметка 9",
    content:
      "Еще один длинный текст заметки с этапами и списком: - пункт 1 - пункт 2",
    folderId: 1,
    type: "note",
  },
  {
    title: "Длинная заметка 10",
    content:
      "Финальный тестовый текст, содержащий достаточно символов чтобы проверить лимиты поля content в базе данных.",
    folderId: 1,
    type: "note",
  },
];

(async () => {
  for (const p of payloads) {
    await post(p);
  }
})();
