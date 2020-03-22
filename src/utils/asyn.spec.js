const asyn = require("./asyn");
const tools = require("../tools");
const assert = require("assert");
const check = require("check-types");

describe("src/utils/asyn.js", () => {
  describe("route()", () => {
    it("returns route wrapped promise", async () => {
      assert(check.function(asyn.route(async (req, res, next) => {})));
    });

    it("sends 500 status error response when error is thrown", async () => {
      const mock = new tools.route.MockRoute();
      mock.addRes("status", () => {});
      mock.addRes("json", data => {
        assert(check.object(data));
        assert(data.error.status === "500");
      });
      asyn.route(async (req, res, next) => {
        throw new Error();
      })(mock.req, mock.res);
    });
  });
});
