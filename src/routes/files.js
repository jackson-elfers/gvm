const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");

module.exports.create = async function(req, res) {
  try {
    const file_meta = JSON.parse(req.headers.file_meta);
    const data = { body: req, owner_id: file_meta._id, file_name: file_meta.file_name };
    const response = await actions.files.create(data);
    res.json(utils.api.send({ storage_name: response.info.storage_name }));
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

module.exports.readByOwnerId = async function(req, res) {
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
};

module.exports.readByStorageName = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    (await actions.files.readByStorageName(req.params)).pipe(res);
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
    await actions.files.remove(req.params);
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
