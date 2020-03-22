const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");

module.exports.create = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    await actions.files.create(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
});

module.exports.readByOwnerId = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    res.json(utils.api.send((await actions.files.readByOwnerId(req.params)).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
});

module.exports.readByFileName = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.body");
    res.json(utils.api.send((await actions.files.readByOwnerId(req.params)).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
});

module.exports.remove = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    await actions.files.remove(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
});
