const bot = require('../bot');
const pingServiceManager = require('../ping');
const {Chat} = require('../db/models');

async function checkChatInDb(telegramChatId) {
  const result = await Chat.find({telegramChatId}).limit(1).exec();
  return Array.isArray(result) && result.length !== 0;
}

async function saveChatToDb(telegramChatId) {
  const chat = new Chat({telegramChatId});
  await chat.save();
  console.log('New chat created and saved to db');
}

module.exports = async msg => {
  if (msg.from.username === process.env.TELEGRAM_BOT_ROOT_USER) {
    const isChatInDb = await checkChatInDb(msg.chat.id);

    if (!isChatInDb) {
      await saveChatToDb(msg.chat.id);
    }

    let pingService = pingServiceManager.get(msg.chat.id);

    if (pingService) {
      pingService.start();
      return await bot.sendMessage(msg.chat.id, 'Ping service is running');
    } else {
      pingServiceManager.create(msg.chat.id).start();
      return await bot.sendMessage(msg.chat.id, 'Ping service is created and running');
    }
  }

  return await bot.sendMessage(msg.chat.id, 'Forbidden');
};
