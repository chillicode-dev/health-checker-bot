const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const messages = require('../../messages');

module.exports = async msg => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, messages.commands.forbidden('/stop'));
  }

  const pingService = pingServiceManager.get(msg.chat.id);

  if (pingService) {
    pingService.stop();
  }

  return await bot.sendMessage(msg.chat.id, messages.commands.stopSuccess());
};
