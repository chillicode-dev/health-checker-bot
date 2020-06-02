const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {saveChatToDb, getChatFromDb, getUrlsFromChat} = require('../../utils/chat-document');
const {startHandler, stopHandler, pingStartHandler, pingSuccessHandler, pingFailHandler} = require('../ping');
const messages = require('../../messages');

module.exports = async msg => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, messages.commands.forbidden('/start'));
  }

  const chat = await getChatFromDb(msg.chat.id);

  if (!chat) {
    await saveChatToDb(msg.chat.id);
  }

  let pingService = pingServiceManager.get(msg.chat.id);

  if (!pingService) {
    pingService = pingServiceManager.create(msg.chat.id);
    pingService.on('start', startHandler(msg));
    pingService.on('stop', stopHandler(msg));
    pingService.on('ping-start', pingStartHandler(msg));
    pingService.on('ping-success', pingSuccessHandler(msg));
    pingService.on('ping-fail', pingFailHandler(msg));
  }

  pingService.update('urls', getUrlsFromChat(chat));

  return await bot.sendMessage(msg.chat.id, 'Ping service is running');
};
