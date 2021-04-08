const dotenv = require("dotenv").config();
const db = require("./index");
const sqlstring = require("sqlstring");
const assert = require("assert");
const check = require("check-types");

describe("src/db/user.js", () => {
  var globals = {
    skip: false,
    user_params: { username: "username", password: "password" },
    user_entry: null
  };

  describe("create()", () => {
    it("creates user and returns object", async () => {
      assert(
        globals.user_entry.hasOwnProperty("results") &&
          globals.user_entry.hasOwnProperty("fields") &&
          globals.user_entry.hasOwnProperty("info")
      );
      assert(check.string(globals.user_entry.info._id));
    });
  });

  describe("readSingle()", () => {
    it("reads entry and returns object", async () => {
      const data = await db.actions.user.readSingle({
        username: globals.user_params.username
      });
      assert(data.hasOwnProperty("results") && data.hasOwnProperty("fields") && data.hasOwnProperty("info"));
    });
  });

  describe("updateUsername()", () => {
    it("updates username and returns object", async () => {
      const data = await db.actions.user.updateUsername({
        _id: globals.user_entry.info._id,
        username: "updatedUsername"
      });
      assert(data.hasOwnProperty("results") && data.hasOwnProperty("fields") && data.hasOwnProperty("info"));
      const updatedData = await db.query(
        sqlstring.format("select * from user where _id = uuid_to_bin(?)", [globals.user_entry.info._id])
      );
      assert(updatedData.results[0].username !== globals.user_params.username);
    });
  });

  describe("updatePassword()", () => {
    it("updates password and returns object", async () => {
      const data = await db.actions.user.updatePassword({
        _id: globals.user_entry.info._id,
        password: "updatedPassword"
      });
      assert(data.hasOwnProperty("results") && data.hasOwnProperty("fields") && data.hasOwnProperty("info"));
      const updatedData = await db.query(
        sqlstring.format("select * from user where _id = uuid_to_bin(?)", [globals.user_entry.info._id])
      );
      assert(updatedData.results[0].password !== globals.user_params.password);
    });
  });

  describe("delete()", () => {
    it("deletes entry and returns object", async () => {
      const data = await db.actions.user.delete({
        _id: globals.user_entry.info._id
      });
      assert(data.hasOwnProperty("results") && data.hasOwnProperty("fields") && data.hasOwnProperty("info"));
      const updatedData = await db.query(
        sqlstring.format("select * from user where _id = uuid_to_bin(?)", [globals.user_entry.info._id])
      );
      assert(updatedData.results.length === 0);
    });
  });

  beforeEach(async function() {
    if (globals.skip) {
      this.currentTest.fn = function() {
        this.skip();
      };
      return;
    }
    globals.user_entry = await db.actions.user.create(globals.user_params);
  });

  afterEach(async () => {
    await db.query(sqlstring.format("delete from user where _id = uuid_to_bin(?)", [globals.user_entry.info._id]));
    globals.user_entry = null;
  });

  before(async () => {
    try {
      db.connect();
      await db.ready();
      await db.actions.models();
    } catch (e) {
      db.disconnect();
      globals.skip = true;
    }
  });

  after(() => {
    db.disconnect();
  });
});
