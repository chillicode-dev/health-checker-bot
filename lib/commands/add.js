const bot = require('../bot');
const pingServiceManager = require('../ping');
const {Chat} = require('../db/models');

module.exports = async (msg, args) => {
  const [cmd, projectName, urlsString] = args;

  const project = {
    name: projectName,
    urls: urlsString.split(','),
  };

  const result = await Chat.updateOne({telegramChatId: msg.chat.id}, {$push: {projects: project}}).exec();

  if (result.ok) {
    const pingService = pingServiceManager.get(msg.chat.id);
    
    if (pingService) {
      pingService.update('urls', pingService.options.urls.push(project.urls));
    }

    await bot.sendMessage(msg.chat.id, `Project [${projectName}] has been added to list`);
  }
};
