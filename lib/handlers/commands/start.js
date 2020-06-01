const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {saveChatToDb, getChatFromDb, getUrlsFromChat} = require('../../utils/chat-document');

module.exports = async msg => {
  if (msg.from.username === process.env.TELEGRAM_BOT_ROOT_USER) {
    const chat = await getChatFromDb(msg.chat.id);

    if (!chat) {
      await saveChatToDb(msg.chat.id);
    }

    let pingService = pingServiceManager.get(msg.chat.id);

    if (!pingService) {
      pingService = pingServiceManager.create(msg.chat.id);
      pingService.on('start', () => console.log('[PingService] started'));
      pingService.on('stop', () => console.log('[PingService] stopped'));
      pingService.on('ping-start', () => console.log('[PingService] is pinging..'));
      pingService.on('ping-success', () => console.log('[PingService] successful ping'));
      pingService.on('ping-fail', err => console.log('[PingService] failed ping: ', err));
    }

    pingService.set('urls', getUrlsFromChat(chat));
    pingService.start();

    return await bot.sendMessage(msg.chat.id, 'Ping service is running');
  }

  return await bot.sendMessage(msg.chat.id, 'Forbidden');
};
