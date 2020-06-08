const pingServiceManager = require('../../ping');
const bot = require('../../bot');
const {Chat} = require('../../db/models');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  const [cmd, projectName] = args;
  const pingService = pingServiceManager.get(msg.chat.id);

  if (!pingService) {
    return await bot.sendMessage(msg.chat.id, messages.pingConnectFail());
  }

  const chat = await Chat.findByChatId(msg.chat.id);
  const urls = Chat.getUrls(chat, projectName);

  if (urls.length === 0) {
    return await bot.sendMessage(msg.chat.id, messages.pingNoUrl());
  }

  await bot.sendMessage(msg.chat.id, messages.pingStart(projectName === 'all'));

  const success = await pingService.ping(urls);
  return await bot.sendMessage(msg.chat.id, success ? messages.pingSuccess(urls) : messages.pingFail());
};
