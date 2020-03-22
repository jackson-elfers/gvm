const bcrypt = require("./bcrypt");
const assert = require("assert");
const check = require("check-types");

describe("src/utils/bcrypt.js", () => {
  describe("hash()", () => {
    it("returns hash of plain text password", async () => {
      const data = await bcrypt.hash("password");
      assert(check.string(data));
      assert(data.length === 60);
    });
  });

  describe("compare()", () => {
    it("compares plain text against its hash", async () => {
      const data = await bcrypt.hash("password");
      assert(await bcrypt.compare("password", data));
      assert(!(await bcrypt.compare("notpassword", data)));
    });
  });
});
