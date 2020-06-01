const bot = require('../../bot');
const pingServiceManager = require('../../ping');

module.exports = async msg => {
  const pingService = pingServiceManager.get(msg.chat.id);

  if (pingService && pingService.isPinging) {
    pingService.stop();
    await bot.sendMessage(msg.chat.id, 'Ping service stopped');
  } else {
    await bot.sendMessage(msg.chat.id, 'Ping service is already stopped');
  }
};
