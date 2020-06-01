const PingService = require('./ping-service');

class PingServiceManager {
  /**
   * Ping services instances with chatId
   * @typedef {Object} PingServiceManagerItem
   * @property {number} chatId
   * @property {PingService} instance
   */

  /**
   * @type {PingServiceManagerItem[]}
   */
  services = [];

  /**
   * @param chatId {number}
   * @param options {PingServiceOptions=}
   * @returns {PingService}
   */
  create(chatId, options = {}) {
    // Check service existence for a chat
    const existedService = this.get(chatId);

    if (existedService) {
      return existedService;
    }

    // Unless create new service
    const instance = new PingService(options);
    this.services.push({chatId, instance});

    return instance;
  }

  /**
   * @param chatId {number}
   * @returns {PingService|undefined}
   */
  get(chatId) {
    const service = this.services.find(service => service.chatId === chatId);

    if (service) {
      return service.instance;
    }
  }

  /**
   * @param chatId {number}
   * @returns {boolean}
   */
  delete(chatId) {
    const service = this.get(chatId);

    if (service) {
      service.stop();

      const index = this.services.findIndex(service => service.chatId === chatId);
      this.services.splice(index, 1);

      return true;
    }

    return false;
  }
}

module.exports = PingServiceManager;
