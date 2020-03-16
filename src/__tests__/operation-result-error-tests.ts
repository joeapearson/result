import { OperationResultError} from '../operation-result-error';

describe('OperationResultError', () => {
  it('wraps the original error', () => {
    const original = new Error('test');
    const msg = 'my error message';

    const re = new OperationResultError(msg, original);

    expect(re.originalError).toBe(original);
    expect(re.isOperationResultError).toBe(true);
  });
});
