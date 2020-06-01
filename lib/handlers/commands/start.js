const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {saveChatToDb, getChatFromDb, getUrlsFromChat} = require('../../utils/chat-document');
const {
  startHandler,
  stopHandler,
  pingStartHandler,
  pingSuccessHandler,
  pingFailHandler,
} = require('../ping');

module.exports = async msg => {
  if (msg.from.username === process.env.TELEGRAM_BOT_ROOT_USER) {
    const chat = await getChatFromDb(msg.chat.id);

    if (!chat) {
      await saveChatToDb(msg.chat.id);
    }

    let pingService = pingServiceManager.get(msg.chat.id);

    if (!pingService) {
      pingService = pingServiceManager.create(msg.chat.id);
      pingService.on('start', startHandler);
      pingService.on('stop', stopHandler);
      pingService.on('ping-start', pingStartHandler);
      pingService.on('ping-success', pingSuccessHandler);
      pingService.on('ping-fail', pingFailHandler);
    }

    pingService.set('urls', getUrlsFromChat(chat));
    pingService.start();

    return await bot.sendMessage(msg.chat.id, 'Ping service is running');
  }

  return await bot.sendMessage(msg.chat.id, 'Forbidden');
};
