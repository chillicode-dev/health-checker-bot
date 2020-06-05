const bot = require('../../bot');
const messages = require('../../messages');

module.exports = msg => async urls => {
  console.log('[health-checker-bot] Ping service failed ping. Reason: ', urls);
  return await bot.sendMessage(msg.chat.id, messages.failedReport(urls));
};
