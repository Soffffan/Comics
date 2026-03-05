const { v4: uuidv4 } = require('uuid');

// Хранилище логов в памяти
const requestLogs = [];

// Middleware для логирования запросов и ответов
const requestLogger = (req, res, next) => {
  // Генерируем уникальный ID запроса
  const requestId = uuidv4();
  req.requestId = requestId;

  // Запоминаем время начала запроса
  const startTime = Date.now();

  // Логируем входящий запрос
  const logEntry = {
    requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params
  };

  console.log(`[${requestId}] Входящий запрос: ${req.method} ${req.url}`);

  // Перехватываем ответ
  const originalSend = res.json;
  res.json = function(body) {
    // Добавляем информацию об ответе в лог
    logEntry.response = {
      statusCode: res.statusCode,
      body: body
    };
    logEntry.duration = Date.now() - startTime;
    
    // Сохраняем в хранилище
    requestLogs.push(logEntry);
    
    // Ограничим размер хранилища
    if (requestLogs.length > 100) {
      requestLogs.shift();
    }

    console.log(`[${requestId}] Ответ: ${res.statusCode} (${logEntry.duration}ms)`);
    
    // Вызываем оригинальный метод
    originalSend.call(this, body);
  };

  next();
};

// Функция для получения лога по ID
const getLogById = (requestId) => {
  return requestLogs.find(log => log.requestId === requestId);
};

module.exports = { requestLogger, getLogById };