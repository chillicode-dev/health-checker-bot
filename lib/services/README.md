# Классы

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
