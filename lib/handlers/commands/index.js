const addHandler = require('./add');
const pingHandler = require('./ping');
const deleteHandler = require('./delete');
const helpHandler = require('./help');
const listHandler = require('./list');
const settingsHandler = require('./settings');
const startHandler = require('./start');
const statusHandler = require('./status');
const stopHandler = require('./stop');

module.exports = {
  addHandler,
  pingHandler,
  deleteHandler,
  helpHandler,
  listHandler,
  settingsHandler,
  startHandler,
  statusHandler,
  stopHandler,
};
