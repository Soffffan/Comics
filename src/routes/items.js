const express = require('express');
const router = express.Router();
const Comic = require('../models/Comic');

// Хранилище комиксов в памяти
let comics = [
  new Comic('Watchmen', 1, 29.99, 'DC Comics'),
  new Comic('The Walking Dead', 1, 19.99, 'Image Comics'),
  new Comic('Saga', 1, 14.99, 'Image Comics'),
  new Comic('Batman: The Killing Joke', 1, 24.99, 'DC Comics')
];

// GET /api/items - возвращает список всех комиксов
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: comics.length,
    data: comics
  });
});

// GET /api/items/:id - возвращает один комикс по ID
router.get('/:id', (req, res, next) => {
  const comic = comics.find(c => c.id === req.params.id);
  
  if (!comic) {
    const error = new Error(`Комикс с ID ${req.params.id} не найден`);
    error.statusCode = 404;
    error.code = 'NotFoundError';
    return next(error);
  }
  
  res.json({
    success: true,
    data: comic
  });
});

// POST /api/items - создаёт новый комикс
router.post('/', (req, res, next) => {
  // Валидация входных данных
  const errors = Comic.validate(req.body);
  
  if (errors.length > 0) {
    const error = new Error(errors.join('; '));
    error.statusCode = 400;
    error.code = 'ValidationError';
    return next(error);
  }
  
  // Создаём новый комикс
  const newComic = Comic.fromRequest(req.body);
  comics.push(newComic);
  
  res.status(201).json({
    success: true,
    message: 'Комикс успешно создан',
    data: newComic
  });
});

// DELETE /api/items/:id - удаляет комикс
router.delete('/:id', (req, res, next) => {
  const index = comics.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    const error = new Error(`Комикс с ID ${req.params.id} не найден`);
    error.statusCode = 404;
    error.code = 'NotFoundError';
    return next(error);
  }
  
  const deletedComic = comics[index];
  comics.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Комикс успешно удален',
    data: deletedComic
  });
});

module.exports = router;