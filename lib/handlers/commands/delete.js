const bot = require('../../bot');
const {Chat} = require('../../db/models');

module.exports = async (msg, args) => {
  const [cmd, projectName] = args;

  const result = await Chat.updateOne({telegramChatId: msg.chat.id}, {$pull: {projects: {name: projectName}}}).exec();

  if (result.ok && result.nModified === 1) {
    await bot.sendMessage(msg.chat.id, `Project [${projectName}] has been deleted from projects list`);
  } else {
    await bot.sendMessage(msg.chat.id, `Error trying to delete [${projectName}]`);
  }
};
