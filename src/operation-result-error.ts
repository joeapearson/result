export class OperationResultError extends Error {
  originalError: Error
  isOperationResultError: true

  constructor(
    message: string,
    originalError: Error
  ) {
    super(message);
    Object.defineProperties(this, {
      originalError: {
        value: originalError,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      isOperationResultError: {
        value: true,
        enumerable: true,
        configurable: false,
        writable: false,
      },
    });
  }
}

export default OperationResultError;
