# user-management-app

## Как запустить

```bash
# 1. Установка
npm install

# 2. Включить моки (обязательно!)
npx msw init public/

# 3. Запуск
npm run dev
```

Открыть: `http://localhost:3000`

## Если не работает

```bash
# Перезапуск моков
rm -f public/mockServiceWorker.js
npx msw init public/
npm run dev
```

## Если всё сломалось

```bash
# Полная переустановка
rm -rf node_modules .nuxt .output
rm -f public/mockServiceWorker.js
npm install
npx msw init public/
npm run dev
```

### API эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/users` | Получить всех пользователей |
| GET | `/api/users/:id` | Получить пользователя по ID |
| POST | `/api/users` | Создать нового пользователя |
| PUT | `/api/users/:id` | Обновить пользователя |
| DELETE | `/api/users/:id` | Удалить пользователя |