const pingServiceManager = require('../../ping');
const bot = require('../../bot');
const {getChatFromDb, getUrlsFromChat} = require('../../utils/chat-document');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  const [cmd, projectName] = args;
  const pingService = pingServiceManager.get(msg.chat.id);

  if (!pingService) {
    return await bot.sendMessage(msg.chat.id, messages.commands.pingConnectFail());
  }

  const chat = await getChatFromDb(msg.chat.id);
  const urls = getUrlsFromChat(chat, projectName);

  if (urls.length === 0) {
    return await bot.sendMessage(msg.chat.id, messages.commands.pingNoUrl());
  }

  await bot.sendMessage(msg.chat.id, messages.commands.pingStart(projectName === 'all'));

  const result = await pingService.ping(urls);
  return await bot.sendMessage(
    msg.chat.id,
    result ? messages.commands.pingSuccess(urls) : messages.commands.pingFail(),
  );
};
