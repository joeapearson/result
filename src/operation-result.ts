import OperationResultError from './operation-result-error';

/**
 * Describes an Operation Result
 */
export class OperationResult<T = any> {
  data?: T
  error?: Error

  /**
   * Creates a new OperationResult
   * @param [data] resulting data
   * @param [error] an error if present
   */
  constructor(
    data: T = null,
    error: Error = null
  ) {
    Object.defineProperties(this, {
      data: {
        value: data,
        writable: true,
        enumerable: true,
      },
      error: {
        value: error,
        writable: true,
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
   *
   * @param {string} message
   * @returns {this}
   * @throws {OperationResultError}
   */
  expect(message: string): this {
    if (this.error) {
      throw new OperationResultError(message, this.error);
    }

    return this;
  }

  static wrap(results: OperationResult<any>[]): OperationResult<OperationResult<any>[]> {
    const ret = new OperationResult<OperationResult<any>[]>();
    const firstFailed = results.find((result) => result.ok !== true);

    ret.data = results;

    if (firstFailed) {
        ret.error = firstFailed.error;
    }

    return ret;
}
}

export default OperationResult;
