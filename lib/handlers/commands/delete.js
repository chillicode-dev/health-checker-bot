const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {getChatFromDb, getUrlsFromChat, deleteProjectFromChat} = require('../../utils/chat-document');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, messages.commands.forbidden('/delete'));
  }

  const [cmd, projectName] = args;
  const pingService = pingServiceManager.get(msg.chat.id);
  const chat = await getChatFromDb(msg.chat.id);

  if (chat && pingService) {
    // Remove redundant urls from PingService
    const urlsToDelete = getUrlsFromChat(chat, projectName);
    const updatedUrls = pingService.options.urls.filter(url => urlsToDelete.includes(url));
    pingService.update('urls', updatedUrls);
  }

  // Update db
  const result = await deleteProjectFromChat(msg.chat.id, projectName);
  if (result.ok && result.nModified === 1) {
    await bot.sendMessage(msg.chat.id, messages.commands.deleteProjectSuccess(projectName));
  } else {
    await bot.sendMessage(msg.chat.id, messages.commands.deleteProjectFail());
  }
};
