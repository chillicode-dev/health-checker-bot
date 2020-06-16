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
   * @property {string[]} [urls] URLs list
   * @property {number} [tickInterval] ping URLs every minute
   * @property {boolean} [stopOnFail] stop service after failed ping
   * @property {[number, number]} [successStatus] range of response statuses at which ping is considered as successful
   */
  static defaultOptions = {
    urls: [],
    tickInterval: ms('1m'),
    stopOnFail: true,
    successStatus: [200, 299],
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
   * @type {number[]}
   */
  timerIds = [];

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

  /**
   * @returns {void}
   */
  start() {
    const timerId = setInterval(this.ping.bind(this), this.options.tickInterval);
    this.timerIds.push(timerId);
    this.isPinging = true;
    this.emit(PingService.eventNames.START);
  }

  /**
   * @returns {void}
   */
  stop() {
    this.timerIds.forEach(timerId => clearInterval(timerId));
    this.timerIds = [];
    this.isPinging = false;
    this.emit(PingService.eventNames.STOP);
  }

  /**
   * @returns {void}
   */
  restart() {
    this.stop();
    this.start();
  }

  /**
   * @param option {string}
   * @param value {*}
   */
  set(option, value) {
    this.options[option] = value;
  }

  /**
   * @param option {string}
   * @param value {*}
   */
  update(option, value) {
    this.set(option, value);
    this.restart();
  }

  /**
   *
   * @param urls {string[]=}
   * @returns {Promise<boolean>}
   */
  async ping(urls = null) {
    this.emit(PingService.eventNames.PING_START);

    const urlsToPing = urls || this.options.urls;
    const failed = [];

    // Make requests and populate meta info
    for (const url of urlsToPing) {
      const responseMeta = await this._pingSingleUrl(url);

      if (!responseMeta.success) {
        failed.push(responseMeta);
      }
    }

    if (failed.length > 0) {
      this.emit(PingService.eventNames.PING_FAIL, failed);

      if (this.options.stopOnFail) {
        this.stop();
      }

      return false;
    }

    this.emit(PingService.eventNames.PING_SUCCESS);
    return true;
  }

  /**
   * @typedef {Object} ResponseMetaInfo
   * @property {boolean} success
   * @property {string} url
   * @property {number} status
   * @property {string} message
   */

  /**
   * Creates single request and returns ResponseMetaInfo object.
   * @private
   * @param url {string}
   * @returns {Promise<ResponseMetaInfo>}
   */
  async _pingSingleUrl(url) {
    const [minStatus, maxStatus] = this.options.successStatus;

    try {
      const response = await fetch(url);
      const responseMeta = {
        success: true,
        url,
        status: response.status,
        message: response.statusText,
      };

      if (response.status < minStatus || response.status > maxStatus) {
        responseMeta.success = false;
      }

      return responseMeta;
    } catch (err) {
      return {
        success: false,
        url,
        status: -1,
        message: err.message,
      };
    }
  }
}

module.exports = PingService;
