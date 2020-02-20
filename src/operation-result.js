const OperationResultError = require('./operation-result-error');

/**
 * Describes an Operation Result
 */
class OperationResult {
  /**
   * Creates a new OperationResult.
   *
   * @param {*} [data] arbitrary data
   * @param {Error | null} [error] error
   */
  constructor(data = null, error = null) {
    Object.defineProperties(this, {
      data: {
        value: data,
        enumerable: true,
      },
      error: {
        value: error,
        enumerable: true,
      },
    });
  }

  /**
   * Determines whether the operation was successfully executed.
   */
  get ok() {
    return !this.error;
  }

  /**
   * Throws when error is present with the specified message.
   * @param {string} message
   * @returns {void}
   * @throws {ResultError}
   */
  expect(message) {
    if (this.error) {
      throw new ResultError(message, this.error);
    }
  }
}

module.exports = OperationResult;
