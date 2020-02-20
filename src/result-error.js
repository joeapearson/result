/**
 * @copyright 2020-present by Avid Technology, Inc.
 */

class ResultError extends Error {
  constructor(message, originalError) {
    super(message);
    Object.defineProperties(this, {
      originalError: {
        value: originalError,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      isResultError: {
        value: true,
        enumerable: true,
        configurable: false,
        writable: false,
      },
    });
  }
}

module.exports = ResultError;
