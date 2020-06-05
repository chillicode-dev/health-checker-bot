const pingServiceManager = require('../../ping');
const bot = require('../../bot');
const {getChatFromDb, getUrlsFromChat} = require('../../utils/chat-document');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  const [cmd, projectName] = args;
  const pingService = pingServiceManager.get(msg.chat.id);

  if (!pingService) {
    return await bot.sendMessage(msg.chat.id, messages.pingConnectFail());
  }

  const chat = await getChatFromDb(msg.chat.id);
  const urls = getUrlsFromChat(chat, projectName);

  if (urls.length === 0) {
    return await bot.sendMessage(msg.chat.id, messages.pingNoUrl());
  }

  await bot.sendMessage(msg.chat.id, messages.pingStart(projectName === 'all'));

  const result = await pingService.ping(urls);
  return await bot.sendMessage(
    msg.chat.id,
    result ? messages.pingSuccess(urls) : messages.pingFail(),
  );
};
