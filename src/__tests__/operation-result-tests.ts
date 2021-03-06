import { OperationResult } from "../operation-result";

describe("OperationResult", () => {
  it("can be constructed", () => {
    const res = new OperationResult();

    expect(res.error).toBe(null);
    expect(res.data).toBe(null);
    expect(res.ok).toBe(true);
  });

  it("can be assigned data", () => {
    const data = "my data";
    const res = new OperationResult(data);

    expect(res.error).toBe(null);
    expect(res.data).toBe(data);
    expect(res.ok).toBe(true);
  });

  it("can be assigned an error", () => {
    const data: any = undefined;
    const err = new Error("test");

    const res = new OperationResult(data, err);

    expect(res.error).toBe(err);
    expect(res.data).toBe(null);
    expect(res.ok).toBe(false);
  });

  describe("expect", () => {
    it("provides an expect handle to throw on errors", () => {
      const data = "my data";
      const err = new Error("test");

      const res = new OperationResult(data, err);

      expect(res.error).toBe(err);
      expect(res.data).toBe(data);
      expect(res.ok).toBe(false);

      expect(() => res.expect("assumption")).toThrowError();
    });

    it("does not throw when a result is successful", () => {
      const data = "my data";

      const res = new OperationResult(data);
      expect(() => res.expect("assumption")).not.toThrowError();
    });

    it("can be chained to an assignment", () => {
      const data = "my data";
      const op = () => new OperationResult(data);

      expect(op().expect("assumption")).toBeInstanceOf(OperationResult);
      expect(op().expect("assumption").data).toBe(data);
    });

    it("allows assignment of data and error after creation", () => {
      const data = "my data";
      const err = new Error("test");

      const res = new OperationResult();

      res.data = data;
      res.error = err;

      expect(res.data).toBe(data);
      expect(res.error).toBe(err);
    });
  });

  describe("wrap", () => {
    it("can wrap a set of OperationResults", () => {
      const res1 = new OperationResult();
      const res2 = new OperationResult();

      const overallRes = OperationResult.wrap([res1, res2]);

      expect(overallRes.data).toEqual([res1, res2]);
      expect(overallRes.ok).toBe(true);
      expect(overallRes.error).toBe(null);
    });

    it("reports a failing result", () => {
      const res1 = new OperationResult();
      const res2 = new OperationResult();

      const error = new Error("test");
      res2.error = error;

      const overallRes = OperationResult.wrap([res1, res2]);

      expect(overallRes.data).toEqual([res1, res2]);
      expect(overallRes.ok).toBe(false);
      expect(overallRes.error).toBe(error);
    });

    it("can be typed", () => {
      const res1 = new OperationResult("test");
      const res2 = new OperationResult("test2");

      const overallRes = OperationResult.wrap<string>([res1, res2]);

      expect(overallRes.data).toEqual([res1, res2]);
      expect(overallRes.ok).toBe(true);
      expect(overallRes.error).toBe(null);
    });
  });
});
