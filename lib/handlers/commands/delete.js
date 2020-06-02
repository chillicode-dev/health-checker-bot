const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {getChatFromDb, getUrlsFromChat, deleteProjectFromChat} = require('../../utils/chat-document');

module.exports = async (msg, args) => {
  const [cmd, projectName] = args;
  const pingService = pingServiceManager.get(msg.chat.id);
  const chat = await getChatFromDb(msg.chat.id);

  if (chat && pingService) {
    // Remove redundant urls from PingService
    const urlsToDelete = getUrlsFromChat(chat, projectName);
    const updatedUrls = pingService.options.urls.filter(url => urlsToDelete.includes(url));
    pingService.set('urls', updatedUrls);
  }

  // Update db
  const result = await deleteProjectFromChat(msg.chat.id, projectName);
  if (result.ok && result.nModified === 1) {
    await bot.sendMessage(msg.chat.id, `Project [${projectName}] has been deleted from projects list`);
  } else {
    await bot.sendMessage(msg.chat.id, `Error trying to delete [${projectName}]`);
  }
};
