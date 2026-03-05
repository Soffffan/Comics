const { v4: uuidv4 } = require('uuid');

class Comic {
  constructor(title, issue, price, publisher) {
    this.id = uuidv4();
    this.title = title;
    this.issue = issue;
    this.price = price;
    this.publisher = publisher;
    this.createdAt = new Date().toISOString();
  }

  // Метод для валидации данных
  static validate(comicData) {
    const errors = [];

    // Название не может быть пустым
    if (!comicData.title || comicData.title.trim() === '') {
      errors.push('Название комикса не может быть пустым');
    }

    // Цена должна быть неотрицательным числом
    if (comicData.price === undefined || comicData.price === null) {
      errors.push('Цена обязательна для заполнения');
    } else if (isNaN(comicData.price) || comicData.price < 0) {
      errors.push('Цена должна быть неотрицательным числом');
    }

    // Номер выпуска должен быть положительным числом
    if (comicData.issue === undefined || comicData.issue === null) {
      errors.push('Номер выпуска обязателен');
    } else if (isNaN(comicData.issue) || comicData.issue < 1) {
      errors.push('Номер выпуска должен быть положительным числом');
    }

    // Издательство не может быть пустым
    if (!comicData.publisher || comicData.publisher.trim() === '') {
      errors.push('Издательство не может быть пустым');
    }

    return errors;
  }

  // Создание объекта из данных запроса
  static fromRequest(body) {
    return new Comic(
      body.title,
      parseInt(body.issue),
      parseFloat(body.price),
      body.publisher
    );
  }
}

module.exports = Comic;