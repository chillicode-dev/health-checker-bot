const bot = require('../bot');
const {Chat} = require('../db/models');

module.exports = async msg => {
  if (msg.from.username === process.env.TELEGRAM_BOT_ROOT_USER) {
    const result = await Chat.find({telegramChatId: msg.chat.id}).limit(1).exec();

    if (result.length === 0) {
      const chat = new Chat({telegramChatId: msg.chat.id});
      await chat.save();
      console.log('New chat created and saved to db');

      await bot.sendMessage(msg.chat.id, 'Hello, I am Chillicode Health Checker Bot. This chat attached to check your projects.');
    } else {
      await bot.sendMessage(msg.chat.id, 'Welcome back, dude ;)');
    }
  } else {
    await bot.sendMessage(msg.chat.id, 'Forbidden');
  }
};
