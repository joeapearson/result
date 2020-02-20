const OperationResult = require('../operation-result');

describe('OperationResult', () => {
  it('can be constructed', () => {
    const res = new OperationResult();

    expect(res.error).toBe(null);
    expect(res.data).toBe(null);
    expect(res.ok).toBe(true);
  });

  it('can be assigned data', () => {
    const data = 'my data';
    const res = new OperationResult(data);

    expect(res.error).toBe(null);
    expect(res.data).toBe(data);
    expect(res.ok).toBe(true);
  });

  it('can be assigned an error', () => {
    const data = undefined;
    const err = new Error('test');

    const res = new OperationResult(data, err);

    expect(res.error).toBe(err);
    expect(res.data).toBe(null);
    expect(res.ok).toBe(false);
  });

  describe('expect', () => {
    it('provides an expect handle to throw on errors', () => {
      const data = 'my data';
      const err = new Error('test');

      const res = new OperationResult(data, err);

      expect(res.error).toBe(err);
      expect(res.data).toBe(data);
      expect(res.ok).toBe(false);

      expect(() => res.expect('assumption')).toThrowError();
    });

    it('does not throw when a result is successful', () => {
      const data = 'my data';

      const res = new OperationResult(data);
      expect(() => res.expect('assumption')).not.toThrowError();
    });
  });
});
