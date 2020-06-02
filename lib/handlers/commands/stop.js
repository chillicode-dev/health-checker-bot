const bot = require('../../bot');
const pingServiceManager = require('../../ping');

module.exports = async msg => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, 'Forbidden');
  }

  const pingService = pingServiceManager.get(msg.chat.id);

  if (pingService) {
    pingService.stop();
  }

  return await bot.sendMessage(msg.chat.id, 'Ping service stopped');
};
