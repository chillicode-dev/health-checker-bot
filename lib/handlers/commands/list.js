const bot = require('../../bot');
const {Chat} = require('../../db/models');
const messages = require('../../messages');

module.exports = async msg => {
  const projects = await Chat.findProjects(msg.chat.id);

  if (projects.length > 0) {
    return await bot.sendMessage(msg.chat.id, messages.listOfProjects(projects));
  }

  return await bot.sendMessage(msg.chat.id, messages.listOfProjectsNull());
};
