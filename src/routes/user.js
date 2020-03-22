const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");

module.exports.login = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    check.assert(req.body.hasOwnProperty("username"), "missing property 'username'");
    check.assert(req.body.hasOwnProperty("password"), "missing property 'password'");
    res.cookie("Authorization", (await actions.user.login(req.body)).jwt, {
      httpOnly: true,
      maxAge: Number(process.env.JWT_EXPIRATION) * 1000
    });
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

module.exports.logout = function(req, res) {
  try {
    res.clearCookie("Authorization");
    res.json(utils.api.send(utils.api.send(null)));
  } catch (e) {
    res.json(utils.api.error({ status: 500, detail: "server error, logout failed" }));
  }
};

module.exports.info = utils.asyn.route(async function(req, res) {
  try {
    res.json(utils.api.send(req.user));
  } catch (e) {
    res.json(utils.api.error({ status: 500, detail: "server error, fetching user failed" }));
  }
});

module.exports.register = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    check.assert(req.body.hasOwnProperty("username"), "missing property 'username'");
    check.assert(req.body.hasOwnProperty("password"), "missing property 'password'");
    await actions.user.register(req.body);
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

module.exports.updateUsername = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body._id = req.user._id;
    check.assert(req.body.hasOwnProperty("username"), "missing property 'username'");
    await actions.user.updateUsername(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    res.json(utils.api.error({ status: 400, detail: "invalid or malformed username" }));
  }
});

module.exports.updatePassword = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body._id = req.user._id;
    check.assert(req.body.hasOwnProperty("password"), "missing property 'password'");
    await actions.user.updatePassword(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    res.json(utils.api.error({ status: 400, detail: "invalid or malformed password" }));
  }
});

module.exports.remove = utils.asyn.route(async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body._id = req.user._id;
    await actions.user.delete(req.body);
    res.clearCookie("Authorization");
    res.json(utils.api.send(null));
  } catch (e) {
    res.json(
      utils.api.error({
        status: 500,
        detail: "server error, could not delete user"
      })
    );
  }
});
