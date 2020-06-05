const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {Chat} = require('../../db/models');
const {startHandler, stopHandler, pingStartHandler, pingSuccessHandler, pingFailHandler} = require('../ping');
const messages = require('../../messages');

module.exports = async msg => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, messages.forbidden('/start'));
  }

  const chat = await Chat.findByChatId(msg.chat.id);

  // Create new chat if it does not exist
  if (!chat) {
    const chat = new Chat({telegramChatId: msg.chat.id});
    await chat.save();
    console.log('[health-checker-bot] New chat created and saved to db');
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

  pingService.update('urls', Chat.getUrls(chat));

  return await bot.sendMessage(msg.chat.id, messages.startSuccess());
};
