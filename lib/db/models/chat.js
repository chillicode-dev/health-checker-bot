const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * Project schema
 * @type {Mongoose.Schema}
 */
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  urls: [String],
});

/**
 * Bot user schema
 * @type {Mongoose.Schema}
 */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    min: 0,
    max: 2,
  },
});

/**
 * Main chat where bot is attached schema
 * @type {Mongoose.Schema}
 */
const chatSchema = new Schema(
  {
    telegramChatId: {
      type: Number,
      required: true,
    },
    projects: [projectSchema],
    users: [userSchema],
  },
  {
    autoCreate: true,
  },
);

/**
 * @param telegramChatId {number}
 * @returns {Promise<Object|null>}
 */
chatSchema.statics.findByChatId = function (telegramChatId) {
  return this.findOne({telegramChatId}).exec();
};

/**
 * @param telegramChatId {number}
 * @returns {Promise<Object[]>}
 */
chatSchema.statics.findProjects = async function (telegramChatId) {
  const found = await this.findOne({telegramChatId}).select('projects').exec();
  if (found && Array.isArray(found.projects)) {
    return found.projects;
  }
  return [];
};

/**
 * @param telegramChatId {number}
 * @param project {Object}
 * @returns {Promise<Object|null>}
 */
chatSchema.statics.addProject = function (telegramChatId, project) {
  return this.updateOne({telegramChatId}, {$push: {projects: project}}).exec();
};

/**
 * @param telegramChatId {number}
 * @param projects {Object[]}
 * @returns {Promise<Object|null>}
 */
chatSchema.statics.updateProjects = function (telegramChatId, projects) {
  return this.updateOne({telegramChatId}, {projects}).exec();
};

/**
 * @param telegramChatId {number}
 * @param projectName {string}
 * @returns {Promise<Object|null>}
 */
chatSchema.statics.deleteProject = function (telegramChatId, projectName) {
  return this.updateOne({telegramChatId}, {$pull: {projects: {name: projectName}}}).exec();
};

/**
 * @param chatDocument {Object}
 * @param projectName {string}
 * @returns {[]|string[]}
 */
chatSchema.statics.getUrls = function (chatDocument, projectName = 'all') {
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
};

module.exports = mongoose.model('Chat', chatSchema);
