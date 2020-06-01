const EventEmitter = require('events');
const fetch = require('node-fetch');
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
  constructor(options = {}) {
    super();
    this.options = {
      ...PingService.defaultOptions,
      ...options,
    };
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

  set(option, value) {
    this.options[option] = value;
  }

  update(option, value) {
    this.set(option, value);
    this.restart();
  }

  async ping() {
    this.emit(PingService.eventNames.PING_START);

    const requests = this.options.urls.map(url => fetch(url));

    try {
      const [minStatus, maxStatus] = this.options.successStatus;
      const responses = await Promise.all(requests);

      for (const response of responses) {
        if (response.status < minStatus || response.status > maxStatus) {
          throw new Error(response.url);
        }
      }

      this.emit(PingService.eventNames.PING_SUCCESS);
    } catch (err) {
      this.emit(PingService.eventNames.PING_FAIL, err.message);
    }
  }
}

module.exports = PingService;
