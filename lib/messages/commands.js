module.exports = {
  forbidden: command => `
    🤖 У вас нет прав на использование команды \`${command}\`. Обратитесь к моему администратору за помощью (@${process.env.TELEGRAM_BOT_ROOT_USER}).
  `,
  statusStarted: () => `
    🤖 🚀 Сервис пинга запущен.
  `,
  statusStopped: () => `
    🤖 ⛔ Сервис пинга остановлен. Используйте команду \`/start\` чтобы запустить его.
  `,
  addProjectSuccess: projectName => `
    🤖 ✅ Проект [\`${projectName}\`] добавлен в список проектов для проверки. Используйте команду \`/check ${projectName}\` чтобы проверить его работу.
  `,
  deleteProjectSuccess: projectName => `
    🤖 🗑️ Проект [\`${projectName}\`] удален из списка проектов.
  `,
  deleteProjectFail: () => `
    🤖 ⚠ Ошибка удаления проекта. Проверьте название или обратитесь к моему администратору за помощью (@${process.env.TELEGRAM_BOT_ROOT_USER}).
  `,
  listOfProjects: projects => {
    let msg = '🤖 Список проектов для проверки в этом чате.\n\n';

    for (const project of projects) {
      msg += `🌐 ${project.name}:\n`;

      for (const url of project.urls) {
        msg += `  - ${url}\n`;
      }

      msg += `\n`;
    }

    return msg;
  },
  listOfProjectsNull: () => `
    🤖 ⚠ Не найдено ни одного проекта. Используйте команду \`/add projectName http://example1.com,http://example2.com\` для добавления проекта.
  `,
  startSuccess: () => `
    🤖 ✅ Сервис пинга запущен.
  `,
  stopSuccess: () => `
    🤖 ⛔ Сервис пинга остановлен.
  `,
};
