const api = require("./api");
const assert = require("assert");
const check = require("check-types");

function validError(data) {
  assert(check.object(data));
  assert(data.hasOwnProperty("error"));
  assert(data.hasOwnProperty("data"));
  assert(data.data === null);
  assert(data.error.hasOwnProperty("status"));
  assert(data.error.hasOwnProperty("title"));
  assert(data.error.hasOwnProperty("detail"));
  assert(data.error.hasOwnProperty("type"));
}

describe("src/utils/api.js", () => {
  describe("error()", () => {
    it("returns 401 status with valid error object", () => {
      validError(api.error({ status: 401, detail: "" }));
    });

    it("returns 500 status with valid error object", () => {
      validError(api.error({ status: 500, detail: "" }));
    });

    it("returns Unknown status with valid error object", () => {
      validError(api.error({ status: 0, detail: "" }));
    });
  });

  describe("send()", () => {
    it("returns a data object with a null error object", () => {
      const data = api.send({});
      assert(check.object(data));
      assert(data.hasOwnProperty("error"));
      assert(data.error === null);
      assert(data.hasOwnProperty("data"));
    });
  });
});
