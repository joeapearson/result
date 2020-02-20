/**
 * @copyright 2020-present by Avid Technology, Inc.
 */

const Result = require('../result');

describe('Result', () => {
  it('can be constructed', () => {
    const res = new Result();

    expect(res.error).toBe(null);
    expect(res.value).toBe(null);
    expect(res.ok).toBe(true);
  });

  it('can be assigned value', () => {
    const value = 'my value';
    const res = new Result(value);

    expect(res.error).toBe(null);
    expect(res.value).toBe(value);
    expect(res.ok).toBe(true);
  });

  it('can be assigned an error', () => {
    const value = undefined;
    const err = new Error('test');

    const res = new Result(value, err);

    expect(res.error).toBe(err);
    expect(res.value).toBe(null);
    expect(res.ok).toBe(false);
  });

  describe('expect', () => {
    it('provides an expect handle to throw on errors', () => {
      const value = 'my value';
      const err = new Error('test');

      const res = new Result(value, err);

      expect(res.error).toBe(err);
      expect(res.value).toBe(value);
      expect(res.ok).toBe(false);

      expect(() => res.expect('assumption')).toThrowError();
    });

    it('does not throw when a result is successful', () => {
      const value = 'my value';

      const res = new Result(value);
      expect(() => res.expect('assumption')).not.toThrowError();
    });
  });
});
