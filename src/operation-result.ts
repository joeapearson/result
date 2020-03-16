import OperationResultError from './operation-result-error';

/**
 * Describes an Operation Result
 */
export class OperationResult {
  data?: any
  error?: OperationResultError

  constructor(data: any = null, error: Error = null) {
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
  expect(message: string) {
    if (this.error) {
      throw new OperationResultError(message, this.error);
    }
  }
}

export default OperationResult;
