const pingServiceManager = require('../../ping');
const bot = require('../../bot');

module.exports = async msg => {
  const pingService = pingServiceManager.get(msg.chat.id);

  if (!pingService) {
    return await bot.sendMessage(msg.chat.id, 'Cannot connect to PingService. Type `/start` to create service');
  }

  return await bot.sendMessage(
    msg.chat.id,
    pingService.isPinging ? 'PingService is running' : 'PingService is stopped. Type `/start` to start service',
  );
};
