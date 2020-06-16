# Сервисы

## PingService

Наследник класса [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Пингует с определенной периодичностью переданный список URL.
Если один из запросов вернулся c ошибкой, это означает, что пинг не удался.

### Список событий:

- `start` - срабатывает на запуске сервиса `.start()`
- `stop` - срабатывает на остановке сервиса `.stop()`
- `ping-start` - срабатывает при старте пинга каждые `tickInterval`
- `ping-success` - срабатывает при успешном пинге адресов
- `ping-fail` - срабатывает, если какой-либо из адресов вернул статус ответа вне диапазона `successStatus`, и передает в коллбэк список неудачных запросов в виде массива строк

### Пример использования:

```javascript
const pingService = new PingService({
  urls: [], // список URL для пинга
  tickInterval: 10 * 1000, // пинг адресов каждые 10 секунд
  successStatus: [200, 299], // диапазон статусов ответа при которых пинг считается успешным
});

pingService.start();
pingService.on('start', () => {});
pingService.on('stop', () => {});
pingService.on('ping-start', () => {});
pingService.on('ping-success', () => {});
pingService.on('ping-fail', failedUrls => {});
pingService.stop();
```

## PingServiceManager

Управляет массивом сервисом для каждого отдельно взятого чата. 
Хранит, выполняет создание, поиск и удаление экземпляров класса `PingService` по `chatId`.

Пример использования:

```javascript
const pingServiceManager = new PingServiceManager();
const chatId = 12345678;

// Добавление инстанса
pingServiceManager.create(chatId);

// Получение инстанса по ID чата
const pingService = pingServiceManager.get(chatId);

// Удаление инстанса по ID чата
pingServiceManager.delete(chatId);
```

## TelegramBot
Наследник класса [NodeTelegramBotApi](https://github.com/yagop/node-telegram-bot-api/blob/master/src/telegram.js).

Используется для кастомного форматирования сообщений.