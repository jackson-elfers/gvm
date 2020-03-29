const utils = require("../utils");
const user = require("./user");
const inventory = require("./inventory");
const files = require("./files");
const client = require("./client");

module.exports = function(app) {
  // user
  app.post("/user/login", utils.asyn.route(user.login));
  app.get("/user/logout", utils.asyn.route(user.logout));
  app.get("/user/info", utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.info));
  app.post("/user/register", utils.recaptcha.verify, utils.asyn.route(user.register));
  app.put("/user/update/username", utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.updateUsername));
  app.put("/user/update/password", utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.updatePassword));
  app.delete("/user/delete", utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.remove));

  // inventory
  app.post("/inventory/create", utils.asyn.route(utils.jwt.secured), utils.asyn.route(inventory.create));
  app.get("/inventory/item_type/:item_type", utils.asyn.route(inventory.readItemType));
  app.get("/inventory/year/:year", utils.asyn.route(inventory.readYear));
  app.get("/inventory/make/:make", utils.asyn.route(inventory.readMake));
  app.get("/inventory/model/:model", utils.asyn.route(inventory.readModel));
  app.get("/inventory/select/:item_type/:year/:make/:model", utils.asyn.route(inventory.readSelect));
  app.get("/inventory/item/title/:url_title", utils.asyn.route(inventory.readSingleByUrlTitle));
  app.get("/inventory/item/id/:_id", utils.asyn.route(inventory.readSingleById));
  app.put("/inventory/update", utils.asyn.route(utils.jwt.secured), utils.asyn.route(inventory.update));
  app.put(
    "/inventory/update/thumbnail",
    utils.asyn.route(utils.jwt.secured),
    utils.asyn.route(inventory.updateThumbnail)
  );
  app.delete("/inventory/delete/:_id", utils.asyn.route(inventory.remove));

  // files
  app.post("/files/create", utils.asyn.route(utils.jwt.secured), utils.asyn.route(files.create));
  app.get("/files/read/owner/:owner_id", utils.asyn.route(files.readByOwnerId));
  app.get("/files/read/filename/:file_name", utils.asyn.route(files.readByFileName));
  app.delete("/files/delete/:_id", utils.asyn.route(utils.jwt.secured), utils.asyn.route(files.remove));

  // client
  app.get("/", client.home);
  app.get("*", client.home);
};
