const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");

module.exports.create = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    await actions.inventory.create(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed username or password"
      })
    );
  }
});

module.exports.readItemType = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readItemType(req.params)).results));
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

module.exports.readYear = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readYear(req.params)).results));
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

module.exports.readMake = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readMake(req.params)).results));
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

module.exports.readModel = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readModel(req.params)).results));
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

module.exports.readSelect = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readSelect(req.params)).results));
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

module.exports.readSingle = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readSingle(req.params)).results));
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

module.exports.readSingle = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readSingle(req.params)).results));
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

module.exports.update = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    await actions.inventory.update(req.body);
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

module.exports.remove = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    await actions.inventory.remove(req.body);
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
