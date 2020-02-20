class OperationResultError extends Error {
  constructor(message, originalError) {
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

module.exports = OperationResultError;
