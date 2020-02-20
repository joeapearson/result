
/**
 * @copyright 2020-present by Avid Technology, Inc.
 */

const ResultError = require('./result-error');

class Result {
  constructor(value = null, error = null) {
    Object.defineProperties(this, {
      value: {
        value,
        enumerable: true,
        writeable: false,
        configurable: false,
      },
      error: {
        value: error,
        enumerable: true,
        writeable: false,
        configurable: false,
      },
    });
  }

  get ok() {
    return !this.error;
  }

  expect(message) {
    if (this.error) {
      throw new ResultError(message, this.error);
    }
  }
}

module.exports = Result;
