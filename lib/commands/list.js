const bot = require('../bot');
const {Chat} = require('../db/models');

module.exports = async msg => {
  const result = await Chat.findOne({telegramChatId: msg.chat.id}).select('projects');

  if (Array.isArray(result.projects) && result.projects.length > 0) {
    let answerMsg = '';

    for (const project of result.projects) {
      answerMsg += `[${project.name}]:\n`;

      for (const url of project.urls) {
        answerMsg += `- ${url}\n`;
      }

      answerMsg += `\n`;
    }

    await bot.sendMessage(msg.chat.id, answerMsg);
  }
};
