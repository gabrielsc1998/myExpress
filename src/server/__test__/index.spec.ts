import server from "..";

describe("Server", () => {
  describe("When get query data", () => {
    it("Should get x = 1 and y = 2", () => {
      const url = "/test?x=1&y=2";
      const queryData = server.getQuery(url);
      expect(queryData).not.toBe(undefined);
      expect(queryData?.x).toEqual("1");
      expect(queryData?.y).toEqual("2");
    });

    it("Should get x = abc and y = abc256 and z = 123", () => {
      const url = "/test?x=abc&y=abc256/test2?z=123";
      const queryData = server.getQuery(url);
      expect(queryData).not.toBe(undefined);
      expect(queryData?.x).toEqual("abc");
      expect(queryData?.y).toEqual("abc256");
      expect(queryData?.z).toEqual("123");
    });
  });
});
