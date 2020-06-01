const startHandler = require('./start');
const stopHandler = require('./stop');
const pingStartHandler = require('./ping-start');
const pingSuccessHandler = require('./ping-success');
const pingFailHandler = require('./ping-fail');

module.exports = {
  startHandler,
  stopHandler,
  pingStartHandler,
  pingSuccessHandler,
  pingFailHandler,
};
