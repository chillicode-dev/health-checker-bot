const bot = require('../../bot');

module.exports = msg => async urls => {
  console.log('[health-checker-bot] Ping service failed ping. Reason: ', urls);
  return await bot.sendMessage(msg.chat.id, `Ping failed! Info: ${JSON.stringify(urls)}`);
};
