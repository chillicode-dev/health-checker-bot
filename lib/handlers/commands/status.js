const pingServiceManager = require('../../ping');
const bot = require('../../bot');
const messages = require('../../messages');

module.exports = async msg => {
  const pingService = pingServiceManager.get(msg.chat.id);

  if (!pingService) {
    return await bot.sendMessage(msg.chat.id, messages.statusStopped());
  }

  return await bot.sendMessage(
    msg.chat.id,
    pingService.isPinging ? messages.statusStarted() : messages.statusStopped(),
  );
};
