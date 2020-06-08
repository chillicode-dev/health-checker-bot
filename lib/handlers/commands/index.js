const addHandler = require('./add');
const pingHandler = require('./ping');
const deleteHandler = require('./delete');
const infoHandler = require('./info');
const listHandler = require('./list');
const startHandler = require('./start');
const statusHandler = require('./status');
const stopHandler = require('./stop');

module.exports = {
  addHandler,
  pingHandler,
  deleteHandler,
  infoHandler,
  listHandler,
  startHandler,
  statusHandler,
  stopHandler,
};
