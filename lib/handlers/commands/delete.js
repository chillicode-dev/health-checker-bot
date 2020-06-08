const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {Chat} = require('../../db/models');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, messages.forbidden('/delete'));
  }

  const [cmd, projectName] = args;

  // If no args passed then abort
  if (!projectName) {
    return await bot.sendMessage(msg.chat.id, messages.deleteProjectWrongArgs());
  }

  const pingService = pingServiceManager.get(msg.chat.id);
  const chat = await Chat.findByChatId(msg.chat.id);

  if (chat && pingService) {
    // Remove redundant urls from PingService
    const urlsToDelete = Chat.getUrls(chat, projectName);
    const updatedUrls = pingService.options.urls.filter(url => urlsToDelete.includes(url));
    pingService.update('urls', updatedUrls);
  }

  // Update db
  const result = await Chat.deleteProject(msg.chat.id, projectName);
  if (result.ok && result.nModified === 1) {
    await bot.sendMessage(msg.chat.id, messages.deleteProjectSuccess(projectName));
  } else {
    await bot.sendMessage(msg.chat.id, messages.deleteProjectFail());
  }
};
