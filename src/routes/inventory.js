const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");

module.exports.create = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    const response = await actions.inventory.create(req.body);
    res.json(utils.api.send({ _id: response.info._id, url_title: response.info.url_title }));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readItemType = async function(req, res) {
  try {
    res.json(utils.api.send((await actions.inventory.readItemType()).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readYear = async function(req, res) {
  try {
    res.json(utils.api.send((await actions.inventory.readYear()).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readMake = async function(req, res) {
  try {
    res.json(utils.api.send((await actions.inventory.readMake()).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readModel = async function(req, res) {
  try {
    res.json(utils.api.send((await actions.inventory.readModel()).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readSelect = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    req.params.year = req.params.year === "null" ? "null" : Number(req.params.year);
    req.params.index = Number(req.params.index);
    req.params.offset = Number(req.params.offset);
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
};

module.exports.readSingleByUrlTitle = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readSingleByUrlTitle(req.params)).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readSingleById = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.inventory.readSingleById(req.params)).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.update = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    const response = await actions.inventory.update(req.body);
    res.json(utils.api.send({ url_title: response.info.url_title }));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.updateThumbnail = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    await actions.inventory.updateThumbnail(req.body);
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
};

module.exports.remove = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    await actions.inventory.remove(req.params);
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
};
