const { getLogById } = require('./logger');

// Middleware для обработки ошибок
const errorHandler = (err, req, res, next) => {
  console.log(`[${req.requestId}] Ошибка: ${err.message}`);

  // Определяем статус код (по умолчанию 500)
  const statusCode = err.statusCode || 500;
  
  // Формируем единый формат ошибки
  const errorResponse = {
    error: {
      code: err.code || 'InternalServerError',
      message: err.message || 'Внутренняя ошибка сервера',
      requestId: req.requestId
    }
  };

  res.status(statusCode).json(errorResponse);
};

// Middleware для обработки 404
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Маршрут ${req.method} ${req.url} не найден`);
  error.statusCode = 404;
  error.code = 'NotFoundError';
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler
};