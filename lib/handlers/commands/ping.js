const pingServiceManager = require('../../ping');
const bot = require('../../bot');
const {getChatFromDb, getUrlsFromChat} = require('../../utils/chat-document');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  const [cmd, projectName] = args;
  const pingService = pingServiceManager.get(msg.chat.id);

  if (!pingService) {
    return await bot.sendMessage(msg.chat.id, 'Cannot connect to PingService. Check service by `/status` command');
  }

  const chat = await getChatFromDb(msg.chat.id);
  const urls = getUrlsFromChat(chat, projectName);

  if (urls.length === 0) {
    return await bot.sendMessage(msg.chat.id, 'No urls found for given project');
  }

  const result = await pingService.ping(urls);
  return await bot.sendMessage(msg.chat.id, result ? 'Ping successful' : 'Failed to ping project');
};
