const arrayUniq = require('array-uniq');

const bot = require('../../bot');
const pingServiceManager = require('../../ping');
const {Chat} = require('../../db/models');
const messages = require('../../messages');

module.exports = async (msg, args) => {
  if (msg.from.username !== process.env.TELEGRAM_BOT_ROOT_USER) {
    return await bot.sendMessage(msg.chat.id, messages.forbidden('/add'));
  }

  let [cmd, projectName, urlsString] = args;

  if (!projectName || !urlsString) {
    return await bot.sendMessage(msg.chat.id, messages.addProjectWrongArgs());
  }

  const urls = urlsString.split(',');
  // Save and find only lowercased projects
  projectName = projectName.toLowerCase();

  // Check if every element is valid URL
  try {
    urls.forEach(url => new URL(url));
  } catch (err) {
    return await bot.sendMessage(msg.chat.id, messages.addProjectWrongUrls());
  }

  const projects = await Chat.findProjects(msg.chat.id);
  const indexForUpdate = projects.findIndex(project => project.name === projectName);

  if (indexForUpdate !== -1) {
    projects[indexForUpdate] = {
      name: projectName,
      urls: arrayUniq([...projects[indexForUpdate].urls, ...urls]),
    };
  } else {
    projects.push({name: projectName, urls});
  }

  const result = await Chat.updateProjects(msg.chat.id, projects);

  if (result.ok) {
    const pingService = pingServiceManager.get(msg.chat.id);

    if (pingService) {
      pingService.update('urls', [...pingService.options.urls, ...urls]);
    }

    await bot.sendMessage(msg.chat.id, messages.addProjectSuccess(projectName));
  }
};
