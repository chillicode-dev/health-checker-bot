const {Chat} = require('../db/models');

function getChatFromDb(telegramChatId) {
  return Chat.findOne({telegramChatId}).exec();
}

async function saveChatToDb(telegramChatId) {
  const chat = new Chat({telegramChatId});
  await chat.save();
  console.log('[health-checker-bot] New chat created and saved to db');
}

function getUrlsFromChat(chatDocument, projectName = 'all') {
  if (chatDocument) {
    let result = [];

    if (projectName === 'all') {
      // Find urls from all projects
      chatDocument.projects.forEach(project => result.push(...project.urls));
    } else {
      // Find urls from specific project
      const foundProject = chatDocument.projects.find(project => project.name === projectName);
      result = foundProject ? foundProject.urls : [];
    }

    return result;
  }

  return [];
}

module.exports = {
  getChatFromDb,
  saveChatToDb,
  getUrlsFromChat,
};
