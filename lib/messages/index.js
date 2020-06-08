module.exports = {
  forbidden: command => `
    У вас нет прав на использование команды '${command}'. Обратитесь к моему администратору за помощью (@${process.env.TELEGRAM_BOT_ROOT_USER})
  `,
  chatNotFoundInDb: () => `
    ⚠ Чат не найден, используйте команду '/start', чтобы начать использовать бот
  `,
  statusStarted: () => `
    🚀 Сервис пинга запущен
  `,
  statusStopped: () => `
    ⛔ Сервис пинга остановлен. Используйте команду '/start' чтобы запустить его
  `,
  addProjectWrongUrls: () => `
    ⚠ Ошибка добавления проекта: указан неверный адрес.\nДля добавления используйте полный URL, например: http://example.com
  `,
  addProjectSuccess: projectName => `
    ✅ Проект [${projectName}] добавлен в список проектов для проверки. Используйте команду '/ping ${projectName}' чтобы проверить его работу прямо сейчас
  `,
  deleteProjectWrongArgs: () => `
    ⚠ Укажите проект для удаления. Наример: '/delete project-name'
  `,
  deleteProjectSuccess: projectName => `
    🗑️ Проект [${projectName}] удален из списка проектов
  `,
  deleteProjectFail: () => `
    ⚠ Ошибка удаления проекта. Проверьте название проекта
  `,
  listOfProjects: projects => {
    let msg = 'Список проектов для проверки в этом чате:\n\n';

    for (const project of projects) {
      msg += `🌐 [${project.name}]\n`;

      for (const url of project.urls) {
        msg += ` - ${url}\n`;
      }

      msg += `\n`;
    }

    return msg;
  },
  listOfProjectsNull: () => `
    ⚠ Не найдено ни одного проекта. Используйте команду '/add projectName http://example1.com,http://example2.com' для добавления проекта
  `,
  startSuccess: () => `
    🚀 Сервис пинга запущен
  `,
  stopSuccess: () => `
    ⛔ Сервис пинга остановлен
  `,
  pingConnectFail: () => `
    ⚠ Не могу подключиться к сервису пинга. Выполните команду '/status' для проверки его работы.
  `,
  pingNoUrl: () => `
    ⚠ Не найдены URL-адреса для данного проекта.
  `,
  pingStart: all => `
    🚀 Пингую проект${all ? 'ы' : ''}... Ответ придет в течение пары секунд
  `,
  pingSuccess: urls => `
    ✅ Работает стабильно. Проверенные адреса:\n - ${urls.join('\n - ')}
  `,
  pingFail: () => `
    ⚠ Ошибка пинга: один из проектов не отвечает на запросы!
  `,
  failedReport: failedResponses => {
    let msg = `🔥 @${process.env.TELEGRAM_BOT_ROOT_USER}, мы все уронили! 🔥\n\n Следующие адреса не отвечают на запросы:\n\n`;

    for (const res of failedResponses) {
      msg += `⚠\n`;
      msg += `[URL] ${res.url}\n`;
      msg += `[STATUS] ${res.status}\n`;
      msg += `[MESSAGE] ${res.message}\n\n`;
    }

    return msg;
  },
};
