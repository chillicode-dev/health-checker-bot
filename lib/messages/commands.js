module.exports = {
  forbidden: command => `
    🤖 У тебя нет прав на использование команды \`${command}\`. Обратись к моему администратору за помощью (@${process.env.TELEGRAM_BOT_ROOT_USER})
  `,
};
