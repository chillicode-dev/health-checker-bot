const bot = require('../../bot');

module.exports = msg => async urls => {
  console.log('[PingService] failed ping: ', urls);
  return await bot.sendMessage(msg.chat.id, `Ping failed! Info: ${JSON.stringify(urls)}`);
};
