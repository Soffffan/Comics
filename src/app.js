const express = require('express');
const { requestLogger } = require('./middleware/logger');
const requestTimer = require('./middleware/timer');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Конвейер обработки запросов
app.use(requestLogger);
app.use(requestTimer);

// Подключаем маршруты
app.use('/api/items', itemsRouter);

// Тестовый маршрут для проверки работы
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    requestId: req.requestId 
  });
});

// Обработка 404
app.use(notFoundHandler);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API доступно по адресу: http://localhost:${PORT}/api`);
  console.log(`Список комиксов: http://localhost:${PORT}/api/items`);
});