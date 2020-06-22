# 🤖 Chillicode Health Checker Bot

Бот Telegram, который пингует URL-адреса ваших проектов с заданным интервалом и оповещает в чат в случае ошибки.

![Работа с ботом](https://raw.githubusercontent.com/chillicode-dev/health-checker-bot/dev/assets/work-with-bot.gif)

## Как это работает

Бот прикрепляется к рабочему чату компании, пингует в фоне добавленные URL-адреса и оповещает пользователей в случае падения какого-либо сервиса.

В данный момент его можно найти [в Telegram](https://t.me/ChillicodeHealthCheckerBot), но из-за ограничения ресурсов
нашего сервера добавлять адреса в него может только его root-пользователь.

Но нет никакой проблемы развернуть бот на своем собственном сервере.

## Установка на сервер

1. Зарегистрировать свой бот у [@BotFather](https://t.me/botfather) [по инструкции](https://core.telegram.org/bots#6-botfather)
2. Сохранить выданный токен в надежном месте
3. Склонировать проект на ваш сервер/локальную машину
4. Выполнить установку [MongoDB](https://www.mongodb.com/) локально или создать кластер в [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
5. Выполнить `npm ci`
6. Скопировать файл `.env.example` в `.env`
7. Заполнить `.env` файл необходимыми переменными окружения (описаны ниже в таблице)
8. Выполнить `npm run start` для запуска бота в production режиме с помощью [pm2](https://pm2.keymetrics.io/)

## ENV-переменные

| Имя                    | Обязательная | Описание                                                                                                                       |
| ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| TELEGRAM_BOT_TOKEN     | Да           | Токен, полученный от BotFather                                                                                                 |
| TELEGRAM_BOT_ROOT_USER | Да           | Имя пользователя Telegram, который является root-пользователем для данного бота                                                |
| HTTP_PROXY_ADDR        | Нет          | Прокси сервер в формате `http://username:password@host:port`, если Telegram по каким-либо причинам заблокирован в вашей стране |
| MONGODB_CONNECTION     | Да           | Строка подключения к базе данных MongoDB в формате `mongodb+srv://username:password@clustername.mongodb.net/dbname`            |
| PM2_PROCESS_NAME       | Да           | Название pm2 процесса (по умолчанию health-checker-bot)                                                                        |

## Доступные команды

| Имя    | Формат                                                  | Описание                                     |
| ------ | ------------------------------------------------------- | -------------------------------------------- |
| start  | `/start`                                                | Запуск сервиса пинга и начало работы с ботом |
| stop   | `/stop`                                                 | Остановить сервис пинга                      |
| status | `/status`                                               | Статус работы сервиса пинга                  |
| add    | `/add project-name https://test1.com,https://test2.com` | Добавить проект в список с URL-адресами      |
| delete | `/delete project-name`                                  | Удалить конкретный проект по названию        |
| list   | `/list`                                                 | Отобразить список проектов в чате            |
| ping   | `/ping all` или `/ping project-name`                    | Пропинговать проекты или конкретный проект   |
| info   | `/info`                                                 | Информация о боте                            |

## Изменение интервала пинга

Интервал пинга настраивается с помощью статичного свойства `PingService.tickInterval` в `lib/services/ping-service.js`.
Также здесь можно указать останавливать ли сервис пинга в случае ошибки и диапазон кодов ответа сервера при котором должна выбрасываться ошибка:

```javascript
class PingService extends EventEmitter {
  /**
   * Default options for constructor
   * @typedef {Object} PingServiceOptions
   * @property {string[]} [urls] URLs list
   * @property {number} [tickInterval] ping interval
   * @property {boolean} [stopOnFail] stop service after failed ping
   * @property {[number, number]} [successStatus] range of response statuses at which ping is considered as successful
   */
  static defaultOptions = {
    urls: [],
    tickInterval: ms('1m'),
    stopOnFail: true,
    successStatus: [200, 299],
  };

  /* ... */
}
```

Подробнее о сервисах можно почитать в [lib/services/README.md](https://github.com/chillicode-dev/health-checker-bot/blob/master/lib/services/README.md)

## Лицензия

[MIT](https://raw.githubusercontent.com/chillicode-dev/health-checker-bot/master/LICENSE)
