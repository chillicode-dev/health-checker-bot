const bot = require('../../bot');
const {Chat} = require('../../db/models');
const messages = require('../../messages');

module.exports = async msg => {
  const result = await Chat.findOne({telegramChatId: msg.chat.id}).select('projects');

  if (Array.isArray(result.projects) && result.projects.length > 0) {
    return await bot.sendMessage(msg.chat.id, messages.commands.listOfProjects(result.projects));
  }

  return await bot.sendMessage(msg.chat.id, messages.commands.listOfProjectsNull());
};
