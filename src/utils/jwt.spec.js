const dotenv = require("dotenv").config();
const jwt = require("./jwt");
const tools = require("../tools");
const assert = require("assert");
const check = require("check-types");

describe("src/utils/jwt.js", () => {
  describe("verify()", () => {
    it("verifies jwt and returns object", async () => {
      const payload = { _id: "52a3e6fe-b592-45a3-b6f1-e66b9791d83e" };
      const data = await jwt.sign(payload);
      const decoded = await jwt.verify(data);
      check.assert(decoded._id === payload._id);
    });

    it("throws error upon invalid verification", async () => {
      const payload = { _id: "52a3e6fe-b592-45a3-b6f1-e66b9791d83e" };
      const data = await jwt.sign(payload);
      var thrown = false;
      try {
        const decoded = await jwt.verify("invalid");
      } catch (e) {
        thrown = true;
      }
      check.assert(thrown);
    });
  });

  describe("sign()", () => {
    it("returns a jwt", async () => {
      const data = await jwt.sign({});
      assert(check.string(data));
      assert(data.length === 128);
    });
  });
  describe("secured()", () => {
    it("verifies jwt passed by 'Authorization' cookie appends to req.user", async () => {
      const payload = { _id: "52a3e6fe-b592-45a3-b6f1-e66b9791d83e" };
      const data = await jwt.sign(payload);
      const mock = new tools.route.MockRoute();
      mock.addReq("cookies", { Authorization: data });
      mock.setNext(() => {
        assert(payload._id === mock.req.user._id);
      });
      await jwt.secured(mock.req, mock.res, mock.next);
    });

    it("sends error response after failing to verify", async () => {
      const mock = new tools.route.MockRoute();
      mock.addReq("cookies", { Authorization: "invalid" });
      mock.addRes("status", () => {});
      mock.addRes("json", data => {
        assert(check.object(data));
        assert(data.error.status === "401");
      });
      await jwt.secured(mock.req, mock.res, mock.next);
    });
  });
});
