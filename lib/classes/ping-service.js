const EventEmitter = require('events');
const ms = require('ms');

/**
 * @class PingService
 * @extends EventEmitter
 */
class PingService extends EventEmitter {
  /**
   * Default options for constructor
   * @typedef {Object} PingServiceOptions
   * @property {string[]} [urls]
   * @property {number} [tickInterval]
   * @property {[number, number]} [successStatus]
   */
  static defaultOptions = {
    urls: [], // URLs list
    tickInterval: ms('10s'), // ping URLs every 10 seconds
    successStatus: [200, 299], // range of response statuses at which ping is considered as successful
  };

  /**
   * Names for emitted events
   * @type {{PING_SUCCESS: string, STOP: string, PING_START: string, PING_FAIL: string, START: string}}
   */
  static eventNames = {
    PING_START: 'ping-start',
    PING_SUCCESS: 'ping-success',
    PING_FAIL: 'ping-fail',
    START: 'start',
    STOP: 'stop',
  };

  /**
   * @type {PingServiceOptions}
   */
  options = {};

  /**
   * @type {number|null}
   */
  timerId = null;

  /**
   * @type {boolean}
   */
  isPinging = false;

  /**
   * @constructor
   * @param options {PingServiceOptions=}
   */
  constructor(options= {}) {
    super();
    this.options = {
      ...PingService.defaultOptions,
      ...options,
    };
  }

  set(option, value) {
    this.options[option] = value;
  }

  start() {
    this.timerId = setInterval(this.ping.bind(this), this.options.tickInterval);
    this.isPinging = true;
    this.emit(PingService.eventNames.START);
  }

  stop() {
    clearInterval(this.timerId);
    this.isPinging = false;
    this.emit(PingService.eventNames.STOP);
  }

  restart() {
    this.stop();
    this.start();
  }

  ping() {
    this.emit(PingService.eventNames.PING_START);
  }
}

// const pingService = new PingService({
//   urls: [],
//   tickInterval: 10000,
//   successStatus: [200, 299],
// });
//
// pingService.on('ping-start', () => {});
// pingService.on('ping-success', () => {});
// pingService.on('ping-fail', () => {});
// pingService.on('start', () => {});
// pingService.on('stop', () => {});
// pingService.start();
// pingService.stop();

module.exports = PingService;
