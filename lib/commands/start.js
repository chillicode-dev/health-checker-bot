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
    }

    pingService = pingServiceManager.create(msg.chat.id);
    pingService.on('start', () => console.log('[PingService] started'));
    pingService.on('stop', () => console.log('[PingService] stopped'));
    pingService.on('ping-start', () => console.log('[PingService] is pinging..'));
    pingService.on('ping-success', () => console.log('[PingService] successful ping'));
    pingService.on('ping-fail', failedUrls => console.log('[PingService] failed ping'));
    pingService.start();

    return await bot.sendMessage(msg.chat.id, 'Ping service is created and running');
  }

  return await bot.sendMessage(msg.chat.id, 'Forbidden');
};
