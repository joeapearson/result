/**
 * @copyright 2020-present by Avid Technology, Inc.
 */

const ResultError = require('../result-error');

describe('ResultError', () => {
  it('wraps the original error', () => {
    const original = new Error('test');
    const msg = 'my error message';

    const re = new ResultError(msg, original);

    expect(re.originalError).toBe(original);
    expect(re.isResultError).toBe(true);
  });
});
