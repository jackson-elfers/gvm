const User = require("./user.controller");
const Inventory = require("./inventory.controller");
const Files = require("./files.contoller");

const services = require("../services");
const check = require("check-types");

const method = { services: services, check: check };

module.exports.user = new User({ method: method });

module.exports.inventory = new Inventory({ method: method });

module.exports.files = new Files({ method: method });
