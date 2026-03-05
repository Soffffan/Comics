# Инструкция по запуску проекта "Comics API"

## О проекте
Comics API — это REST API для управления коллекцией комиксов. Проект демонстрирует построение middleware-конвейера с логированием, измерением времени выполнения и единым форматом ошибок.

## Требования к системе
- **Node.js** версии 14 или выше
- **npm** (менеджер пакетов, устанавливается вместе с Node.js)
- **Postman** или **curl** (для тестирования запросов)

## Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/Soffffan/Comics
cd comics-api
```

### 2. Установка зависимостей
```bash
npm install
```
Эта команда установит все необходимые пакеты:
- express — веб-фреймворк
- uuid — для генерации уникальных идентификаторов
- nodemon — для автоматического перезапуска при разработке

### 3. Запуск сервера

**Режим разработки** (с автоматической перезагрузкой при изменении файлов):
```bash
npm run dev
```

**Обычный режим**:
```bash
npm start
```

После запуска вы увидите:
```
🚀 Сервер запущен на порту 3000
📝 API доступно по адресу: http://localhost:3000/api
📚 Список комиксов: http://localhost:3000/api/items
```

Сервер будет доступен по адресу: `http://localhost:3000`

## Тестирование API

### Примеры запросов через curl

**1. Получить все комиксы**
```bash
curl http://localhost:3000/api/items
```

**2. Получить один комикс по ID**
```bash
# Сначала получите ID любого комикса из списка, затем подставьте его
curl http://localhost:3000/api/items/сюда-вставить-id
```

**3. Создать новый комикс**
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Человек-паук",
    "issue": 5,
    "price": 15.99,
    "publisher": "Marvel"
  }'
```

**4. Проверить обработку ошибки (несуществующий ID)**
```bash
curl http://localhost:3000/api/items/12345-несуществующий-id
```

**5. Проверить валидацию (отправить неверные данные)**
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "issue": -5,
    "price": -10,
    "publisher": ""
  }'
```

### Примеры запросов через Postman

1. **GET запрос**
   - Метод: `GET`
   - URL: `http://localhost:3000/api/items`

2. **GET запрос с ID**
   - Метод: `GET`
   - URL: `http://localhost:3000/api/items/123` (вместо 123 вставьте реальный ID)

3. **POST запрос**
   - Метод: `POST`
   - URL: `http://localhost:3000/api/items`
   - Заголовки: `Content-Type: application/json`
   - Тело (raw JSON):
```json
{
    "title": "Новый комикс",
    "issue": 1,
    "price": 9.99,
    "publisher": "DC Comics"
}
```

## Структура ответов

### Успешный ответ
```json
{
    "success": true,
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "Watchmen",
        "issue": 1,
        "price": 29.99,
        "publisher": "DC Comics",
        "createdAt": "2024-01-01T12:00:00.000Z"
    }
}
```

### Ответ с ошибкой
```json
{
    "error": {
        "code": "NotFoundError",
        "message": "Комикс с ID 12345 не найден",
        "requestId": "550e8400-e29b-41d4-a716-446655440000"
    }
}
```

## Возможные проблемы и их решение

### Ошибка "Address already in use"
Порт 3000 уже занят другой программой. Решение:
```bash
# Запустить на другом порту
PORT=3001 npm start
```

### Модули не устанавливаются
```bash
# Очистить кэш npm и установить заново
npm cache clean --force
rm -rf node_modules
npm install
```

### Сервер не запускается
Проверьте версию Node.js:
```bash
node --version
# Должно быть 14.x или выше
```

## Команды для быстрой проверки работоспособности

Скопируйте весь блок и вставьте в терминал (по очереди):

```bash
# 1. Запустить сервер (в отдельном терминале)
npm start

# 2. Проверить что сервер отвечает
curl http://localhost:3000/api/items

# 3. Создать новый комикс
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"title":"Тест","issue":1,"price":100,"publisher":"Тестовое"}'

# 4. Проверить что комикс добавился
curl http://localhost:3000/api/items
```

## Остановка сервера
Нажмите `Ctrl + C` в терминале, где запущен сервер.

## Используемые технологии
- Node.js
- Express
- UUID
