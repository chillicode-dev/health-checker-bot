const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {addProjectToChat} = require('../../utils/chat-document');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, messages.commands.forbidden('/add'));
  }

  const [cmd, projectName, urlsString] = args;

  const project = {
    name: projectName,
    urls: urlsString.split(','),
  };

  const result = await addProjectToChat(msg.chat.id, project);

  if (result.ok) {
    const pingService = pingServiceManager.get(msg.chat.id);

    if (pingService) {
      pingService.update('urls', [...pingService.options.urls, ...project.urls]);
    }

    await bot.sendMessage(msg.chat.id, `Project [${projectName}] has been added to list`);
  }
};
